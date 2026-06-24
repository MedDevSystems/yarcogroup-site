//#region MODULE_CONTRACT [DOMAIN(9): Content; CONCEPT(10): MetadataDrivenPages; TECH(8): TypeScript]
/**
 * @file pages.ts
 * @brief Editorial content for simple pages, declared as DATA and rendered by one <ContentPage> component.
 * @details Ports the GRACE metadata-form idea to content: instead of hand-writing JSX per page, each page is a
 *          PageContent record (eyebrow + heading + lead + blocks). v1 copy is brandbook-toned placeholder;
 *          the client supplies final texts/images later (TZ2 Допущения). In v2 these records can come from the
 *          CMS/admin via the same contract.
 * @modulecontract
 * @purpose Single editable place for page copy; one renderer builds all of them.
 * @invariants Every key here must have a route in App; titleAccent renders weight-500 (not bold).
 * @links FEEDS(9): pages/ContentPage; SPEC: ТЗ #1 разделы «О компании / Партнёрам / Блог»
 * @changes LAST_CHANGE: [v0.1.0 - Placeholder editorial content.]
 * @modulemap CONST 10[Page content registry] => PAGES; FUNC 7[Lookup by key] => getPage
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: pages, content, metadata, editorial, placeholder, ContentPage, blocks
// STRUCTURE: ▶ PAGES: Record<key, PageContent> ⊕ getPage(key) ⟶ ContentPage
import type { PageContent } from '../types';

//#region CONST_PAGES [DOMAIN(9): Content; CONCEPT(10): Registry; TECH(8): TypeScript]
/** @purpose Content registry keyed by route-stable page key. */
export const PAGES: Record<string, PageContent> = {
  about: {
    key: 'about',
    eyebrow: '02 / О КОМПАНИИ',
    titleLead: 'Надёжный партнёр',
    titleAccent: 'для вашего бизнеса',
    lead: 'ЯРКО ГРУПП — поставщик товаров для бизнеса: медицина, гигиена, косметика, продукты, товары для дома и HoReCa. Всё необходимое в едином окне поставок.',
    blocks: [
      { kind: 'paragraph', text: 'Компания объединяет закупки, складскую логистику и сервис в единую систему снабжения. Наша задача — чтобы клиент получал нужные товары вовремя, в нужном объёме и с подтверждённым качеством.' },
      {
        kind: 'cards',
        items: [
          { icon: 'reliability', title: 'Надёжность', text: 'Проверенные производители и входной контроль качества.' },
          { icon: 'delivery', title: 'Поставки', text: 'Оперативная доставка по всей России и СНГ.' },
          { icon: 'quality', title: 'Документы', text: 'Сертификаты и сопроводительные документы на продукцию.' },
        ],
      },
    ],
  },
  mission: {
    key: 'mission',
    eyebrow: '02 / НАША МИССИЯ',
    titleLead: 'Всё необходимое',
    titleAccent: 'для бизнеса',
    lead: 'Мы обеспечиваем бизнес товарами и расходными материалами — стабильно, в срок и с контролем качества.',
    blocks: [
      { kind: 'paragraph', text: 'Миссия ЯРКО ГРУПП — быть единым окном снабжения: расходные материалы, средства гигиены, косметика, продукты и товары для дома. Один партнёр вместо десятков, одна точка ответственности.' },
      {
        kind: 'list',
        items: [
          'Только проверенная продукция с документами и сертификатами',
          'Прозрачные условия и честное ценообразование',
          'Долгосрочные отношения с клиентами и производителями',
          'Развитие сервиса и цифровых инструментов заказа',
        ],
      },
    ],
  },
  directions: {
    key: 'directions',
    eyebrow: '02 / НАПРАВЛЕНИЯ БИЗНЕСА',
    titleLead: 'Что мы',
    titleAccent: 'поставляем',
    lead: 'Направления снабжения, объединённые единой системой поставок и контроля качества.',
    blocks: [
      {
        kind: 'cards',
        items: [
          { icon: 'medicine', title: 'Медицина', text: 'Расходные материалы и оснащение для медицинских организаций.' },
          { icon: 'hygiene', title: 'Гигиена', text: 'Антисептики, дезинфекция, мыло, салфетки.' },
          { icon: 'cosmetics', title: 'Косметика', text: 'Уходовая и декоративная косметика, парфюмерия.' },
          { icon: 'products', title: 'Продукты', text: 'Продукты питания и сопутствующие товары.' },
          { icon: 'home', title: 'Товары для дома', text: 'Бытовая химия, хозтовары, расходники для дома.' },
          { icon: 'horeca', title: 'HoReCa', text: 'Снабжение кафе, ресторанов и отелей.' },
        ],
      },
    ],
  },
  partners: {
    key: 'partners',
    eyebrow: '04 / ПАРТНЁРАМ',
    titleLead: 'Растём',
    titleAccent: 'вместе',
    lead: 'Мы открыты к сотрудничеству — для инвесторов и для производителей. Выберите подходящий формат.',
    blocks: [
      {
        kind: 'cards',
        items: [
          { icon: 'invest', title: 'Инвестиции', text: 'Возможности участия в развитии компании и совместных проектах.' },
          { icon: 'partners', title: 'Поставщикам', text: 'Условия работы и требования для производителей и поставщиков.' },
        ],
      },
    ],
  },
  investments: {
    key: 'investments',
    eyebrow: '04 / ИНВЕСТИЦИИ',
    titleLead: 'Инвестиционные',
    titleAccent: 'возможности',
    lead: 'Мы развиваем инфраструктуру снабжения и приглашаем партнёров к участию в росте компании.',
    blocks: [
      { kind: 'paragraph', text: 'Расскажите о вашем интересе — мы подготовим информацию о направлениях развития и форматах сотрудничества. Подробности предоставляются по запросу.' },
      {
        kind: 'list',
        items: [
          'Развитие складской и логистической инфраструктуры',
          'Расширение ассортимента и географии поставок',
          'Совместные проекты и долгосрочные соглашения',
        ],
      },
    ],
  },
  suppliers: {
    key: 'suppliers',
    eyebrow: '04 / ПОСТАВЩИКАМ',
    titleLead: 'Станьте нашим',
    titleAccent: 'поставщиком',
    lead: 'Мы заинтересованы в надёжных производителях товаров для бизнеса.',
    blocks: [
      { kind: 'paragraph', text: 'Если вы производите или поставляете товары — будем рады сотрудничеству. Направьте коммерческое предложение, и мы свяжемся с вами.' },
      {
        kind: 'list',
        items: [
          'Документы и сертификаты на продукцию',
          'Стабильные объёмы и сроки поставки',
          'Конкурентные условия и прозрачное ценообразование',
        ],
      },
    ],
  },
  blog: {
    key: 'blog',
    eyebrow: '05 / БЛОГ',
    titleLead: 'Новости и',
    titleAccent: 'материалы',
    lead: 'Здесь будут публикации компании: новости, обзоры продукции и полезные материалы.',
    blocks: [
      { kind: 'paragraph', text: 'Раздел готовится к наполнению. В следующей версии сайта здесь появится лента публикаций с управлением через админ-панель.' },
    ],
  },
  privacy: {
    key: 'privacy',
    eyebrow: 'ПРАВОВАЯ ИНФОРМАЦИЯ',
    titleLead: 'Политика',
    titleAccent: 'конфиденциальности',
    lead: 'Настоящая политика описывает порядок обработки персональных данных на сайте yarcogroup.ru.',
    blocks: [
      { kind: 'paragraph', text: 'Текст-заглушка. Финальная редакция политики конфиденциальности будет предоставлена и размещена до публикации сайта. Мы обрабатываем персональные данные в соответствии с законодательством Российской Федерации.' },
      {
        kind: 'list',
        items: [
          'Какие данные мы собираем и с какой целью',
          'Как обеспечивается безопасность данных',
          'Права пользователя и порядок обращений',
        ],
      },
    ],
  },
};
//#endregion CONST_PAGES

//#region FUNC_getPage [DOMAIN(8): Content; CONCEPT(8): Lookup; TECH(8): TypeScript]
/** @purpose Safe lookup of page content by key. @complexity 1 */
export function getPage(key: string): PageContent | undefined {
  return PAGES[key];
}
//#endregion FUNC_getPage
