"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { smoothScrollTo } from "@/shared/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/shared/ui/sheet";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

const Header = () => {
  const router = useRouter();
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

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
    // Добавляем класс для анимации выхода
    document.body.classList.add("page-transition-exit");

    setTimeout(() => {
      router.push("/download");
    }, 300);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-primary)] backdrop-blur-md border-b border-[var(--text-tertiary)]/30 shadow-md"
          : "bg-[var(--bg-primary)]"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <div className="text-2xl font-bold text-[var(--text-white)] cursor-pointer">
            DOCIM
          </div>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <Button
                    variant="ghost"
                    onClick={
                      item.href === "/download"
                        ? handleDownloadClick
                        : undefined
                    }
                    className="text-[var(--text-white)] hover:text-[var(--accent-primary)] hover:bg-transparent cursor-pointer"
                  >
                    {item.title}
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(item.sectionId)}
                    className="text-[var(--text-white)] hover:text-[var(--accent-primary)] hover:bg-transparent cursor-pointer"
                  >
                    {item.title}
                  </Button>
                )}
              </div>
            ))}
          </nav>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-[var(--text-white)] hover:text-[var(--accent-primary)] cursor-pointer h-12 w-12 relative"
                >
                  <Menu className="h-6 w-6 relative" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="backdrop-blur-md border-b border-[var(--text-tertiary)]/30 bg-[var(--bg-primary)]"
              >
                <SheetHeader>
                  <SheetTitle className="text-[var(--text-white)] text-left">
                    Меню
                  </SheetTitle>
                  <SheetDescription className="text-[var(--text-white)]/70 text-left">
                    Навигация по сайту
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  {items.map((item) => (
                    <div key={item.title} className="w-full">
                      {item.href ? (
                        <Button
                          variant="ghost"
                          onClick={
                            item.href === "/download"
                              ? handleDownloadClick
                              : () => setIsMenuOpen(false)
                          }
                          className="text-[var(--text-white)] hover:text-[var(--accent-primary)] hover:bg-[var(--text-white)]/10 justify-start text-left h-12 w-full"
                        >
                          {item.title}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() => scrollToSection(item.sectionId)}
                          className="text-[var(--text-white)] hover:text-[var(--accent-primary)] hover:bg-[var(--text-white)]/10 justify-start text-left h-12 w-full"
                        >
                          {item.title}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
