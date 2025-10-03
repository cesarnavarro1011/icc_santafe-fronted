import { useEffect, useState } from 'react';

interface Options {
  ids: string[];
  rootMargin?: string;
  threshold?: number[] | number;
  offset?: number; // manual scroll offset when computing active
  minRatio?: number; // porcentaje mínimo visible (0.1 => 10%) para considerar activa
}

export function useScrollSpy({ ids, rootMargin = '0px 0px -50% 0px', threshold = [0, 0.1, 0.25, 0.5, 0.75, 1], offset = 0, minRatio = 0.1 }: Options) {
  // Devuelve id de sección, '__hero__' cuando aún estás en el área superior (Hero) y null cuando fuera de rango (por ejemplo footer)
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const elements = ids
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    let current = activeId;

    const observer = new IntersectionObserver(
      (entries) => {
        // Filtramos únicamente entradas con ratio >= minRatio
        const qualifying = entries
          .filter(e => e.isIntersecting && e.intersectionRatio >= minRatio)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);

        if (qualifying.length) {
          const topMost = qualifying[0];
            const id = topMost.target.getAttribute('id');
            if (id && id !== current) {
              current = id;
              setActiveId(id);
            }
        } else {
          // Fallback manual si no hay ninguna con el ratio mínimo
          const scrollPos = window.scrollY + offset + 80; // compensar header
          const firstEl = elements[0];
          // Si estamos por encima del primer bloque menos un margen, limpiamos (Inicio)
          if (window.scrollY < firstEl.offsetTop - 140) {
            if (current !== '__hero__') {
              current = '__hero__';
              setActiveId('__hero__');
            }
            return; // hero visible
          }
          const candidates = elements.filter(el => {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            const visiblePortion = Math.max(0, Math.min(scrollPos + window.innerHeight, top + height) - Math.max(top, scrollPos));
            const ratio = visiblePortion / height;
            return ratio >= minRatio;
          }).sort((a,b)=>a.offsetTop - b.offsetTop);
          if (candidates.length) {
            const id = candidates[0].getAttribute('id');
            if (id && id !== current) {
              current = id;
              setActiveId(id);
            }
          } else {
            // Estamos fuera de cualquier sección (probablemente debajo de la última) => null
            if (current !== null) {
              current = null;
              setActiveId(null);
            }
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  // We intentionally do NOT include activeId to avoid re-creating observer on each state change
  // threshold may be array; stringify just once outside or force user to pass stable ref
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(','), rootMargin, offset, minRatio, Array.isArray(threshold) ? (threshold as number[]).join(',') : threshold]);

  return activeId;
}
