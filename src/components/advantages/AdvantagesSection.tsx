"use client";

import { motion } from "framer-motion";

const AdvantagesSection = () => {
  const advantages = [
    {
      number: "01",
      title: "Версионный контроль файлов и изменений",
      description:
        "Отслеживание всех изменений в документах с возможностью возврата к предыдущим версиям",
      icon: (
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      ),
    },
    {
      number: "02",
      title: "Контроль проекта в одной системе",
      description:
        "Централизованное управление всеми аспектами проекта от планирования до реализации",
      icon: (
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        </div>
      ),
    },
    {
      number: "03",
      title: "Готовый пакет методичек и справочников",
      description:
        "Комплексная база знаний по расчетам и разработке для повышения эффективности работы",
      icon: (
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V6h10v2z" />
          </svg>
        </div>
      ),
    },
    {
      number: "04",
      title: "Ведение проекта разработки документации",
      description:
        "Системный подход к созданию и контролю технической документации проекта",
      icon: (
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
        </div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="advantages" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Преимущества
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-20"
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.number}
              variants={itemVariants}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Текстовая часть */}
              <motion.div
                variants={itemVariants}
                className={`space-y-6 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    variants={itemVariants}
                    className="text-5xl font-bold gradient-text"
                  >
                    {advantage.number}
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="h-px bg-gradient-to-r from-[var(--accent-primary)] to-transparent flex-1"
                  />
                </div>
                <motion.h3
                  variants={itemVariants}
                  className="text-2xl lg:text-3xl font-semibold text-white"
                >
                  {advantage.title}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-white/80 leading-relaxed text-lg"
                >
                  {advantage.description}
                </motion.p>
              </motion.div>

              {/* Графическая часть */}
              <motion.div
                variants={iconVariants}
                className={`flex justify-center ${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                }`}
              >
                <div className="relative">
                  {advantage.icon}
                  {/* Декоративные элементы */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute -inset-4 rounded-xl bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 blur-xl -z-10"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[var(--accent-primary)] animate-pulse"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-[var(--accent-secondary)] animate-pulse"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
