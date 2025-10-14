import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email обязателен" }, { status: 400 });
    }

    const subject = "Запрос на связь по тарифам DOCIM";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">${subject}</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Имя:</strong> ${name || "-"}</p>
          <p><strong>Телефон:</strong> ${phone || "-"}</p>
          <p><strong>Дата:</strong> ${new Date().toLocaleString("ru-RU")}</p>
        </div>
      </div>
    `;

    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info_docim@soft-stroypro.ru",
      subject,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json({ success: true, message: "Заявка отправлена" });
  } catch (error) {
    console.error("Ошибка pricing API:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке заявки" },
      { status: 500 }
    );
  }
}
