# YARCO GROUP — фронтенд (v1 «Витрина»)

Корпоративный сайт-витрина **YARCO GROUP** (yarcogroup.ru). React + TypeScript + Vite, дизайн 1:1 из брендбука
(`../yarko-brand-kit.html`), разметка по методологии **GRACE** (semantic exoskeleton + LDD). Постановка задачи —
`../TZ2_yarcogroup.md` (агентское ТЗ #2).

## Что реализовано в v1
- Все страницы и меню/подменю строго по структуре ТЗ (Главная · О компании · Продукты · Партнёрам · Блог · Контакты).
- Дизайн-система из брендбука: токены `:root`, Montserrat, знак-кольцо, иконки, кнопки. Без жирных выделений.
- Шапка: контакты в utility-баре, лого слева, меню с выпадающими подменю (hover/клавиатура/мобильный drawer).
- Раздел «Продукты»: поиск на всю ширину сверху + фильтр-категории + грид демо-товаров (2×8).
- Футер: почта, телефон, политика конфиденциальности, реквизиты.
- **Stub-swappable seam** (`src/lib/api.ts`): весь доступ к данным — через один шов; v2 переключается на FastAPI
  через `VITE_API_BASE` без правок UI.

## Карта «паттерн → файл»
| Паттерн (GRACE) | Файл | Якорь |
|---|---|---|
| Семантический экзоскелет (`//#region` + TSDoc + GREP/STRUCTURE) | каждый `.ts/.tsx` | `//#region MODULE_CONTRACT` |
| Browser-LDD `[IMP:1-10]` | `src/lib/ldd.ts` | `FUNC_ldd` |
| Stub-swappable seam (stub ⇄ fetch) | `src/lib/api.ts` | `CONST_api` |
| Контракты данных (зеркало Pydantic в v2) | `src/types.ts` | `TYPE_SiteApi` |
| Метадата меню = источник истины (шапка + роуты) | `src/content/nav.ts` | `CONST NAV` |
| Метадата-driven контент-страницы (один рендерер) | `src/content/pages.ts` + `src/pages/ContentPage.tsx` | `CONST_PAGES` |
| Демо-каталог + нормализованный `searchBlob` | `src/content/products.ts` | `FUNC_mk` |
| Клиентский поиск (v2 → серверный) | `src/components/ProductSearch.tsx` | `COMP_ProductSearch` |
| AX-Tree-операбельность (role/aria) | все компоненты | `role=`/`aria-label=` |
| Брендовые иконки/знак (порт из брендбука) | `src/components/Icon.tsx` | `RingMark`, `ICONS` |
| Тесты «не молчат» (печатают `[IMP:n]`) | `vitest.setup.ts`, `*.test.tsx` | Anti-Loop guard |
| AX-Tree E2E (только `getByRole`) | `tests/site.e2e.spec.ts` | — |

## Запуск
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173 (stub-режим, без бэкенда)
npm run typecheck    # strict TS
npm test             # Vitest: role-driven + [IMP] belief
npx playwright install chromium
npm run test:e2e     # Playwright: AX-Tree E2E
npm run build        # прод-сборка в dist/
```

## Переключение на бэкенд (v2)
UI не меняется — задать базу API:
```bash
VITE_API_BASE=http://localhost:8000 npm run dev
```
`src/lib/api.ts` уйдёт в FastAPI (`/config`, `/products`, `/products/search`). Контракты — `src/types.ts`
(зеркало будущих Pydantic-схем).

## Деплой на yarcogroup.ru (VPS, git bare push + nginx)
1. На VPS: bare-репо + `post-receive` хук → `cd checkout/frontend && npm ci && npm run build`.
2. nginx раздаёт `frontend/dist`, с SPA-фолбэком: `try_files $uri /index.html;` (нужно для BrowserRouter).
3. TLS — Let's Encrypt (`certbot --nginx -d yarcogroup.ru -d www.yarcogroup.ru`).
Точный VPS/конфиг — согласовать при выкладке (паттерн как у invoice-mail-gateway / agata).

## Дорожная карта
- **v2:** FastAPI + БД (object-relational ядро), админка на метадата-формах (страницы/товары/фото), серверный
  каталог и поиск (SQL VIEW). Шов `api.ts` уже готов.
- **v3:** обмен с 1С, интеграция с CRM, ИИ-поиск (замена `searchProducts` без правок UI).
