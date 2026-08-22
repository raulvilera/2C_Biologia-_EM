import { describe, expect, it } from "vitest";
import { QUESTION_VISUALS, getQuestionVisual } from "../client/src/lib/questionVisuals";

describe("recursos visuais dos enunciados", () => {
  it("associa uma imagem acessível a cada uma das dez questões fixas", () => {
    expect(Object.keys(QUESTION_VISUALS)).toHaveLength(10);
    expect(getQuestionVisual("bioethics-consent")?.label).toBe("Imagem científica real");
    expect(Object.values(QUESTION_VISUALS).every(visual => visual.src.startsWith("/manus-storage/") && visual.alt.length > 30)).toBe(true);
  });
});
