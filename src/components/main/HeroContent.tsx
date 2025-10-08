"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { smoothPageTransition } from "@/lib/utils";

const HeroContent = () => {
  const handleTryFreeClick = () => {
    smoothPageTransition("/download");
  };

  const handleDemoClick = () => {
    // Можно добавить ссылку на демо или прокрутить к секции
    console.log("Demo click");
  };

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

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[var(--bg-secondary)] via-white to-[var(--bg-tertiary)]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1
              variants={itemVariants}
              className="text-6xl lg:text-7xl font-bold text-[var(--text-primary)] mb-6 leading-tight"
            >
              <span className="gradient-text">DOCIM</span>
            </motion.h1>
            <div className="space-y-3 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              <motion.p variants={itemVariants}>
                Инновационная платформа для управления
              </motion.p>
              <motion.p variants={itemVariants}>
                инженерными проектами и модернизации
              </motion.p>
              <motion.p variants={itemVariants}>
                технологических процессов
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleTryFreeClick}
              className="px-8 py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg text-[var(--text-white)] font-medium hover:shadow-lg hover:shadow-[var(--accent-primary)]/30 transition-all duration-300 glow-effect flex items-center gap-3 cursor-pointer group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Попробовать бесплатно
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleDemoClick}
              className="px-8 py-4 border border-[var(--accent-primary)] rounded-lg text-[var(--text-primary)] font-medium hover:bg-[var(--accent-primary)]/10 transition-all duration-300 cursor-pointer"
            >
              Смотреть демо
            </motion.button>
          </motion.div>

          {/* Статистика */}
          <motion.div
            variants={statsVariants}
            className="grid grid-cols-3 gap-6 pt-8"
          >
            <motion.div variants={statItemVariants} className="text-center">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-[var(--text-secondary)] text-sm">
                Проектов
              </div>
            </motion.div>
            <motion.div variants={statItemVariants} className="text-center">
              <div className="text-3xl font-bold gradient-text">50+</div>
              <div className="text-[var(--text-secondary)] text-sm">
                Компаний
              </div>
            </motion.div>
            <motion.div variants={statItemVariants} className="text-center">
              <div className="text-3xl font-bold gradient-text">99.9%</div>
              <div className="text-[var(--text-secondary)] text-sm">Uptime</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroContent;
