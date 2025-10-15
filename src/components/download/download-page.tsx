"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { validateEmail } from "@/shared/utils/validate";
import { usePageContext } from "@/shared/context/PageContext";

const DownloadPage = () => {
  const { setCurrentPage } = usePageContext();
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

  const handleBackClick = () => {
    setCurrentPage("home");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailErrorMessage("Некорректный email");
      return;
    }

    setIsLoading(true);
    setEmailErrorMessage("");

    try {
      const requestData = { email };

      const response = await fetch("/api/subscribe.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const raw = await response.text();
      let data: { ok?: boolean; error?: string; code?: string } | null = null;

      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        throw new Error("Invalid JSON response");
      }

      // Проверяем успешный ответ
      if (response.ok && data?.ok) {
        setIsAlreadySubscribed(false);
        setIsSubmitted(true);
      } else if (response.status === 409 || data?.code === "DUPLICATE_EMAIL") {
        // Дублирование email
        setIsAlreadySubscribed(true);
        setEmailErrorMessage("");
        setIsSubmitted(true);
      } else {
        // Другие ошибки
        setEmailErrorMessage(
          data?.error || "Произошла ошибка. Повторите позже."
        );
      }
    } catch (error) {
      setEmailErrorMessage(
        "Произошла ошибка сети. Проверьте подключение к интернету."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-tertiary)] to-[var(--bg-secondary)] flex items-center justify-center px-4 py-20">
      {/* Кнопка назад */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-20 left-6 z-10"
      >
        <motion.button
          onClick={handleBackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)]/10 backdrop-blur-md rounded-lg border border-[var(--text-tertiary)]/30 text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </motion.button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          variants={itemVariants}
          className="bg-[var(--bg-secondary)]/80 backdrop-blur-md rounded-2xl p-6 border border-[var(--text-tertiary)]/30"
        >
          <motion.h1
            variants={itemVariants}
            className="text-8xl md:text-8xl lg:text-[8rem] font-black text-gray-900 mb-2 tracking-tight"
          >
            DOCIM
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
              Продукт находится в разработке
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Мы работаем над созданием инновационного решения для вашего
              бизнеса. Оставьте свой email, чтобы получить уведомление о релизе
              продукта и быть среди первых, кто получит доступ к новым
              возможностям.
            </p>
          </motion.div>

          {!isSubmitted ? (
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите ваш email"
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-6 py-4 bg-[var(--bg-tertiary)] border border-[var(--text-tertiary)]/30 rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/30 text-[var(--text-white)] font-semibold py-4 px-8 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading
                      ? "Отправка..."
                      : "Получить уведомление о релизе"}
                  </Button>
                  {emailErrorMessage && (
                    <p className="text-red-500 text-sm">{emailErrorMessage}</p>
                  )}
                </motion.div>
              </motion.div>
            </motion.form>
          ) : (
            <motion.div
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div
                variants={itemVariants}
                className="text-[var(--accent-secondary)] text-6xl mb-4"
              >
                ✓
              </motion.div>
              <motion.h3
                variants={itemVariants}
                className="text-xl font-semibold text-[var(--text-primary)] mb-2"
              >
                {isAlreadySubscribed
                  ? "Вы уже подписаны на нас"
                  : "Спасибо за интерес!"}
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-[var(--text-secondary)]"
              >
                {isAlreadySubscribed
                  ? "Этот email уже подписан на рассылку"
                  : "Мы отправим вам уведомление, как только продукт будет готов к релизу"}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DownloadPage;
