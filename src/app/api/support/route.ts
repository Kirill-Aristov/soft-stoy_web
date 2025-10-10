import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Конфигурация SMTP транспорта
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true для 465, false для других портов
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const { email, message, type } = await request.json();

    if (!email || !message || !type) {
      return NextResponse.json(
        { error: "Все поля обязательны для заполнения" },
        { status: 400 }
      );
    }

    const transporter = createTransporter();

    // Определяем тему письма в зависимости от типа
    const subject =
      type === "feedback"
        ? "Обратная связь с сайта DOCIM"
        : "Запрос в техническую поддержку DOCIM";

    // Формируем HTML содержимое письма
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">${subject}</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email отправителя:</strong> ${email}</p>
          <p><strong>Тип обращения:</strong> ${
            type === "feedback" ? "Обратная связь" : "Техническая поддержка"
          }</p>
          <p><strong>Дата:</strong> ${new Date().toLocaleString("ru-RU")}</p>
        </div>
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="color: #1e293b; margin-top: 0;">Сообщение:</h3>
          <p style="line-height: 1.6; color: #475569;">${message.replace(
            /\n/g,
            "<br>"
          )}</p>
        </div>
      </div>
    `;

    // Отправляем письмо
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info_docim@soft-stroypro.ru",
      subject: subject,
      html: htmlContent,
      replyTo: email, // Устанавливаем email отправителя для ответа
    });

    return NextResponse.json({
      success: true,
      message: "Сообщение успешно отправлено",
    });
  } catch (error) {
    console.error("Ошибка отправки письма:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке сообщения" },
      { status: 500 }
    );
  }
}
