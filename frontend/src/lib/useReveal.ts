//#region MODULE_CONTRACT [DOMAIN(7): UI; CONCEPT(8): MotionReveal; TECH(8): React]
/**
 * @file useReveal.ts
 * @brief Scroll-reveal hook — adds `is-visible` to an element once it enters the viewport (IntersectionObserver).
 * @details Tasteful, restrained motion per the frontend-design skill: one-time gentle fade-up of section groups.
 *          Accessibility/quality floor — honors `prefers-reduced-motion` (shows immediately, no motion). Test-safe:
 *          when IntersectionObserver/matchMedia are absent (jsdom), it reveals immediately instead of throwing.
 * @modulecontract
 * @purpose One reusable, reduced-motion-aware observer ref for "reveal-group" containers.
 * @invariants Never hides content when motion is disabled or APIs are unavailable; observes once then disconnects.
 * @links STYLED_BY(8): global.css (.reveal-group / .is-visible); USED_BY(8): pages/Home, pages/ContentPage
 * @changes LAST_CHANGE: [v0.1.0 - Reveal-on-scroll hook.]
 * @modulemap HOOK 8[Reveal container on scroll] => useReveal
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: reveal, scroll, IntersectionObserver, prefers-reduced-motion, motion, a11y, once, ref
// STRUCTURE: ▶ ref → effect ◇ reduced-motion|no-IO → add is-visible : observe → on-enter add is-visible + unobserve
import { useEffect, useRef } from 'react';

//#region HOOK_useReveal [DOMAIN(7): UI; CONCEPT(8): MotionReveal; TECH(8): React]
/** @purpose Attach to a `.reveal-group`; reveals it once on scroll. @complexity 2 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
//#endregion HOOK_useReveal
