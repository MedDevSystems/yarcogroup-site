//#region MODULE_CONTRACT [DOMAIN(8): Testing; CONCEPT(9): E2E-Responsive; TECH(8): Playwright]
/**
 * @file responsive.e2e.spec.ts
 * @brief Mobile-viewport E2E — burger toggles the drawer, submenus are reachable, drawer closes after navigation.
 * @details Runs at a phone viewport. Verifies the menu is hidden until the burger is pressed, submenu links are
 *          inline-expanded in the drawer, navigation works, and the drawer auto-closes on route change.
 * @purpose Prove the responsive nav is operable on touch/small screens by role/name.
 * @links TESTS(9): components/Header (mobile drawer), App routing
 * @modulemap TEST 9[burger toggle] · TEST 9[submenu nav in drawer] · TEST 8[drawer closes after nav]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: e2e, responsive, mobile, burger, drawer, toggle, submenu, aria-expanded
// STRUCTURE: ▶ phone viewport ⊕ link hidden→click burger→visible ⊕ click child→nav ⊕ assert drawer closed
import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test('burger reveals the drawer and a submenu link, then navigates and closes', async ({ page }) => {
  await page.goto('/');
  const burger = page.getByRole('button', { name: /меню/i });
  await expect(burger).toBeVisible();
  await expect(burger).toHaveAttribute('aria-expanded', 'false');

  // submenu link hidden while drawer is closed
  const child = page.getByRole('navigation', { name: 'Главное меню' })
    .getByRole('link', { name: 'Средства гигиены', exact: true });
  await expect(child).toBeHidden();

  await burger.click();
  await expect(burger).toHaveAttribute('aria-expanded', 'true');
  await expect(child).toBeVisible();

  await child.click();
  await expect(page).toHaveURL(/\/products\/hygiene$/);
  // route change auto-closes the drawer
  await expect(burger).toHaveAttribute('aria-expanded', 'false');
});

test('mobile catalog search still works', async ({ page }) => {
  await page.goto('/products');
  await expect(page.getByRole('status')).toContainText('Найдено товаров: 16');
  await page.getByRole('searchbox', { name: 'Поиск по товарам' }).fill('мыло');
  await expect(page.getByRole('status')).toContainText('Найдено товаров: 1');
});
