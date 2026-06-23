//#region MODULE_CONTRACT [DOMAIN(9): Testing; CONCEPT(10): HeaderTest; TECH(8): Vitest+RTL]
/**
 * @file Header.test.tsx
 * @brief Role-driven test for the header — renders all NAV items + submenus and marks the active section.
 * @purpose Prove the metadata-driven menu renders 1:1 with NAV and reflects the current route via aria-current.
 * @links TESTS(10): components/Header.tsx ↔ content/nav NAV
 * @modulemap TEST 9[all top links] · TEST 9[submenu links present] · TEST 9[active section aria-current]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, header, nav, menu, submenu, aria-current, role, metadata-driven
// STRUCTURE: ▶ render(MemoryRouter /about/mission) ⊕ assert 6 top links ⊕ submenu link ⊕ active «О компании»
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { NAV } from '../content/nav';
import { ldd } from '../lib/ldd';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>,
  );
}

describe('<Header>', () => {
  it('renders every top-level NAV item as a link', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Главное меню' });
    for (const item of NAV) {
      expect(within(nav).getByRole('link', { name: item.label })).toBeInTheDocument();
    }
    ldd(9, 'Header.test', 'TOP', `belief: all ${NAV.length} top items rendered`);
  });

  it('renders submenu links from metadata', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Главное меню' });
    expect(within(nav).getByRole('link', { name: 'Наша миссия' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Поставщикам' })).toBeInTheDocument();
    ldd(9, 'Header.test', 'SUB', 'belief: submenu links present');
  });

  it('marks the active section with aria-current', () => {
    renderAt('/about/mission');
    const nav = screen.getByRole('navigation', { name: 'Главное меню' });
    expect(within(nav).getByRole('link', { name: 'О компании' }))
      .toHaveAttribute('aria-current', 'page');
    expect(within(nav).getByRole('link', { name: 'Наша миссия' }))
      .toHaveAttribute('aria-current', 'page');
    ldd(9, 'Header.test', 'ACTIVE', 'belief: /about/mission → section+leaf active');
  });
});
