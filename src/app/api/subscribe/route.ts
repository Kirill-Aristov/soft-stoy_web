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
      await connection.query("INSERT INTO subscribers (email) VALUES (?)", [
        email,
      ]);

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Ошибка при добавлении подписчика:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
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
