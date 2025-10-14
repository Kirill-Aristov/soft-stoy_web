"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground">Такой страницы не существует</p>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => router.push("/")}>На главную</Button>
        <Button variant="outline" onClick={() => router.back()}>
          Назад
        </Button>
      </div>
    </div>
  );
}
