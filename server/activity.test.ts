import { describe, expect, it } from "vitest";
import { buildActivity, buildAppsScriptPayload, createSeededRandom, FIXED_QUESTIONS, gradeObjectiveAnswers, toPublicActivity } from "./activity";

describe("atividade fixa de Biologia", () => {
  it("possui exatamente sete questões objetivas e três discursivas", () => {
    expect(FIXED_QUESTIONS).toHaveLength(10);
    expect(FIXED_QUESTIONS.filter(question => question.type === "objective")).toHaveLength(7);
    expect(FIXED_QUESTIONS.filter(question => question.type === "discursive")).toHaveLength(3);
  });

  it("embaralha alternativas sem perder o gabarito", () => {
    const activity = buildActivity({ id: "atividade-001", studentId: "01", studentNumber: 1, studentName: "Estudante", studentRa: "000000000001", studentDigit: "0", studentEmail: "teste@example.com", random: () => 0 });
    const answers = activity.questions.map(question => ({ questionNumber: question.number, answer: question.type === "objective" ? question.correctOption : "Resposta discursiva." }));
    const grade = gradeObjectiveAnswers(activity, answers);
    expect(grade).toMatchObject({ correct: 7, total: 7 });
  });

  it("mantém uma ordem embaralhada e numeração sequencial para o mesmo acesso", () => {
    const first = buildActivity({ id: "preview-1", studentId: "preview", studentNumber: 0, studentName: "Prévia", studentRa: "", studentDigit: "", studentEmail: "", random: createSeededRandom("acesso-publico-123") });
    const second = buildActivity({ id: "atividade-1", studentId: "01", studentNumber: 1, studentName: "Estudante", studentRa: "000000000001", studentDigit: "0", studentEmail: "teste@example.com", random: createSeededRandom("acesso-publico-123") });
    expect(first.questions.map(question => question.id)).toEqual(second.questions.map(question => question.id));
    expect(first.questions.map(question => question.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("não expõe o gabarito ou o índice correto no objeto público", () => {
    const activity = buildActivity({ id: "atividade-002", studentId: "02", studentNumber: 2, studentName: "Estudante", studentRa: "000000000002", studentDigit: "0", studentEmail: "teste@example.com" });
    const publicActivity = toPublicActivity(activity);
    for (const question of publicActivity.questions) {
      expect(question).not.toHaveProperty("correctIndex");
      expect(question).not.toHaveProperty("correctOption");
    }
  });

  it("remove metadados de gabarito de um registro antigo", () => {
    const activity = buildActivity({ id: "atividade-003", studentId: "03", studentNumber: 3, studentName: "Estudante", studentRa: "000000000003", studentDigit: "0", studentEmail: "teste@example.com" });
    const legacyActivity = JSON.parse(JSON.stringify(activity)) as StoredActivity & { questions: Array<StoredActivity["questions"][number] & { correctIndex?: number }> };
    legacyActivity.questions[0]!.correctIndex = 2;
    expect(toPublicActivity(legacyActivity).questions[0]).not.toHaveProperty("correctIndex");
  });

  it("constrói um payload completo para o Apps Script", () => {
    const activity = buildActivity({ id: "atividade-004", studentId: "04", studentNumber: 4, studentName: "Estudante", studentRa: "000000000004", studentDigit: "4", studentEmail: "estudante@example.com" });
    const answers = activity.questions.map(question => ({ questionNumber: question.number, answer: question.type === "objective" ? question.correctOption : "Resposta argumentada." }));
    const payload = buildAppsScriptPayload(activity, answers, gradeObjectiveAnswers(activity, answers));
    expect(payload).toMatchObject({ studentNumber: 4, studentRa: "000000000004", studentDigit: "4", studentEmail: "estudante@example.com", objectiveScore: 7 });
    expect(payload.answers).toHaveLength(10);
  });
});
