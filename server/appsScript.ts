const DEFAULT_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGAB0aifvKGD5NU5rrvupIk2UruQoC1HBE_PxsrzPmdDHCmzfd6PHf3tXkZhm5B5sX/exec";
const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;

function getEndpoint() {
  if (!endpoint) throw new Error("GOOGLE_APPS_SCRIPT_URL não está configurada.");
  return endpoint;
}

export async function checkAppsScriptConnection() {
  const url = new URL(getEndpoint());
  url.searchParams.set("endpoint", "health");
  const response = await fetch(url, { method: "GET", redirect: "follow", cache: "no-store" });
  const payload = await response.json() as { status?: string; service?: string; sheet?: string };
  if (!response.ok || payload.status !== "ok") throw new Error("O Apps Script não respondeu ao health check.");
  return payload;
}

export async function sendToAppsScript(payload: Record<string, unknown>) {
  const response = await fetch(getEndpoint(), {
    method: "POST",
    redirect: "follow",
    headers: { "content-type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const raw = await response.text();
  let data: { status?: string; row?: number; message?: string } = {};
  try { data = JSON.parse(raw) as typeof data; } catch { /* resposta não JSON será tratada abaixo */ }
  if (!response.ok || data.status === "error") throw new Error(data.message || "O Apps Script recusou o registro.");
  return data;
}