# Архитектура приложения DOCIM Web

## Обзор архитектуры

Проект использует **Feature-Sliced Design (FSD)** - современную методологию архитектуры фронтенд приложений, которая обеспечивает:
- Высокую масштабируемость
- Простоту поддержки
- Четкое разделение ответственности
- Готовность к добавлению новых фич

## Структура слоев

### 1. **App Layer** (`src/app/`)
Конфигурация приложения, провайдеры, роутинг (Next.js App Router)
```
src/app/
├── layout.tsx         # Root layout
├── page.tsx          # Главная страница (/)
├── api/              # API маршруты
│   └── health/       # Health check endpoint
├── dashboard/        # Дашборд (/dashboard)
│   └── page.tsx
├── profile/          # Личный кабинет (/profile)
│   └── page.tsx
└── docs/             # Документация (/docs)
    └── page.tsx
```

### 2. **Widgets Layer** (`src/widgets/`)
Крупные композитные блоки UI (заменяет Pages Layer в FSD)
```
src/widgets/
├── header/            # Шапка сайта
│   ├── ui/Header.tsx
│   └── index.ts
├── footer/            # Подвал сайта
│   ├── ui/Footer.tsx
│   └── index.ts
├── hero-section/      # Главный блок
├── advantages-section/
├── products-section/
├── pricing-section/
├── subscription-section/
└── modernization-section/
```

### 3. **Features Layer** (`src/features/`)
Бизнес-логика и интерактивные фичи
```
src/features/
├── theme-toggle/      # Переключение темы
├── subscription/      # Управление подпиской
├── contact-form/      # Форма обратной связи
├── auth/              # Аутентификация (будущее)
├── user-profile/      # Профиль пользователя (будущее)
├── analytics/         # Аналитика (будущее)
└── documentation/     # Система документации (будущее)
```

### 4. **Entities Layer** (`src/entities/`)
Бизнес-сущности
```
src/entities/
├── user/              # Пользователь (будущее)
├── subscription/      # Подписка
├── product/           # Продукт
├── project/           # Проект (будущее)
└── analytics/         # Данные аналитики (будущее)
```

### 5. **Shared Layer** (`src/shared/`)
Переиспользуемые ресурсы
```
src/shared/
├── ui/                # UI компоненты
│   ├── button/
│   ├── input/
│   ├── modal/
│   ├── card/
│   └── chart/         # Графики (будущее)
├── lib/               # Утилиты и хелперы
│   ├── utils.ts
│   ├── constants.ts
│   ├── api.ts         # API клиент (будущее)
│   └── validation.ts  # Валидация (будущее)
├── config/            # Конфигурация
│   ├── env.ts
│   └── routes.ts
├── assets/            # Статические ресурсы
│   ├── icons/
│   ├── images/
│   └── fonts/
└── styles/            # Стили
    ├── globals.css
    ├── variables.css
    └── components.css
```

## Принципы архитектуры

### 1. **Слоистая структура**
- Каждый слой может импортировать только из нижележащих слоев
- Запрещены циклические зависимости
- Четкая иерархия: app → widgets → features → entities → shared

### 2. **Модульность по фичам**
- Каждая фича инкапсулирована в своем модуле
- Внутренняя структура модуля: `ui/`, `model/`, `api/`, `lib/`
- Публичный API через `index.ts`

### 3. **Готовность к масштабированию**
Архитектура подготовлена для добавления:
- **Личного кабинета**: `features/auth/`, `app/profile/`, `entities/user/`
- **Дашборда со статистикой**: `app/dashboard/`, `features/analytics/`, `widgets/charts/`
- **Документации**: `app/docs/`, `features/documentation/`, `entities/article/`

## Оптимизация производительности

### 1. **Code Splitting**
```typescript
// Lazy loading страниц
const DashboardPage = lazy(() => import('@/app/dashboard/page'))
const ProfilePage = lazy(() => import('@/app/profile/page'))
const DocsPage = lazy(() => import('@/app/docs/page'))
```

### 2. **Bundle Optimization**
- Динамические импорты для тяжелых компонентов
- Tree shaking для неиспользуемого кода
- Оптимизация изображений через Next.js Image

### 3. **Кэширование**
- Static Generation для статических страниц
- ISR (Incremental Static Regeneration) для динамического контента
- Service Worker для кэширования ресурсов

## Будущие модули

### 1. **Личный кабинет пользователя**
```
src/
├── app/profile/            # Маршруты профиля
│   ├── page.tsx           # Главная страница профиля
│   ├── settings/          # Настройки
│   └── history/           # История активности
├── features/auth/          # Аутентификация
├── features/user-profile/  # Управление профилем
├── entities/user/          # Сущность пользователя
└── widgets/user-menu/      # Меню пользователя
```

### 2. **Дашборд со статистикой**
```
src/
├── app/dashboard/          # Маршруты дашборда
│   ├── page.tsx           # Главная страница дашборда
│   ├── analytics/         # Аналитика
│   └── reports/           # Отчеты
├── features/analytics/     # Аналитика
├── widgets/charts/         # Виджеты графиков
├── entities/analytics/     # Данные аналитики
└── shared/ui/chart/        # Компоненты графиков
```

### 3. **Документация ПО**
```
src/
├── app/docs/              # Маршруты документации
│   ├── page.tsx          # Главная страница документации
│   ├── [...slug]/        # Динамические маршруты
│   └── layout.tsx        # Layout для документации
├── features/documentation/ # Система документации
├── widgets/docs-sidebar/  # Боковая панель
├── entities/article/      # Статьи документации
└── shared/ui/markdown/    # Markdown компоненты
```

## Технические решения

### 1. **Роутинг**
- Next.js App Router для файловой системы роутинга
- Группировка маршрутов через `(group)` синтаксис
- Middleware для защищенных маршрутов

### 2. **Состояние**
- Zustand для глобального состояния (легковесная альтернатива Redux)
- React Query для серверного состояния
- Local state через useState/useReducer

### 3. **Стилизация**
- Tailwind CSS для утилитарных классов
- CSS Modules для компонентной изоляции
- CSS переменные для темизации

### 4. **Типизация**
- Строгая типизация TypeScript
- Zod для валидации данных
- Типизированные API endpoints

## Преимущества архитектуры

1. **Масштабируемость** - легко добавлять новые фичи без рефакторинга
2. **Поддерживаемость** - четкое разделение ответственности
3. **Переиспользование** - shared слой для общих компонентов
4. **Производительность** - оптимизация на уровне архитектуры
5. **Команда** - понятная структура для разработчиков

## Миграция

Текущий проект будет постепенно мигрирован на новую архитектуру:
1. Создание новой структуры папок
2. Перенос существующих компонентов
3. Рефакторинг импортов
4. Настройка алиасов путей
5. Обновление документации
