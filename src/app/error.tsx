"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: ErrorPageProps) {
  const { error } = props;
  useEffect(() => {
    // Можно отправить лог на сервер/аналитику
    // console.error(error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Произошла ошибка
          </h1>
          <p className="text-muted-foreground">
            {error?.message ||
              "Не удалось загрузить страницу. Попробуйте снова."}
          </p>
          {error?.digest && (
            <p className="text-xs text-muted-foreground">Код: {error.digest}</p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <Button onClick={() => (window.location.href = "/")}>
            На главную
          </Button>
        </div>
      </div>
    </main>
  );
}
