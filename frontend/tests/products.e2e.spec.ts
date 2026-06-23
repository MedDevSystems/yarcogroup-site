//#region MODULE_CONTRACT [DOMAIN(9): Testing; CONCEPT(10): E2E-Catalog; TECH(8): Playwright]
/**
 * @file products.e2e.spec.ts
 * @brief AX-Tree E2E for the catalog — category chips scoping + search by name/article/in-scope + empty state.
 * @details Asserts the live result count (role="status") across category filters and queries, all by role/name.
 *          Verifies search scope is respected inside a category route.
 * @purpose Prove the catalog search/filter UX behaves correctly over the stub seam.
 * @links TESTS(10): pages/Products, components/ProductSearch, content/products
 * @modulemap TEST 9[chips scope counts] · TEST 9[active chip] · TEST 9[search name/article] · TEST 9[in-scope search] · TEST 9[empty]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: e2e, products, catalog, chips, category, search, article, status-count, empty-state, scope
// STRUCTURE: ▶ /products=16 ⊕ chips→8/8 ⊕ active aria-current ⊕ search мыло/NFD-2005 ⊕ scope hygiene ⊕ empty
import { expect, test } from '@playwright/test';

const status = (page: import('@playwright/test').Page) => page.getByRole('status');

test('catalog lists all demo products and chips scope the counts', async ({ page }) => {
  await page.goto('/products');
  await expect(status(page)).toContainText('Найдено товаров: 16');

  await page.getByRole('link', { name: 'Средства гигиены' }).click();
  await expect(page).toHaveURL(/\/products\/hygiene$/);
  await expect(status(page)).toContainText('Найдено товаров: 8');

  await page.getByRole('link', { name: 'Непродовольственные товары' }).click();
  await expect(page).toHaveURL(/\/products\/non-food$/);
  await expect(status(page)).toContainText('Найдено товаров: 8');

  await page.getByRole('link', { name: 'Все', exact: true }).click();
  await expect(status(page)).toContainText('Найдено товаров: 16');
});

test('active category chip carries aria-current', async ({ page }) => {
  await page.goto('/products/hygiene');
  await expect(page.getByRole('link', { name: 'Средства гигиены' })).toHaveAttribute('aria-current', 'true');
  await expect(page.getByRole('link', { name: 'Все', exact: true })).not.toHaveAttribute('aria-current', 'true');
});

test('search filters by name and by article', async ({ page }) => {
  await page.goto('/products');
  const box = page.getByRole('searchbox', { name: 'Поиск по товарам' });

  await box.fill('мыло');
  await expect(status(page)).toContainText('Найдено товаров: 1');
  await expect(page.getByRole('heading', { name: /Жидкое мыло/ })).toBeVisible();

  await box.fill('NFD-2005');
  await expect(status(page)).toContainText('Найдено товаров: 1');
  await expect(page.getByRole('heading', { name: /Батарейки/ })).toBeVisible();
});

test('search stays within the active category scope', async ({ page }) => {
  await page.goto('/products/non-food');
  await expect(status(page)).toContainText('Найдено товаров: 8');
  // «салфетки» exist in BOTH categories; scoped to non-food only the столовые салфетки match.
  await page.getByRole('searchbox', { name: 'Поиск по товарам' }).fill('салфетки');
  await expect(status(page)).toContainText('Найдено товаров: 1');
  await expect(page.getByRole('heading', { name: /Салфетки бумажные столовые/ })).toBeVisible();
});

test('no-match query shows an explicit empty state', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('searchbox', { name: 'Поиск по товарам' }).fill('zzzнетничего');
  await expect(status(page)).toContainText('Найдено товаров: 0');
  await expect(page.getByText(/ничего не найдено/i)).toBeVisible();
});
