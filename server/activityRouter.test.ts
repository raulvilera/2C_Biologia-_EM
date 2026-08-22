import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildActivity } from "./activity";
import { STUDENTS } from "./students";

const mocks = vi.hoisted(() => ({
  claim: vi.fn(),
  get: vi.fn(),
  create: vi.fn(),
  sync: vi.fn(),
  send: vi.fn(),
  health: vi.fn(),
  previous: vi.fn(),
  reserve: vi.fn(),
}));

vi.mock("./db", () => ({
  claimBiologySubmission: mocks.claim,
  createBiologyActivity: mocks.create,
  getBiologyActivity: mocks.get,
  getBiologyStudentSubmission: mocks.previous,
  reserveBiologyStudentSubmission: mocks.reserve,
  updateBiologySync: mocks.sync,
}));

vi.mock("./appsScript", () => ({
  checkAppsScriptConnection: mocks.health,
  sendToAppsScript: mocks.send,
}));

import { activityRouter } from "./activityRouter";

describe("envio único da atividade", () => {
  const activity = buildActivity({
    id: "atividade-envio-unico",
    studentId: "1",
    studentNumber: 1,
    studentName: "Estudante de teste",
    studentRa: "000000000001",
    studentDigit: "1",
    studentEmail: "teste@example.com",
  });
  const answers = activity.questions.map(question => ({ questionNumber: question.number, answer: question.type === "objective" ? question.correctOption : "Resposta discursiva de teste." }));

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.get.mockResolvedValue({ questionsJson: JSON.stringify(activity) });
    mocks.previous.mockResolvedValue(null);
    mocks.send.mockResolvedValue({ status: "ok", row: 12 });
  });

  it("aceita o primeiro envio e bloqueia o segundo", async () => {
    const caller = activityRouter.createCaller({} as never);
    mocks.reserve.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    mocks.claim.mockResolvedValue(true);

    const first = await caller.submit({ activityId: activity.id, answers });
    expect(first).toMatchObject({ accepted: true, syncStatus: "SYNCED", row: 12, total: 7 });
    expect(mocks.send).toHaveBeenCalledTimes(1);

    await expect(caller.submit({ activityId: activity.id, answers })).rejects.toThrow("Cada aluno pode enviar apenas uma vez");
    expect(mocks.send).toHaveBeenCalledTimes(1);
  });

  it("bloqueia uma nova atividade quando o estudante já enviou em outro acesso", async () => {
    const caller = activityRouter.createCaller({} as never);
    mocks.previous.mockResolvedValue({ studentId: String(STUDENTS[0].number), activityId: "atividade-anterior" });

    await expect(caller.create({ id: String(STUDENTS[0].number) })).rejects.toThrow("Cada aluno pode enviar apenas uma vez");
    expect(mocks.create).not.toHaveBeenCalled();
  });
});
