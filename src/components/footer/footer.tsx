"use client";

import { Mail, Clock, Building } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { TechnicalSupportForm } from "./technical-support-alert";
import { FeedbackForm } from "./feedback-alert";

const Footer = () => {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      id="contacts"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-4 px-6 border-t border-[var(--border-primary)] bg-[var(--bg-primary)]"
    >
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          className="grid sm:grid-cols-2 gap-8 my-8"
        >
          {/* Контактная информация */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-[var(--text-white)] mb-6">
              Контакты
            </h3>
            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <Building className="w-5 h-5 text-[var(--accent-primary)] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[var(--text-white)] font-medium">
                    ООО &quot;СофтСтрой Проект&quot;
                  </div>
                  <div className="text-[var(--text-white)]/70 text-sm">
                    ИНН: 5981013198
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                <motion.a
                  href="mailto:info@softstroy-project.ru"
                  whileHover={{ scale: 1.05 }}
                  className="text-[var(--text-white)]/90 hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                >
                  info@softstroy-project.ru
                </motion.a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <Clock className="w-5 h-5 text-[var(--accent-primary)] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[var(--text-white)]/90">
                    Пн-Пт: 9:00 - 20:00 (МСК)
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Поддержка */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-[var(--text-white)] mb-6">
              Поддержка
            </h3>
            <ul className="space-y-3">
              <motion.li variants={itemVariants}>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="text-[var(--text-white)]/80 hover:text-[var(--accent-primary)] transition-colors cursor-pointer inline-block"
                >
                  База знаний
                </motion.a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.button
                  onClick={() => setIsSupportOpen(true)}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[var(--text-white)]/80 hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                >
                  Техническая поддержка
                </motion.button>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.button
                  onClick={() => setIsFeedbackOpen(true)}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[var(--text-white)]/80 hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                >
                  Обратная связь
                </motion.button>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Нижняя часть */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-[var(--border-primary)]"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
            <motion.div
              variants={itemVariants}
              className="text-[var(--text-white)]/60 text-sm"
            >
              © 2025 ООО &quot;СофтСтрой Проект&quot;. Все права защищены.
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-6 text-sm">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-[var(--text-white)]/60 hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
              >
                Политика конфиденциальности
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-[var(--text-white)]/60 hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
              >
                Пользовательское соглашение
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Формы */}
      <TechnicalSupportForm
        open={isSupportOpen}
        onOpenChange={setIsSupportOpen}
      />
      <FeedbackForm open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen} />
    </motion.footer>
  );
};

export default Footer;
