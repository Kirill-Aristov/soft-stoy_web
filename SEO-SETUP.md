# Настройка превью в поисковой выдаче - DOCIM

## Что было сделано

✅ Обновлены мета-теги в `layout.tsx` с Open Graph и Twitter Card
✅ Создан файл `site.webmanifest` для PWA поддержки
✅ Добавлен компонент `StructuredData` с JSON-LD разметкой
✅ Обновлена главная страница с структурированными данными
✅ Создана отдельная страница `/download` с мета-тегами
✅ Создан файл `robots.txt` для поисковых роботов
✅ Создан файл `sitemap.xml` для индексации

## Необходимые изображения

Для полной настройки превью нужно создать следующие изображения в папке `public/`:

### 1. Open Graph изображение
- **Файл**: `og-image.jpg`
- **Размер**: 1200x630px
- **Формат**: JPG или PNG
- **Описание**: Главное изображение для превью в социальных сетях

### 2. Иконки сайта
- **Файл**: `favicon.ico` (16x16, 32x32px)
- **Файл**: `favicon-16x16.png` (16x16px)
- **Файл**: `favicon-32x32.png` (32x32px)
- **Файл**: `apple-touch-icon.png` (180x180px)
- **Файл**: `android-chrome-192x192.png` (192x192px)
- **Файл**: `android-chrome-512x512.png` (512x512px)

## Проверка настроек

После создания изображений используйте следующие инструменты для проверки:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Дополнительные рекомендации

1. **Google Search Console**: Настройте для мониторинга индексации
2. **Яндекс.Вебмастер**: Добавьте сайт для отслеживания в Яндексе
3. **Обновление sitemap.xml**: Регулярно обновляйте даты изменения страниц
4. **Мониторинг**: Отслеживайте позиции в поисковой выдаче

## Структура файлов

```
public/
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── og-image.jpg (создать)
├── favicon.ico (создать)
├── favicon-16x16.png (создать)
├── favicon-32x32.png (создать)
├── apple-touch-icon.png (создать)
├── android-chrome-192x192.png (создать)
└── android-chrome-512x512.png (создать)

src/
├── app/
│   ├── layout.tsx (обновлен)
│   ├── page.tsx (обновлен)
│   └── download/
│       └── page.tsx (создан)
└── components/
    └── seo/
        └── StructuredData.tsx (создан)
```

Все изменения внесены и готовы к использованию!
