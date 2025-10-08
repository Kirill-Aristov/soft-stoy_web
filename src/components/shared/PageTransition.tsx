"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  useEffect(() => {
    // Добавляем класс анимации входа при загрузке страницы
    document.body.classList.add("page-transition-enter");

    // Убираем класс после завершения анимации
    const timer = setTimeout(() => {
      document.body.classList.remove("page-transition-enter");
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 1.02,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.98,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
