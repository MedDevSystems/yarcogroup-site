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
    titleAccent: 'медицинских организаций',
    lead: 'YARCO GROUP — поставщик медицинских расходных материалов и средств гигиены для медицинских организаций: клиник, лабораторий, стационаров и амбулаторий.',
    blocks: [
      { kind: 'paragraph', text: 'Компания объединяет закупки, складскую логистику и сервис в единую систему снабжения медучреждений. Наша задача — чтобы клиника получала нужные расходники вовремя, в нужном объёме и с подтверждённым качеством.' },
      {
        kind: 'cards',
        items: [
          { icon: 'reliability', title: 'Надёжность', text: 'Проверенные производители и входной контроль качества.' },
          { icon: 'delivery', title: 'Поставки', text: 'Оперативная доставка в медучреждения по всей России и СНГ.' },
          { icon: 'quality', title: 'Документы', text: 'Регистрационные удостоверения и сертификаты на продукцию.' },
        ],
      },
    ],
  },
  mission: {
    key: 'mission',
    eyebrow: '02 / НАША МИССИЯ',
    titleLead: 'Всё необходимое',
    titleAccent: 'для медицины',
    lead: 'Мы обеспечиваем медицинские организации расходными материалами — стабильно, в срок и с контролем качества, чтобы врачи могли сосредоточиться на пациентах.',
    blocks: [
      { kind: 'paragraph', text: 'Миссия YARCO GROUP — быть единым окном снабжения для медучреждений: расходные материалы, средства гигиены и антисептики, средства индивидуальной защиты. Один партнёр вместо десятков, одна точка ответственности.' },
      {
        kind: 'list',
        items: [
          'Только сертифицированная продукция с регистрационными удостоверениями',
          'Прозрачные условия и честное ценообразование',
          'Долгосрочные отношения с клиниками и производителями',
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
    lead: 'Несколько направлений снабжения медицинских организаций, объединённых единой системой поставок и контроля качества.',
    blocks: [
      {
        kind: 'cards',
        items: [
          { icon: 'medicine', title: 'Медицинские расходники', text: 'Перевязочные материалы, шприцы, расходники для процедур и манипуляций.' },
          { icon: 'hygiene', title: 'Гигиена и антисептика', text: 'Кожные антисептики, дезинфекция поверхностей, мыло, салфетки.' },
          { icon: 'products', title: 'Средства защиты (СИЗ)', text: 'Перчатки, маски, бахилы, шапочки, одноразовая одежда.' },
          { icon: 'reliability', title: 'Оснащение ЛПУ', text: 'Расходные материалы для клиник, лабораторий и стационаров.' },
        ],
      },
    ],
  },
  partners: {
    key: 'partners',
    eyebrow: '04 / ПАРТНЁРАМ',
    titleLead: 'Растём',
    titleAccent: 'вместе',
    lead: 'Мы открыты к сотрудничеству — для инвесторов и для производителей медицинской продукции. Выберите подходящий формат.',
    blocks: [
      {
        kind: 'cards',
        items: [
          { icon: 'invest', title: 'Инвестиции', text: 'Возможности участия в развитии компании и совместных проектах.' },
          { icon: 'partners', title: 'Поставщикам', text: 'Условия работы и требования для производителей медицинской продукции.' },
        ],
      },
    ],
  },
  investments: {
    key: 'investments',
    eyebrow: '04 / ИНВЕСТИЦИИ',
    titleLead: 'Инвестиционные',
    titleAccent: 'возможности',
    lead: 'Мы развиваем инфраструктуру снабжения медучреждений и приглашаем партнёров к участию в росте компании.',
    blocks: [
      { kind: 'paragraph', text: 'Расскажите о вашем интересе — мы подготовим информацию о направлениях развития и форматах сотрудничества. Подробности предоставляются по запросу.' },
      {
        kind: 'list',
        items: [
          'Развитие складской и логистической инфраструктуры',
          'Расширение ассортимента медицинских расходных материалов и географии поставок',
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
    lead: 'Мы заинтересованы в надёжных производителях медицинских расходных материалов и средств гигиены.',
    blocks: [
      { kind: 'paragraph', text: 'Если вы производите или поставляете медицинские расходники, средства гигиены или СИЗ — будем рады сотрудничеству. Направьте коммерческое предложение, и мы свяжемся с вами.' },
      {
        kind: 'list',
        items: [
          'Регистрационные удостоверения и сертификаты на продукцию',
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
    lead: 'Здесь будут публикации компании: новости, обзоры медицинской продукции и полезные материалы для медучреждений.',
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
