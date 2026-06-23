//#region MODULE_CONTRACT [DOMAIN(8): App; CONCEPT(8): Bootstrap; TECH(8): React]
/**
 * @file main.tsx
 * @brief Application entry — mounts <App> in a BrowserRouter and loads design tokens + global styles.
 * @details Imports tokens.css (brandbook :root) before global.css so variables resolve. BrowserRouter enables
 *          clean URLs (nginx must fall back to index.html on deploy — see README).
 * @modulecontract
 * @purpose Single bootstrap; wire router and styles.
 * @invariants Mounts exactly once into #root; tokens.css imported before global.css.
 * @links USES(8): App, styles/tokens.css, styles/global.css
 * @changes LAST_CHANGE: [v0.1.0 - Entry point.]
 * @modulemap PROC 8[Mount app] => createRoot(...).render
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: main, entry, bootstrap, createRoot, BrowserRouter, styles, mount
// STRUCTURE: ▶ import tokens→global ⊕ createRoot(#root) ⊕ StrictMode>BrowserRouter>App ⟶ render
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ldd } from './lib/ldd';
import './styles/tokens.css';
import './styles/global.css';

const root = document.getElementById('root');
if (!root) throw new Error('[IMP:10][main][MOUNT] #root not found — index.html broken');

ldd(8, 'main', 'MOUNT', 'belief: #root present, mounting App in BrowserRouter');
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
