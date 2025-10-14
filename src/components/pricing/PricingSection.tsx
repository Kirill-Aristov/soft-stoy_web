"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { apiUrl } from "@/shared/lib/api";
import { validateEmail } from "@/shared/utils/validate";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const plans = [
    {
      name: "Индивидуальный",
      description: "Для небольших проектов",
      monthlyPrice: 490,
      features: [
        "До 25 проектов",
        "Облачное хранилище 5 ГБ на один проект",
        "До 5 участников на один проект",
      ],
      popular: false,
    },
    {
      name: "Стандартный",
      description: "Для средних предприятий",
      monthlyPrice: 990,
      features: [
        "∞ проектов",
        "неограниченное количество участников на один проект",
        "Расширенная документация",
        "Облачное хранилище 25 ГБ на один проект",
        "Приоритетная поддержка",
      ],
      popular: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const switchVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const calculateSavings = (monthlyPrice: number) => {
    const annualTotal = monthlyPrice * 12;
    const discountedAnnual = annualTotal * 0.8;
    return annualTotal - discountedAnnual;
  };

  const calculateAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * 0.8; // 20% скидка
  };

  const handleFormSubmit = async () => {
    setSubmitError("");
    setSubmitSuccess(false);

    if (!validateEmail(formData.email)) {
      setSubmitError("Некорректный email");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl("/api/pricing"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setShowSuccess(true);
        setFormData({ name: "", phone: "", email: "" });
        setTimeout(() => {
          setShowSuccess(false);
          setIsDialogOpen(false);
          setSubmitSuccess(false);
        }, 2500);
      } else {
        const text = await response.text();
        let data: unknown = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch {}
        const serverError =
          data && typeof data === "object" && data !== null && "error" in data
            ? (data as { error?: string }).error
            : undefined;
        setSubmitError(serverError || "Ошибка при отправке. Повторите позже.");
      }
    } catch {
      setSubmitError("Сетевая ошибка. Повторите позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="pricing"
      className="py-20 px-6 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-tertiary)] to-[var(--bg-secondary)]"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent"
          >
            Тарифные планы
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-8"
          >
            Выберите оптимальный план для вашего бизнеса. Все планы включают
            полный доступ к основному функционалу.
          </motion.p>

          {/* Переключатель месяц/год */}
          <motion.div
            variants={switchVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span
              className={`text-lg ${
                !isAnnual
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              Ежемесячно
            </span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-16 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                isAnnual
                  ? "bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)]"
                  : "bg-[var(--bg-quaternary)]"
              }`}
            >
              <motion.div
                animate={{
                  x: isAnnual ? 36 : 4,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-[var(--text-white)] rounded-full"
              />
            </motion.button>
            <span
              className={`text-lg ${
                isAnnual
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              Ежегодно
            </span>
            {isAnnual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-white)] px-3 py-1 rounded-full text-sm font-medium"
              >
                Скидка 20%
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                boxShadow: plan.popular
                  ? "0 0 20px rgba(37, 99, 235, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                  : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className={`relative bg-[var(--bg-secondary)] border border-[var(--text-tertiary)]/30 rounded-[20px] shadow-lg p-8 cursor-pointer ${
                plan.popular
                  ? "shadow-[0_0_20px_rgba(37,99,235,0.2)] ring-2 ring-[var(--accent-primary)]/20"
                  : ""
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white px-4 py-2 rounded-full text-sm font-medium">
                    Популярный
                  </span>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  {plan.name}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  {plan.description}
                </p>

                <div className="mb-4">
                  <motion.div
                    key={isAnnual ? "annual" : "monthly"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl font-bold text-[var(--text-primary)] mb-2"
                  >
                    {formatPrice(
                      isAnnual
                        ? Math.floor(
                            calculateAnnualPrice(plan.monthlyPrice) / 12
                          )
                        : plan.monthlyPrice
                    )}{" "}
                    ₽
                  </motion.div>
                  <div className="text-[var(--text-secondary)]">
                    {isAnnual ? "в месяц при годовой оплате" : "в месяц"}
                  </div>
                  {isAnnual && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[var(--accent-primary)] mt-2"
                    >
                      Экономия{" "}
                      {formatPrice(calculateSavings(plan.monthlyPrice))} ₽ в год
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, staggerChildren: 0.1 }}
                className="space-y-4"
              >
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * featureIndex }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent-primary)] flex items-center justify-center">
                      <Check className="w-3 h-3 text-[var(--text-white)]" />
                    </div>
                    <span className="text-[var(--text-secondary)]">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Информация о локальном развертывании */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[var(--bg-tertiary)]/50 to-[var(--bg-tertiary)]/80 rounded-2xl p-8 border border-[var(--text-tertiary)]/30">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-[var(--text-primary)] mb-4"
            >
              Особо предложение для крупных предприятий
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[var(--text-secondary)] text-lg mb-6 max-w-3xl mx-auto"
            >
              Можем развернуть DOCIM локально на ваших серверах для максимальной
              безопасности и контроля данных. Свяжитесь с нами для подробностей
              и индивидуального расчета стоимости.
            </motion.p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-[var(--accent-primary)] text-[var(--text-white)] font-semibold rounded-xl shadow-md text-lg hover:shadow-lg transition-all duration-300"
                  >
                    Связаться с нами
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-[var(--bg-secondary)] border-[var(--text-tertiary)]/30">
                <DialogHeader>
                  <DialogTitle className="text-[var(--text-primary)]">
                    Связаться с нами
                  </DialogTitle>
                  <DialogDescription className="text-[var(--text-secondary)]">
                    Оставьте свои контактные данные, и мы свяжемся с вами для
                    обсуждения условий локального развертывания.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                      Как к вам обращаться
                    </label>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="bg-[var(--bg-quaternary)] border-[var(--text-tertiary)]/30 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                      Телефон
                    </label>
                    <Input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="bg-[var(--bg-quaternary)] border-[var(--text-tertiary)]/30 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="example@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-[var(--bg-quaternary)] border-[var(--text-tertiary)]/30 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-[var(--text-tertiary)]/30 text-[var(--text-secondary)] hover:bg-[var(--bg-quaternary)]"
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}
                    className="bg-[var(--accent-primary)] text-[var(--text-white)] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Отправка..."
                      : submitSuccess
                      ? "Отправлено"
                      : "Отправить"}
                  </Button>
                </DialogFooter>
                {submitError && (
                  <p className="text-sm text-red-500 mt-2">{submitError}</p>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </div>
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-green-600">Успешно!</DialogTitle>
            <DialogDescription>
              Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingSection;
