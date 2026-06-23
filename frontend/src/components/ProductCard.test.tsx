//#region MODULE_CONTRACT [DOMAIN(8): Testing; CONCEPT(9): CardTest; TECH(8): Vitest+RTL]
/**
 * @file ProductCard.test.tsx
 * @brief Test for the catalog card — renders name (h3), category label, article; icon placeholder when no photo.
 * @purpose Lock the card's content contract for the catalog grid.
 * @links TESTS(9): components/ProductCard.tsx, content/products CATEGORY_LABEL
 * @modulemap TEST 8[renders name/category/article] · TEST 8[icon placeholder when no imageUrl]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, product-card, name, category, article, placeholder, icon
// STRUCTURE: ▶ render card(hygiene product) ⊕ assert h3/category/article ⊕ assert no <img>
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';
import { ldd } from '../lib/ldd';

const SAMPLE: Product = {
  id: 't-1', name: 'Тестовый антисептик', category: 'hygiene',
  article: 'HYG-9999', unit: 'л', searchBlob: 'тестовый антисептик hyg-9999 средства гигиены',
};

describe('<ProductCard>', () => {
  it('renders name, category label and article; uses an icon placeholder when no photo', () => {
    render(<ul>{<ProductCard product={SAMPLE} />}</ul>);
    expect(screen.getByRole('heading', { name: 'Тестовый антисептик' })).toBeInTheDocument();
    expect(screen.getByText('Средства гигиены')).toBeInTheDocument();
    expect(screen.getByText(/HYG-9999/)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument(); // decorative icon, not an <img>
    ldd(9, 'ProductCard.test', 'RENDER', 'belief: name+category+article shown, icon placeholder');
  });
});
