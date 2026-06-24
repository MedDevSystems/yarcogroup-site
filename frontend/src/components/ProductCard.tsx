//#region MODULE_CONTRACT [DOMAIN(8): UI; CONCEPT(8): CatalogCard; TECH(8): React]
/**
 * @file ProductCard.tsx
 * @brief Catalog card — optional photo thumb, category, name, article (без иконок-плейсхолдеров).
 * @details v1 has no photos, so the card is text-only (category + name + article). When `imageUrl`
 *          lands (v2/1C) it renders an <img> thumb with alt = product name. Card is a list item.
 * @modulecontract
 * @purpose Present one product consistently in the catalog grid.
 * @invariants Image (when present) has alt text; icon placeholder is decorative (aria-hidden).
 * @links USES(8): types.ts Product, Icon, content/products CATEGORY_LABEL
 * @changes LAST_CHANGE: [v0.1.0 - Card with icon placeholder.]
 * @modulemap COMP 8[Product card] => ProductCard
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: product, card, thumb, placeholder, icon, category, article, catalog
// STRUCTURE: ▶ [thumb(img) when imageUrl] ⊕ body( cat ⊕ name ⊕ article ) ⟶ ProductCard
import type { ReactElement } from 'react';
import type { Product } from '../types';
import { CATEGORY_LABEL } from '../content/products';

//#region COMP_ProductCard [DOMAIN(8): UI; CONCEPT(8): CatalogCard; TECH(8): React]
/** @purpose Render a single product card. @complexity 2 */
export function ProductCard({ product }: { product: Product }): ReactElement {
  return (
    <li className="card product-card">
      {product.imageUrl && (
        <div className="thumb">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      )}
      <div className="body">
        <span className="cat">{CATEGORY_LABEL[product.category]}</span>
        <h3>{product.name}</h3>
        <span className="art">Артикул: {product.article}{product.unit ? ` · ${product.unit}` : ''}</span>
      </div>
    </li>
  );
}
//#endregion COMP_ProductCard
