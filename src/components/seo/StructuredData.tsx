import Script from "next/script";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DOCIM",
    description:
      "Профессиональная платформа для автоматизации процессов создания, согласования и контроля разработки строительной документации",
    url: "https://soft-stroypro.ru",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: "ООО СофтСтрой Проект",
      url: "https://soft-stroypro.ru",
    },
    featureList: [
      "Автоматизация создания проектной документации",
      "Система согласования документов",
      "Контроль разработки документации",
      "Интеграция с CAD системами",
      "Электронный документооборот",
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default StructuredData;
