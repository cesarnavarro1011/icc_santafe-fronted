"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * PastoresPinnedTransition
 * Sección anclada (pin) que cruza / transiciona dos generaciones de pastores.
 * - min-h crea el espacio de scroll
 * - bloque sticky top-0 mantiene el contenido en pantalla
 * - useScroll obtiene progreso local (0 -> 1)
 * - useTransform mapea progreso a opacidades, traslaciones y escala
 * - Respeta prefers-reduced-motion
 */
export default function PastoresPinnedTransition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Progreso local: 0 cuando top del contenedor toca top del viewport, 1 cuando bottom toca top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Timings (puedes ajustar los puntos intermedios para alargar o acortar la superposición)
  const oldOpacity = prefersReducedMotion
    ? 1
    : useTransform(scrollYProgress, [0, 0.35, 0.6, 1], [1, 1, 0, 0]);
  const newOpacity = prefersReducedMotion
    ? 1
    : useTransform(scrollYProgress, [0, 0.4, 0.65, 1], [0, 0, 1, 1]);

  const oldY = prefersReducedMotion
    ? 0
    : useTransform(scrollYProgress, [0, 0.6, 1], [0, -20, -30]);
  const newY = prefersReducedMotion
    ? 0
    : useTransform(scrollYProgress, [0, 0.4, 1], [30, 10, 0]);

  const oldScale = prefersReducedMotion
    ? 1
    : useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const newScale = prefersReducedMotion
    ? 1
    : useTransform(scrollYProgress, [0, 1], [1.03, 1]);

  const OLD_PASTORS = [
    { name: "Herando Rincón", image: "/images/herando.jpg", alt: "Pastor Herando Rincón" },
    { name: "Helda Sánchez", image: "/images/helda.jpg", alt: "Pastora Helda Sánchez" },
  ];
  const NEW_PASTORS = [
    { name: "Nuevo Pastor", image: "/images/nuevo.jpg", alt: "Nuevo Pastor" },
    { name: "Nueva Pastora", image: "/images/nueva.jpg", alt: "Nueva Pastora" },
  ];

  return (
    <section ref={sectionRef} className="relative w-full min-h-[230vh]">
      {/* Contenido sticky (pin) */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/0 via-white/60 to-white" aria-hidden="true" />
        <div className="relative w-full max-w-6xl mx-auto px-6 md:px-10">
          <header className="text-center mb-10 select-none">
            <p className="text-xs md:text-sm font-semibold tracking-wider text-[#f5cc00] uppercase mb-2">Transición</p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Liderazgo Pastoral</h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">Honramos a quienes sembraron fielmente y abrazamos la nueva temporada que continúa la visión.</p>
          </header>

          {/* Área visual */}
          <div className="relative aspect-[16/8] md:aspect-[16/6] lg:aspect-[16/5]">
            {/* Grupo antiguo */}
            <motion.div
              style={{ opacity: oldOpacity, y: oldY, scale: oldScale }}
              className="absolute inset-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-10 sm:gap-20 will-change-transform will-change-opacity pointer-events-none"
              aria-hidden={prefersReducedMotion ? undefined : true}
            >
              {OLD_PASTORS.map(p => (
                <figure key={p.name} className="flex flex-col items-center text-center">
                  <div className="relative w-full sm:w-72 max-w-xs aspect-[4/5] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-gray-100">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 90vw, 35vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </div>
                  <figcaption className="mt-4 text-lg md:text-xl font-semibold text-gray-900 leading-tight select-none">{p.name}</figcaption>
                </figure>
              ))}
            </motion.div>

            {/* Grupo nuevo */}
            <motion.div
              style={{ opacity: newOpacity, y: newY, scale: newScale }}
              className="absolute inset-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-10 sm:gap-20 will-change-transform will-change-opacity pointer-events-none"
              aria-hidden={prefersReducedMotion ? undefined : true}
            >
              {NEW_PASTORS.map(p => (
                <figure key={p.name} className="flex flex-col items-center text-center">
                  <div className="relative w-full sm:w-72 max-w-xs aspect-[4/5] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-gray-100">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 90vw, 35vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </div>
                  <figcaption className="mt-4 text-lg md:text-xl font-semibold text-gray-900 leading-tight select-none">{p.name}</figcaption>
                </figure>
              ))}
            </motion.div>
          </div>

          {/* Indicador de progreso (omitido si reduce motion) */}
          {!prefersReducedMotion && (
            <div className="mt-10 h-1 w-48 mx-auto rounded-full bg-gray-200 overflow-hidden">
              <motion.span style={{ scaleX: newOpacity }} className="origin-left block h-full bg-gradient-to-r from-[#710000] via-[#5a189a] to-[#0E34A0]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
