"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { smoothScrollTo, smoothPageTransition } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/shared/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

const Header = () => {
  const items = [
    {
      title: "Преимущества",
      href: "",
      sectionId: "advantages",
    },
    {
      title: "Тарифы",
      href: "",
      sectionId: "pricing",
    },
    {
      title: "Скачать",
      href: "/download",
      sectionId: "",
    },
    {
      title: "Контакты",
      href: "",
      sectionId: "contacts",
    },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Проверяем позицию скролла при загрузке страницы
    const checkInitialScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Проверяем сразу при монтировании компонента
    checkInitialScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    console.log(`Scrolling to section: ${sectionId}`);
    smoothScrollTo(sectionId, 100);
    setIsMenuOpen(false);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothPageTransition("/download");
  };
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-primary)]"
          : "bg-[var(--bg-primary)]/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text cursor-pointer"
          >
            DOCIM
          </motion.div>

          {/* Навигация для десктопа */}
          <motion.nav
            variants={itemVariants}
            className="hidden md:flex items-center space-x-8"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                {item.href ? (
                  <Button
                    variant="ghost"
                    onClick={
                      item.href === "/download"
                        ? handleDownloadClick
                        : undefined
                    }
                    className="text-[var(--text-white)] hover:text-[var(--accent-primary)] transition-colors duration-300 hover:bg-transparent cursor-pointer"
                  >
                    {item.title}
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(item.sectionId)}
                    className="text-[var(--text-white)] hover:text-[var(--accent-primary)] transition-colors duration-300 hover:bg-transparent cursor-pointer"
                  >
                    {item.title}
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* Мобильное меню */}
          <motion.div variants={itemVariants} className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-[var(--text-white)] hover:text-[var(--accent-primary)] cursor-pointer h-12 w-12 relative"
                  >
                    <Menu className="h-6 w-6 relative" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-primary)]"
              >
                <SheetHeader>
                  <SheetTitle className="text-[var(--text-white)] text-left">
                    Меню
                  </SheetTitle>
                  <SheetDescription className="text-[var(--text-white)]/70 text-left">
                    Навигация по сайту
                  </SheetDescription>
                </SheetHeader>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                  className="flex flex-col space-y-4 mt-6"
                >
                  {items.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      {item.href ? (
                        <Button
                          variant="ghost"
                          onClick={
                            item.href === "/download"
                              ? handleDownloadClick
                              : () => setIsMenuOpen(false)
                          }
                          className="text-[var(--text-white)] hover:text-[var(--accent-primary)] transition-colors duration-300 hover:bg-[var(--text-white)]/10 justify-start text-left h-12 w-full"
                        >
                          {item.title}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() => scrollToSection(item.sectionId)}
                          className="text-[var(--text-white)] hover:text-[var(--accent-primary)] transition-colors duration-300 hover:bg-[var(--text-white)]/10 justify-start text-left h-12 w-full"
                        >
                          {item.title}
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
