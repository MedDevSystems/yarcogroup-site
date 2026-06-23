//#region MODULE_CONTRACT [DOMAIN(9): Testing; CONCEPT(10): MetadataPageTest; TECH(8): Vitest+RTL]
/**
 * @file ContentPage.test.tsx
 * @brief Test for the metadata page renderer — renders a known page's heading/lead/blocks; safe fallback on miss.
 * @purpose Prove one renderer builds pages from PAGES data and never crashes on an unknown key.
 * @links TESTS(10): pages/ContentPage.tsx ↔ content/pages PAGES
 * @modulemap TEST 9[known page heading+lead] · TEST 8[unknown key fallback]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, content-page, metadata, renderer, heading, lead, fallback, blocks
// STRUCTURE: ▶ render(mission) assert h1+lead+block ⊕ render(unknown) assert fallback
import { describe, expect, it } from 'vitest';
import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContentPage } from './ContentPage';
import { ldd } from '../lib/ldd';

const wrap = (node: ReactNode) => render(<MemoryRouter>{node}</MemoryRouter>);

describe('<ContentPage>', () => {
  it('renders a known page from metadata (heading + lead + a block)', () => {
    wrap(<ContentPage pageKey="mission" />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Всё необходимое');
    expect(h1).toHaveTextContent('для медицины');
    expect(screen.getByText(/обеспечиваем медицинские организации/i)).toBeInTheDocument();
    ldd(9, 'ContentPage.test', 'KNOWN', 'belief: mission renders heading+lead+blocks');
  });

  it('renders a friendly fallback for an unknown key (no crash)', () => {
    wrap(<ContentPage pageKey="does-not-exist" />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Раздел/);
    expect(h1).toHaveTextContent(/готовится/);
    ldd(9, 'ContentPage.test', 'FALLBACK', 'belief: unknown key → graceful fallback');
  });
});
