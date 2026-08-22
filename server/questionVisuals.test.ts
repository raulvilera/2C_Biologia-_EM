import { describe, expect, it } from "vitest";
import { QUESTION_VISUALS, getQuestionVisual } from "../client/src/lib/questionVisuals";

describe("recursos visuais dos enunciados", () => {
  it("associa uma imagem científica acessível a cada uma das dez questões fixas", () => {
    expect(Object.keys(QUESTION_VISUALS)).toHaveLength(10);
    expect(getQuestionVisual("bioethics-consent")?.label).toBe("Micrografia real de células humanas");
    expect(Object.values(QUESTION_VISUALS).every(visual => visual.src.startsWith("/manus-storage/") && visual.alt.length > 45)).toBe(true);
  });

  it("usa um recurso visual diferente para cada enunciado", () => {
    const sources = Object.values(QUESTION_VISUALS).map(visual => visual.src);
    expect(new Set(sources).size).toBe(10);
    expect(Object.values(QUESTION_VISUALS).every(visual => visual.credit?.href.startsWith("https://"))).toBe(true);
  });
});
