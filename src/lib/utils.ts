import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Плавная прокрутка к элементу с учетом header
export function smoothScrollTo(elementId: string, offset: number = 100) {
  console.log(`Attempting to scroll to element: ${elementId}`);

  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    // Попробуем найти элемент через querySelector
    const altElement = document.querySelector(`[id="${elementId}"]`);
    if (!altElement) {
      console.error(`Element with id "${elementId}" not found anywhere`);
      return;
    }
    console.log(`Found element using querySelector: ${elementId}`);
  }

  const targetElement =
    element || (document.querySelector(`[id="${elementId}"]`) as HTMLElement);

  // Сначала пробуем стандартный способ
  try {
    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementPosition = rect.top + scrollTop - offset;

    console.log(
      `Element position: ${elementPosition}, current scroll: ${scrollTop}`
    );

    // Проверяем поддержку smooth scroll
    if ("scrollBehavior" in document.documentElement.style) {
      console.log("Using native smooth scroll");
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    } else {
      console.log("Using custom smooth scroll");
      // Fallback для старых браузеров
      customSmoothScroll(elementPosition);
    }
  } catch (error) {
    console.error("Error during smooth scroll:", error);
    // Fallback - простая прокрутка
    console.log("Using fallback scrollIntoView");
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Кастомная функция плавной прокрутки для старых браузеров
function customSmoothScroll(targetPosition: number) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let start: number | null = null;

  function animation(currentTime: number) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Плавный переход между страницами
export function smoothPageTransition(href: string, delay: number = 300) {
  // Добавляем класс для анимации выхода
  document.body.classList.add("page-transition-exit");

  setTimeout(() => {
    window.location.href = href;
  }, delay);
}
