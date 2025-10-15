"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageContext } from "@/shared/context/PageContext";

const HeroContent = () => {
  const { setCurrentPage } = usePageContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownloadClick = () => {
    setCurrentPage("download");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-tertiary)] to-[var(--bg-secondary)]">
      {/* Основной контент */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Главный заголовок */}
        <motion.h1
          className="text-8xl md:text-9xl lg:text-[12rem] font-black text-gray-900 mb-8 tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          <span className="block text-gray-900 drop-shadow-sm">DOCIM</span>
        </motion.h1>

        {/* SEO-оптимизированный текст */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
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
          initial={{ opacity: 0, y: 16 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          <motion.button
            onClick={handleDownloadClick}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Скачать программу
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroContent;
