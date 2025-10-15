"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen">
      {/* Навигация */}
      <Header />

      {/* Основной контент */}
      <main>{children}</main>

      {/* Футер */}
      <Footer />
    </div>
  );
};

export default AppLayout;
