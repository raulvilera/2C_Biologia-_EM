import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildActivity } from "./activity";

const mocks = vi.hoisted(() => ({
  claim: vi.fn(),
  get: vi.fn(),
  create: vi.fn(),
  sync: vi.fn(),
  send: vi.fn(),
  health: vi.fn(),
}));

vi.mock("./db", () => ({
  claimBiologySubmission: mocks.claim,
  createBiologyActivity: mocks.create,
  getBiologyActivity: mocks.get,
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
    mocks.send.mockResolvedValue({ status: "ok", row: 12 });
  });

  it("aceita o primeiro envio e bloqueia o segundo", async () => {
    const caller = activityRouter.createCaller({} as never);
    mocks.claim.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

    const first = await caller.submit({ activityId: activity.id, answers });
    expect(first).toMatchObject({ accepted: true, syncStatus: "SYNCED", row: 12, total: 7 });
    expect(mocks.send).toHaveBeenCalledTimes(1);

    await expect(caller.submit({ activityId: activity.id, answers })).rejects.toThrow("Cada estudante pode enviar apenas uma vez");
    expect(mocks.send).toHaveBeenCalledTimes(1);
  });
});
