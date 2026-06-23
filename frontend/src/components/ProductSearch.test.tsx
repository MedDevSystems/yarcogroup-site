//#region MODULE_CONTRACT [DOMAIN(9): Testing; CONCEPT(10): SearchTest; TECH(8): Vitest+RTL]
/**
 * @file ProductSearch.test.tsx
 * @brief Role-driven test for the catalog search — filtering + empty state, over the real stub seam.
 * @details Drives the widget only by role/label (AX-Tree), exercising the same path users take. Asserts the
 *          live result count and the empty state. The component emits [IMP:9] belief lines, so it is not silent.
 * @purpose Prove the search UX filters correctly and degrades to an explicit empty state.
 * @links TESTS(10): components/ProductSearch.tsx via lib/api stub + content/products
 * @modulemap TEST 9[lists all] · TEST 9[filters by query] · TEST 9[empty state]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, search, role, searchbox, filter, empty-state, ax-tree, stub
// STRUCTURE: ▶ render ⊕ getByRole(searchbox) ⊕ type "гиг"→8 ⊕ type junk→0 + empty-state
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductSearch } from './ProductSearch';
import { ldd } from '../lib/ldd';

describe('<ProductSearch>', () => {
  it('lists the whole demo catalog initially', async () => {
    render(<ProductSearch />);
    expect(await screen.findByText('Найдено товаров: 16')).toBeInTheDocument();
    ldd(9, 'ProductSearch.test', 'ALL', 'belief: empty query lists all 16');
  });

  it('filters to hygiene when typing «гиг»', async () => {
    const user = userEvent.setup();
    render(<ProductSearch />);
    await screen.findByText('Найдено товаров: 16');
    await user.type(screen.getByRole('searchbox', { name: 'Поиск по товарам' }), 'гиг');
    expect(await screen.findByText('Найдено товаров: 8')).toBeInTheDocument();
    ldd(9, 'ProductSearch.test', 'FILTER', 'belief: "гиг" → 8 hygiene items');
  });

  it('shows an empty state for a no-match query', async () => {
    const user = userEvent.setup();
    render(<ProductSearch />);
    await screen.findByText('Найдено товаров: 16');
    await user.type(screen.getByRole('searchbox', { name: 'Поиск по товарам' }), 'zzzzнеттакого');
    expect(await screen.findByText('Найдено товаров: 0')).toBeInTheDocument();
    expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument();
    ldd(9, 'ProductSearch.test', 'EMPTY', 'belief: no-match query → 0 + empty state');
  });
});
