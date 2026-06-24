# YARCO GROUP — сайт

Корпоративный сайт-витрина **YARCO GROUP** — поставщика медицинских изделий, расходных
материалов и средств гигиены для медицинских организаций.

🌐 **Демо:** https://yarkogroup.ductus.pro

## Стек
- **Frontend:** React + TypeScript + Vite (SPA, React Router).
- **Дизайн:** из брендбука (`yarko-brand-kit.html`) — графит / лайм / Montserrat; сдержанные анимации.
- **CMS:** PocketBase — редактируемые тексты страниц и контакты (без участия программиста).
- **Код-стиль:** методология GRACE (semantic exoskeleton + LDD), полное покрытие тестами.

## Структура
```
frontend/        React + TS приложение (см. frontend/README.md)
  src/            компоненты, страницы, контент, шов данных, content-провайдер
  tests/          Playwright E2E (по ролям/AX-Tree)
deploy/           nginx-конфиг + сид-скрипт PocketBase
TZ2_yarcogroup.md агентское ТЗ (GRACE)
yarko-brand-kit.html  брендбук (gold-reference дизайна)
```

## Запуск
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
npm test             # Vitest (юнит/компонентные)
npm run test:e2e     # Playwright (E2E)
npm run build        # прод-сборка (для CMS: VITE_PB_URL=/pb npm run build)
```

Подробности по разработке, тестам, деплою и CMS — в [`frontend/README.md`](frontend/README.md).
