//#region MODULE_CONTRACT [DOMAIN(9): Testing; CONCEPT(10): E2E-Navigation; TECH(8): Playwright]
/**
 * @file navigation.e2e.spec.ts
 * @brief AX-Tree E2E for the whole IA — data-driven from NAV metadata; menu, dropdowns, active state, crumbs, CTAs.
 * @details Drives the site purely by role/name. Loops the same NAV array the header renders, so routes and menu
 *          can never silently drift from the metadata. Covers every top route + every submenu reveal/navigate.
 * @purpose Prove every menu destination is reachable and the chrome reflects the active section.
 * @links TESTS(10): content/nav NAV ↔ App routes ↔ Header
 * @modulemap TEST 9[every top route] · TEST 9[every submenu nav] · TEST 8[logo home] · TEST 8[crumbs] · TEST 8[CTAs]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: e2e, navigation, NAV, dropdown, submenu, aria-current, breadcrumb, logo, cta, data-driven
// STRUCTURE: ▶ loop NAV top→assert h1+active ⊕ loop parents→hover+click child ⊕ logo→/ ⊕ crumbs back ⊕ CTA nav
import { expect, test } from '@playwright/test';
import { NAV } from '../src/content/nav';

const menu = (page: import('@playwright/test').Page) =>
  page.getByRole('navigation', { name: 'Главное меню' });

test('home shows exactly one h1 with the hero copy', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Надёжные поставки');
  expect(await page.getByRole('heading', { level: 1 }).count()).toBe(1);
});

// Every top-level route renders an h1 and marks its menu item active.
for (const item of NAV) {
  test(`top route «${item.label}» renders and is marked active`, async ({ page }) => {
    await page.goto(item.path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(menu(page).getByRole('link', { name: item.label, exact: true }))
      .toHaveAttribute('aria-current', 'page');
  });
}

// Every submenu item is revealed on hover and navigates to its route.
for (const parent of NAV.filter((n) => n.children?.length)) {
  for (const child of parent.children!) {
    test(`submenu «${parent.label} → ${child.label}» reveals and navigates`, async ({ page }) => {
      await page.goto('/');
      await menu(page).getByRole('link', { name: parent.label, exact: true }).hover();
      const link = menu(page).getByRole('link', { name: child.label, exact: true });
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${child.path.replace(/\//g, '\\/')}$`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  }
}

test('logo returns to home from a deep page', async ({ page }) => {
  await page.goto('/about/mission');
  await page.getByRole('link', { name: 'YARCO GROUP — на главную' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Надёжные поставки');
});

test('breadcrumb on a subpage navigates back to its section', async ({ page }) => {
  await page.goto('/partners/suppliers');
  await page.getByRole('navigation', { name: 'Хлебные крошки' })
    .getByRole('link', { name: 'Партнёрам' }).click();
  await expect(page).toHaveURL(/\/partners$/);
});

test('home CTAs route to products and partners', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Смотреть продукты' }).click();
  await expect(page).toHaveURL(/\/products$/);
  await page.goBack();
  await page.getByRole('link', { name: 'Стать партнёром' }).click();
  await expect(page).toHaveURL(/\/partners$/);
});

test('home direction card opens the matching catalog category', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Средства гигиены/ }).first().click();
  await expect(page).toHaveURL(/\/products\/hygiene$/);
});

test('unknown route renders the 404 with a link home', async ({ page }) => {
  await page.goto('/no-such-page');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('не найдена');
  await page.getByRole('link', { name: 'На главную', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});
