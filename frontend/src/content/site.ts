//#region MODULE_CONTRACT [DOMAIN(8): Content; CONCEPT(8): SiteConfig; TECH(8): TypeScript]
/**
 * @file site.ts
 * @brief Site-wide constants (brand, contacts, requisites, policy) — header utility bar & footer source.
 * @details v1 placeholder values in the brandbook tone. Real legal requisites/contacts to be supplied by
 *          the client (see TZ2 Допущения). In v2 this object is replaced by GET /config from FastAPI.
 * @modulecontract
 * @purpose One source of truth for contacts and legal info rendered in the chrome.
 * @invariants phoneHref is the tel: form of phone; privacyPath is an absolute route.
 * @links FEEDS(8): components/Header, components/Footer, pages/Contacts
 * @changes LAST_CHANGE: [v0.1.0 - Placeholder site config.]
 * @modulemap CONST 8[Site config] => SITE
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: site, config, contacts, email, phone, requisites, privacy, placeholder
// STRUCTURE: ▶ SITE{ brand, email, phone(+href), address, privacyPath, requisites } ⟶ chrome
import type { SiteConfig } from '../types';

export const SITE: SiteConfig = {
  brand: 'ЯРКО ГРУПП',
  email: 'info@yarcogroup.ru',
  phone: '+7 (495) 000-00-00',
  phoneHref: 'tel:+74950000000',
  address: 'Москва, Россия',
  privacyPath: '/privacy',
  requisites: {
    legalName: 'ООО «ЯРКО ГРУПП»',
    inn: 'ИНН 0000000000',
    ogrn: 'ОГРН 0000000000000',
  },
};
