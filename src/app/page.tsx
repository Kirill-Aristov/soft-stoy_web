import AdvantagesSection from "@/components/advantages/AdvantagesSection";
import Header from "@/components/header/header";
import PricingSection from "@/components/pricing/PricingSection";
import Footer from "@/components/footer/footer";
import HeroContent from "@/components/main/HeroContent";
import PageTransition from "@/components/shared/PageTransition";

export default function Home() {
  return (
    <PageTransition>
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
    </PageTransition>
  );
}
