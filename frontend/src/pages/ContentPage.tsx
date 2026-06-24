//#region MODULE_CONTRACT [DOMAIN(9): Content; CONCEPT(10): MetadataRenderer; TECH(8): React]
/**
 * @file ContentPage.tsx
 * @brief One renderer for all metadata-driven editorial pages (About, Mission, Partners, Blog, Privacy…).
 * @details Looks up a PageContent by key and renders header + typed blocks (paragraph/list/cards). This is the
 *          GRACE metadata-form pattern applied to content: no per-page JSX, the data IS the page. Unknown key
 *          renders a friendly not-found instead of crashing.
 * @modulecontract
 * @purpose Render any PAGES[key] record consistently from data.
 * @invariants Renders exactly one h1 (PageHeader level 1); block kinds are exhaustively handled.
 * @links USES(9): content/pages getPage, Section PageHeader/Crumbs, Icon; types PageBlock
 * @changes LAST_CHANGE: [v0.1.0 - Metadata content renderer.]
 * @modulemap COMP 7[Render one block] => Block; COMP 9[Metadata page] => ContentPage
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: content-page, metadata, renderer, blocks, paragraph, list, cards, not-found
// STRUCTURE: ▶ getPage(key) ◇ none→NotFoundInline : PageHeader ⊕ blocks.map(Block) ⟶ ContentPage
import type { ReactElement } from 'react';
import type { PageBlock } from '../types';
import { getPage } from '../content/pages';
import { PageHeader, Crumbs } from '../components/Section';
import { useReveal } from '../lib/useReveal';
import { usePageText } from '../lib/content';
import { ldd } from '../lib/ldd';

//#region COMP_Block [DOMAIN(8): Content; CONCEPT(9): BlockRender; TECH(8): React]
/** @purpose Render one typed content block; exhaustive over PageBlock kinds. @complexity 3 */
function Block({ block }: { block: PageBlock }): ReactElement {
  switch (block.kind) {
    case 'paragraph':
      return <p className="lead" style={{ color: '#444' }}>{block.text}</p>;
    case 'list':
      return (
        <ul className="grid g-2" style={{ marginTop: 8 }}>
          {block.items.map((it, i) => (
            <li key={i} className="card"><p>{it}</p></li>
          ))}
        </ul>
      );
    case 'cards':
      return (
        <ul className="grid g-3" style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
          {block.items.map((c, i) => (
            <li key={i} className="card">
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      );
  }
}
//#endregion COMP_Block

//#region COMP_ContentPage [DOMAIN(9): Content; CONCEPT(10): MetadataPage; TECH(8): React]
/** @purpose Render a metadata page by key, or a friendly fallback. @complexity 2 */
export function ContentPage({ pageKey, crumbs }: { pageKey: string; crumbs?: Array<{ label: string; to?: string }> }): ReactElement {
  const page = getPage(pageKey);
  const blocksRef = useReveal<HTMLDivElement>();
  // Редактируемый текст из CMS поверх кодового дефолта; блоки остаются из кода.
  const t = usePageText(pageKey, page ?? { eyebrow: 'СТРАНИЦА', titleLead: 'Раздел', titleAccent: 'готовится' });
  ldd(8, 'ContentPage', 'RENDER', `belief: key="${pageKey}" expect=found actual=${page ? 'found' : 'missing'}`);

  if (!page) {
    return (
      <div className="page"><div className="wrap">
        <PageHeader eyebrow="СТРАНИЦА" titleLead="Раздел" titleAccent="готовится" lead="Содержимое скоро появится." />
      </div></div>
    );
  }

  return (
    <div className="page"><div className="wrap">
      {crumbs && <Crumbs trail={crumbs} />}
      <PageHeader eyebrow={t.eyebrow} titleLead={t.titleLead} titleAccent={t.titleAccent} lead={t.lead} />
      <div ref={blocksRef} className="reveal-group" style={{ marginTop: 32, display: 'grid', gap: 24 }}>
        {page.blocks.map((b, i) => <Block key={i} block={b} />)}
      </div>
    </div></div>
  );
}
//#endregion COMP_ContentPage
