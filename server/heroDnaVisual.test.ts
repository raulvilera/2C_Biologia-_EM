import { describe, expect, it } from "vitest";
import { DNA_BASE_PAIRS } from "../client/src/components/DnaHelix3D";

describe("modelo 3D de DNA da abertura", () => {
  it("representa ao menos uma volta da dupla-hélice com os pareamentos corretos", () => {
    expect(DNA_BASE_PAIRS).toHaveLength(14);
    expect(DNA_BASE_PAIRS.every(pair => (pair.left === "A" && pair.right === "T" && pair.bonds === 2) || (pair.left === "T" && pair.right === "A" && pair.bonds === 2) || (pair.left === "C" && pair.right === "G" && pair.bonds === 3) || (pair.left === "G" && pair.right === "C" && pair.bonds === 3))).toBe(true);
  });
});
