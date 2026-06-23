//#region MODULE_CONTRACT [DOMAIN(8): Testing; CONCEPT(9): E2E-A11y; TECH(8): Playwright]
/**
 * @file a11y.e2e.spec.ts
 * @brief Accessibility structure E2E — landmarks, single h1 per page, working skip-link.
 * @details Not a full axe audit; asserts the structural guarantees AX-Tree operability depends on: one banner,
 *          one main, one contentinfo, a named nav, exactly one h1 per route, and a focusable skip-link.
 * @purpose Guard the landmark/heading contract that screen readers and the E2E suite rely on.
 * @links TESTS(9): Layout landmarks, Header skip-link, all pages' headings
 * @modulemap TEST 8[landmarks] · TEST 9[single h1 per route] · TEST 8[skip-link focus]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: e2e, a11y, landmarks, banner, main, contentinfo, navigation, single-h1, skip-link, focus
// STRUCTURE: ▶ assert landmarks ⊕ loop routes→exactly one h1 ⊕ Tab→skip-link focused→#main
import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/about', '/about/mission', '/products', '/products/hygiene', '/partners', '/contacts', '/blog', '/privacy'];

test('home exposes the core landmarks', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Главное меню' })).toBeAttached();
});

for (const route of ROUTES) {
  test(`route ${route} has exactly one h1`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });
}

test('skip-link is the first focusable control and targets main', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'К содержанию' });
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute('href', '#main');
});
