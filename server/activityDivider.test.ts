import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("divisória temática da atividade", () => {
  it("apresenta título, temas e sombra inferior solicitados", () => {
    const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(home).toContain("ATIVIDADE DE BIOLOGIA");
    expect(home).toContain("(3º BIMESTRE)");
    expect(home).toContain("Temas:");
    expect(home).toContain("DNA, RNA, Tradução, Replicação.");
    expect(home).toContain("textShadow: \"0 5px 0 rgba(18, 66, 78, 0.16)\"");
  });
});
