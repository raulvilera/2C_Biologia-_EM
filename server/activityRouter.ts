import { nanoid } from "nanoid";
import { z } from "zod";
import { buildActivity, buildAppsScriptPayload, gradeObjectiveAnswers, StoredActivity, submittedAnswerSchema, toPublicActivity } from "./activity";
import { checkAppsScriptConnection, sendToAppsScript } from "./appsScript";
import { claimBiologySubmission, createBiologyActivity, getBiologyActivity, getBiologyStudentSubmission, reserveBiologyStudentSubmission, updateBiologySync } from "./db";
import { publicProcedure, router } from "./_core/trpc";
import { STUDENTS } from "./students";

const studentSchema = z.object({ id: z.string().min(1).max(64) });
const activityIdSchema = z.object({ activityId: z.string().min(8).max(64) });

function parseStoredActivity(row: { questionsJson: string }): StoredActivity {
  return JSON.parse(row.questionsJson) as StoredActivity;
}

export const activityRouter = router({
  students: publicProcedure.query(() => STUDENTS.map(student => ({ id: String(student.number), name: student.name }))),
  connection: publicProcedure.query(async () => {
    const payload = await checkAppsScriptConnection();
    return { connected: true, sheet: payload.sheet ?? "2ºBIO 3º" };
  }),
  create: publicProcedure.input(studentSchema).mutation(async ({ input }) => {
    const student = STUDENTS.find(candidate => String(candidate.number) === input.id);
    if (!student) throw new Error("Estudante não encontrado na turma 2ª Série C.");
    const previousSubmission = await getBiologyStudentSubmission(input.id);
    if (previousSubmission) throw new Error("Este estudante já enviou a atividade. Cada aluno pode enviar apenas uma vez.");
    const id = nanoid(18);
    const activity = buildActivity({ id, studentId: input.id, studentNumber: student.number, studentName: student.name, studentRa: student.ra, studentDigit: student.digit, studentEmail: student.email });
    await createBiologyActivity({ id, studentId: input.id, studentName: student.name, questionsJson: JSON.stringify(activity) });
    return toPublicActivity(activity);
  }),
  get: publicProcedure.input(activityIdSchema).query(async ({ input }) => {
    const row = await getBiologyActivity(input.activityId);
    if (!row) return null;
    const activity = parseStoredActivity(row);
    return { activity: toPublicActivity(activity), submittedAt: row.submittedAt?.toISOString() ?? null, syncStatus: row.syncStatus };
  }),
  submit: publicProcedure.input(activityIdSchema.extend({ answers: z.array(submittedAnswerSchema).length(10) })).mutation(async ({ input }) => {
    const row = await getBiologyActivity(input.activityId);
    if (!row) throw new Error("Atividade não encontrada.");
    const activity = parseStoredActivity(row);
    const grade = gradeObjectiveAnswers(activity, input.answers);
    const reserved = await reserveBiologyStudentSubmission({ studentId: activity.studentId, activityId: activity.id });
    if (!reserved) throw new Error("Este estudante já enviou a atividade. Cada aluno pode enviar apenas uma vez.");
    const claimed = await claimBiologySubmission({ id: activity.id, answersJson: JSON.stringify(input.answers), objectiveScore: grade.correct });
    if (!claimed) throw new Error("Esta atividade já foi enviada. Cada estudante pode enviar apenas uma vez.");

    try {
      const result = await sendToAppsScript(buildAppsScriptPayload(activity, input.answers, grade));
      await updateBiologySync({ id: activity.id, status: "SYNCED", row: result.row });
      return { accepted: true, syncStatus: "SYNCED" as const, score: grade.correct, total: grade.total, row: result.row };
    } catch (error) {
      await updateBiologySync({ id: activity.id, status: "SYNC_FAILED" });
      return { accepted: true, syncStatus: "SYNC_FAILED" as const, score: grade.correct, total: grade.total, row: undefined, message: error instanceof Error ? error.message : "Não foi possível sincronizar com a planilha." };
    }
  }),
});
