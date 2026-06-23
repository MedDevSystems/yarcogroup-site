//#region MODULE_CONTRACT [DOMAIN(8): Testing; CONCEPT(9): FooterTest; TECH(8): Vitest+RTL]
/**
 * @file Footer.test.tsx
 * @brief Test for the footer — contacts (email/phone), privacy link, legal requisites, all from SITE.
 * @purpose Guard that ТЗ's required footer items render and stay sourced from one config object.
 * @links TESTS(9): components/Footer.tsx ↔ content/site SITE
 * @modulemap TEST 8[contentinfo landmark] · TEST 8[email/phone links] · TEST 8[privacy link] · TEST 8[requisites]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, footer, contacts, email, phone, privacy, requisites, contentinfo
// STRUCTURE: ▶ render(MemoryRouter Footer) ⊕ assert email/phone/privacy/legalName from SITE
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';
import { SITE } from '../content/site';
import { ldd } from '../lib/ldd';

describe('<Footer>', () => {
  it('renders contacts, privacy link and requisites from SITE', () => {
    render(<MemoryRouter><Footer /></MemoryRouter>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: SITE.email })).toHaveAttribute('href', `mailto:${SITE.email}`);
    expect(screen.getByRole('link', { name: SITE.phone })).toHaveAttribute('href', SITE.phoneHref);
    expect(screen.getByRole('link', { name: 'Политика конфиденциальности' }))
      .toHaveAttribute('href', SITE.privacyPath);
    expect(screen.getByText(new RegExp(SITE.requisites.legalName))).toBeInTheDocument();
    ldd(9, 'Footer.test', 'RENDER', 'belief: contacts+privacy+requisites from SITE');
  });
});
