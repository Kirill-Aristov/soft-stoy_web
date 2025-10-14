import AdvantagesSection from "@/components/advantages/AdvantagesSection";
import Header from "@/components/header/header";
import PricingSection from "@/components/pricing/PricingSection";
import Footer from "@/components/footer/footer";
import HeroContent from "@/components/main/HeroContent";
import { notFound } from "next/navigation";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Навигация */}
      <Header />

      {/* Основной контент */}
      <main>
        {/* Герой-секция */}
        <HeroContent />

        {/* Преимущества */}
        <AdvantagesSection />

        {/* Тарифные планы */}
        <PricingSection />
      </main>

      {/* Футер */}
      <Footer />
    </div>
  );
}
