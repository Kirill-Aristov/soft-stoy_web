"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { smoothPageTransition } from "@/lib/utils";

const DownloadPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Здесь можно добавить логику отправки email
    }
  };

  const handleBackClick = () => {
    smoothPageTransition("/");
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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
        ease: "easeOut",
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
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
      {/* Кнопка назад */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-6 left-6 z-10"
      >
        <motion.button
          onClick={handleBackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
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
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold gradient-text mb-6"
          >
            DOCIM
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Продукт находится в разработке
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
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
                  className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-300"
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
                    className="w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/30 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300"
                  >
                    Получить уведомление о релизе
                  </Button>
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
                className="text-[var(--accent-primary)] text-6xl mb-4"
              >
                ✓
              </motion.div>
              <motion.h3
                variants={itemVariants}
                className="text-xl font-semibold text-white mb-2"
              >
                Спасибо за интерес!
              </motion.h3>
              <motion.p variants={itemVariants} className="text-gray-300">
                Мы отправим вам уведомление, как только продукт будет готов к
                релизу.
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DownloadPage;
