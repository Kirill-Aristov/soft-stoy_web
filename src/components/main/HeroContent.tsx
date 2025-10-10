"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroContent = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden from-white via-gray-50 to-gray-100">
      {/* Анимированный фон с иконками */}

      {/* Основной контент */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Главный заголовок */}
        <motion.h1
          className="text-8xl md:text-9xl lg:text-[12rem] font-black text-gray-900 mb-8 tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            className="block"
            animate={{
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 20px rgba(37, 99, 235, 0.3)",
                "0 0 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            DOCIM
          </motion.span>
        </motion.h1>

        {/* SEO-оптимизированный текст */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            Профессиональная система управления
            <br />
            строительной документацией
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            Комплексное решение для автоматизации процессов создания, <br />
            согласования и контроля разработки строительной документации <br />
            Интегрированная платформа для архитекторов, инженеров, <br />
            проектировщиков и строительных компаний
          </p>
        </motion.div>

        {/* CTA кнопки */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.button
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/download">Скачать программу</Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroContent;
