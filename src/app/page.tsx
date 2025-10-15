"use client";

import AdvantagesSection from "@/components/advantages/AdvantagesSection";
import PricingSection from "@/components/pricing/PricingSection";
import HeroContent from "@/components/main/HeroContent";
import DownloadPage from "@/components/download/download-page";
import AppLayout from "@/components/layout/AppLayout";
import StructuredData from "@/components/seo/StructuredData";
import { PageProvider, usePageContext } from "@/shared/context/PageContext";

const HomeContent = () => {
  const { currentPage } = usePageContext();

  if (currentPage === "download") {
    return <DownloadPage />;
  }

  return (
    <>
      {/* Герой-секция */}
      <HeroContent />

      {/* Преимущества */}
      <AdvantagesSection />

      {/* Тарифные планы */}
      <PricingSection />
    </>
  );
};

export default function Home() {
  return (
    <PageProvider>
      <StructuredData />
      <AppLayout>
        <HomeContent />
      </AppLayout>
    </PageProvider>
  );
}
