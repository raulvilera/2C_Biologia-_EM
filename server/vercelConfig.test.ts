import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

describe("configuração da Vercel", () => {
  it("publica o cliente Vite e encaminha API e imagens sem gravar segredos", () => {
    const config = JSON.parse(readFileSync(resolve(projectRoot, "vercel.json"), "utf8")) as {
      buildCommand: string;
      outputDirectory: string;
      rewrites: Array<{ source: string; destination: string }>;
    };

    expect(config.buildCommand).toBe("pnpm build:vercel");
    expect(config.outputDirectory).toBe("dist/public");
    expect(config.rewrites).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: "/api/:path*", destination: expect.stringContaining("/api/:path*") }),
        expect.objectContaining({ source: "/manus-storage/:path*", destination: expect.stringContaining("/manus-storage/:path*") }),
        expect.objectContaining({ destination: "/index.html" }),
      ]),
    );

    const serialized = JSON.stringify(config);
    expect(serialized).not.toMatch(/GOOGLE_APPS_SCRIPT_URL|DATABASE_URL|JWT_SECRET|BUILT_IN_FORGE_API_KEY/);
  });
});
