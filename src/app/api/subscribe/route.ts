import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();

    try {
      await connection.query("INSERT INTO users (email) VALUES (?)", [email]);

      return NextResponse.json({
        success: true,
        message: "Email успешно добавлен в подписку",
      });
    } catch (error: unknown) {
      console.error("Ошибка при добавлении подписчика:", error);

      // Обработка дубликата email
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ER_DUP_ENTRY"
      ) {
        return NextResponse.json(
          {
            error: "Вы уже подписаны на рассылку",
            code: "DUPLICATE_EMAIL",
          },
          { status: 409 }
        );
      }

      // Обработка других ошибок базы данных
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ER_NO_SUCH_TABLE"
      ) {
        return NextResponse.json(
          {
            error: "Ошибка конфигурации базы данных",
            code: "TABLE_NOT_FOUND",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          error: "Внутренняя ошибка сервера",
          code: "INTERNAL_ERROR",
        },
        { status: 500 }
      );
    } finally {
      connection.release();
      await pool.end();
    }
  } catch (error) {
    console.error("Ошибка API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
