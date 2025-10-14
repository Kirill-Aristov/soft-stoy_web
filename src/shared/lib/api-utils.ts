// Общие функции для API
export function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export async function readJson(request: Request) {
  try {
    const data = await request.json();
    return data;
  } catch {
    throw new Error("Invalid JSON");
  }
}

export const config = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "3306"),
  DB_USER: process.env.DB_USER || "",
  DB_PASS: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587"),
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASSWORD || "",
  MAIL_FROM: process.env.SMTP_FROM || "",
  MAIL_TO: process.env.SMTP_TO || "",
};
