//#region MODULE_CONTRACT [DOMAIN(9): Content; CONCEPT(10): EditableContentSeam; TECH(8): React]
/**
 * @file content.tsx
 * @brief Editable-content provider — overlays PocketBase-managed text over the in-code defaults.
 * @details v2 «движок управления» (page texts). The frontend keeps the code constants (SITE, PAGES) as the
 *          source of FALLBACK; when `VITE_PB_URL` is set, ContentProvider fetches the `site` and `pages`
 *          collections from PocketBase and overlays the editable text fields. With no PB configured (tests,
 *          local dev) the context default IS the code constants, so components render synchronously and tests
 *          need no provider. Catalog (products) and menu (nav) stay in code by design — only text is editable.
 * @modulecontract
 * @purpose One place that merges admin-edited text over code defaults; expose via useSite()/usePageText().
 * @invariants Never blocks render — defaults show immediately, edited values swap in on fetch; PB failure is
 *             non-fatal (logs, keeps defaults). SiteConfig shape preserved (flat req* mapped to nested).
 * @links USES(9): content/site SITE, content/pages getPage; MIRRORS(8): PocketBase collections site/pages
 * @changes LAST_CHANGE: [v0.1.0 - PocketBase-backed editable text overlay.]
 * @modulemap
 * TYPE 8[Editable page text] => PageText
 * COMP 9[Content provider] => ContentProvider
 * HOOK 9[Merged site config] => useSite
 * HOOK 9[Merged page text + code fallback] => usePageText
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: content, editable, PocketBase, overlay, fallback, useSite, usePageText, provider, CMS
// STRUCTURE: ▶ ctx{site,pages} default=code ⊕ Provider fetch PB → overlay ⊕ useSite() ⊕ usePageText(key,fallback)
import { createContext, useContext, useEffect, useState, type ReactElement, type ReactNode } from 'react';
import type { SiteConfig } from '../types';
import { SITE } from '../content/site';
import { ldd } from './ldd';

//#region TYPE_PageText [DOMAIN(8): Content; CONCEPT(9): EditableText; TECH(8): TypeScript]
/** @purpose The editable text fields of a page header (blocks stay in code). */
export interface PageText {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead?: string;
}
interface ContentState { site: SiteConfig; pages: Record<string, PageText>; }
//#endregion TYPE_PageText

//#region CONST_ContentCtx [DOMAIN(8): Content; CONCEPT(8): Context; TECH(8): React]
/** @purpose Context default = code constants, so components work without a provider (tests/isolation). */
const ContentCtx = createContext<ContentState>({ site: SITE, pages: {} });
const PB_URL = (import.meta.env?.VITE_PB_URL as string | undefined) ?? '';
//#endregion CONST_ContentCtx

//#region COMP_ContentProvider [DOMAIN(9): Content; CONCEPT(10): Overlay; TECH(8): React]
/** @purpose Fetch editable text from PocketBase (if configured) and overlay it over code defaults. @complexity 3 */
export function ContentProvider({ children }: { children: ReactNode }): ReactElement {
  const [state, setState] = useState<ContentState>({ site: SITE, pages: {} });

  useEffect(() => {
    if (!PB_URL) return;
    let alive = true;
    (async () => {
      try {
        const [siteRes, pagesRes] = await Promise.all([
          fetch(`${PB_URL}/api/collections/site/records?perPage=1`).then((r) => r.json()),
          fetch(`${PB_URL}/api/collections/pages/records?perPage=200`).then((r) => r.json()),
        ]);
        if (!alive) return;
        const r = siteRes.items?.[0];
        const site: SiteConfig = r
          ? {
              ...SITE,
              email: r.email || SITE.email,
              phone: r.phone || SITE.phone,
              phoneHref: r.phoneHref || SITE.phoneHref,
              address: r.address || SITE.address,
              privacyPath: r.privacyPath || SITE.privacyPath,
              requisites: {
                legalName: r.reqLegalName || SITE.requisites.legalName,
                inn: r.reqInn || SITE.requisites.inn,
                ogrn: r.reqOgrn || SITE.requisites.ogrn,
              },
            }
          : SITE;
        const pages: Record<string, PageText> = {};
        for (const it of pagesRes.items ?? []) {
          pages[it.key] = { eyebrow: it.eyebrow, titleLead: it.titleLead, titleAccent: it.titleAccent, lead: it.lead };
        }
        setState({ site, pages });
        ldd(8, 'ContentProvider', 'OVERLAY', `belief: PB content loaded — site=${!!r} pages=${Object.keys(pages).length}`);
      } catch (e) {
        ldd(7, 'ContentProvider', 'FETCH', `PB unavailable, keeping code defaults: ${String(e)}`);
      }
    })();
    return () => { alive = false; };
  }, []);

  return <ContentCtx.Provider value={state}>{children}</ContentCtx.Provider>;
}
//#endregion COMP_ContentProvider

//#region HOOK_useSite [DOMAIN(8): Content; CONCEPT(8): SiteHook; TECH(8): React]
/** @purpose Merged site config (PB overlay over code default). @complexity 1 */
export function useSite(): SiteConfig {
  return useContext(ContentCtx).site;
}
//#endregion HOOK_useSite

//#region HOOK_usePageText [DOMAIN(9): Content; CONCEPT(9): PageTextHook; TECH(8): React]
/**
 * @purpose Editable page text overlaid on the component's own code fallback (so it works with/without PB).
 * @io key:string, fallback:PageText -> PageText
 * @complexity 1
 */
export function usePageText(key: string, fallback: PageText): PageText {
  const ov = useContext(ContentCtx).pages[key];
  if (!ov) return fallback;
  return {
    eyebrow: ov.eyebrow || fallback.eyebrow,
    titleLead: ov.titleLead || fallback.titleLead,
    titleAccent: ov.titleAccent || fallback.titleAccent,
    lead: ov.lead || fallback.lead,
  };
}
//#endregion HOOK_usePageText
