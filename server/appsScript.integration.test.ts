import { describe, expect, it } from "vitest";

describe("Apps Script configurado", () => {
  it("responde ao health check com a aba da atividade", async () => {
    const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;
    expect(endpoint).toBeTruthy();

    const url = new URL(endpoint!);
    url.searchParams.set("endpoint", "health");

    const response = await fetch(url, { redirect: "follow" });
    expect(response.ok).toBe(true);

    const payload = await response.json() as { status?: string; service?: string; sheet?: string };
    expect(payload).toMatchObject({
      status: "ok",
      service: "bio-2serie-c-3bimestre",
      sheet: "2ºBIO 3º",
    });
  }, 20_000);
});
