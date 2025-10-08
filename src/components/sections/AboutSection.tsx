"use client";

import Image from "next/image";
import { Eye, Target, Heart, Users } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface AboutItem {
  title: string;
  text: string;
  image: string;
  icon: React.ReactNode;
  accent: string;
}

const aboutData = {
  vision: {
    text: "Ser una iglesia que transforma vidas y comunidades a través del amor de Cristo, siendo un faro de esperanza y un centro de crecimiento espiritual para todas las personas.",
    image: "/images/vision.jpg"
  },
  mission: {
    text: "Nuestra misión es glorificar a Dios mediante la adoración, discipular a los creyentes en la fe cristiana, evangelizar a los perdidos con amor y compasión, y servir a nuestra comunidad con el corazón de Cristo.",
    image: "/images/mision.jpg"
  },
  values: {
    list: [
      "Amor incondicional hacia Dios y al prójimo",
      "Integridad y transparencia en todas nuestras acciones",
      "Servicio desinteresado a la comunidad",
      "Crecimiento espiritual continuo",
      "Unidad en la diversidad",
      "Excelencia en todo lo que hacemos"
    ],
    image: "/images/valores.jpg"
  }
};

// Definiciones de pastores para la transición (reemplaza imágenes/nombres según corresponda)
interface Pastor {
  name: string;
  image: string;
  alt: string;
}

const oldPastors: Pastor[] = [
  { name: "Pr. Juan Pérez", image: "/images/hernando.jpg", alt: "Pastor Juan Pérez" },
  { name: "Pr. María López", image: "/images/helda.jpg", alt: "Pastora María López" }
];

const newPastors: Pastor[] = [
  { name: "Pr. Carlos Gómez", image: "/images/nando.jpg", alt: "Pastor Carlos Gómez" },
  { name: "Pr. Ana Ruiz", image: "/images/liceth.jpg", alt: "Pastora Ana Ruiz" }
];

export default function AboutSectionAlt() {
  const successionRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  // Ajusta esta constante según la altura real de tu navbar
  const NAV_OFFSET = 120; 

  // Revertimos offset al anterior (empieza justo cuando entra el wrapper)
  const { scrollYProgress } = useScroll({
    target: successionRef,
    offset: ["start start", "end 0.1"]
  });

  // Rango ligeramente adelantado
  const oldOpacityMV = useTransform(scrollYProgress, [0, 0.18, 0.38, 0.55, 1], [1, 1, 0.90, 0.40, 0]);
  const newOpacityMV = useTransform(scrollYProgress, [0, 0.25, 0.42, 0.62, 1], [0, 0, 0.10, 1, 1]);
  const oldYMV       = useTransform(scrollYProgress, [0, 0.4, 1], [0, -10, -20]);
  const newYMV       = useTransform(scrollYProgress, [0, 0.40, 1], [60, -10, -20]);

  const oldOpacity = reduceMotion ? 1 : oldOpacityMV;
  const newOpacity = reduceMotion ? 1 : newOpacityMV;
  const oldY = reduceMotion ? 0 : oldYMV;
  const newY = reduceMotion ? 0 : newYMV;

  const items: AboutItem[] = [
    {
      title: "Nuestra Misión",
      text: aboutData.mission.text,
      image: aboutData.mission.image,
      icon: <Target className="h-6 w-6" />,
      accent: "from-green-500 to-emerald-500"
    },
    {
      title: "Nuestra Visión",
      text: aboutData.vision.text,
      image: aboutData.vision.image,
      icon: <Eye className="h-6 w-6" />,
      accent: "from-blue-500 to-indigo-500"
    },
    {
      title: "Nuestros Valores",
      text: "Estos principios guían cada decisión y cada paso que damos como comunidad de fe.",
      image: aboutData.values.image,
      icon: <Heart className="h-6 w-6" />,
      accent: "from-rose-500 to-pink-500"
    }
  ];

  function AboutItemCard({ item, idx }: { item: AboutItem; idx: number }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}
      >
        <div className="md:w-1/2 relative group">
          <div
            className={
              "absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition duration-500 blur-md " +
              (idx === 0
                ? "from-blue-500/30 to-indigo-500/30"
                : idx === 1
                  ? "from-green-500/30 to-emerald-500/30"
                  : "from-rose-500/30 to-pink-500/30")
            }
          />
          <div className="relative overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={900}
              height={650}
              className="object-cover h-80 w-full md:h-96 lg:h-[500px] scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-medium text-white bg-black/40 backdrop-blur-md flex items-center gap-2">
              {item.icon}
              <span>{item.title}</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className={`h-12 w-12 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}>
              {item.icon}
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">{item.title}</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {item.text}
          </p>
          {item.title === "Nuestros Valores" && (
            <ul className="grid grid-cols-1 gap-y-4 text-base md:text-lg">
              {aboutData.values.list.map((value, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 block w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <section className="relative space-y-24 bg-white">
      {/* Items */}
      <div className="space-y-16">
        {items.map((item, idx) => (
          <AboutItemCard key={item.title + idx} item={item} idx={idx} />
        ))}
      </div>

      {/* Transición Pastoral Scroll */}
      <div ref={successionRef} className="relative">
        {/* Altura más corta y sin padding adicional (reversión) */}
        <div className="h-[250vh]">
          <div
            className="sticky flex flex-col items-center justify-start"
            style={{
              top: NAV_OFFSET,
              height: `calc(100vh - ${NAV_OFFSET}px)`
            }}
          >
            <div className="">
               {/* Título */}
              <h2 className="relative z-20 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-5 text-center overflow-hidden ">
                Sucesión Pastoral
              </h2>
              <p className="relative z-20 max-w-2xl text-center text-gray-600 mb-12">honrramos a los pastores que sembraron la base y a los que continúan su legado.</p>
            </div>

            {/* Contenedor de tarjetas sin margen extra para que queden más arriba */}
            <div className="relative w-full max-w-5xl mx-auto">
               {/* Antiguos */}
               <motion.div
                 style={{ opacity: oldOpacity, y: oldY }}
                 className="absolute inset-x-0 top-0 flex flex-col md:flex-row gap-10 items-center justify-center z-10"
               >
                 {oldPastors.map(p => (
                   <div key={p.name} className="text-center">
                     <div className="relative w-60 h-60 rounded-2xl ring-4 ring-blue-100 shadow-lg">
                       <Image src={p.image} alt={p.alt} fill className="object-cover" />
                     </div>
                     <p className="mt-4 font-semibold text-gray-800">{p.name}</p>
                     <p className="text-sm text-gray-500">Pastorado Fundacional</p>
                   </div>
                 ))}
               </motion.div>

               {/* Nuevos */}
               <motion.div
                 style={{ opacity: newOpacity, y: newY }}
                 className="absolute inset-x-0 top-0 flex flex-col md:flex-row gap-10 items-center justify-center z-10"
               >
                 {newPastors.map(p => (
                   <div key={p.name} className="text-center">
                     <div className="relative w-60 h-60 rounded-2xl overflow-hidden ring-4 ring-emerald-100 shadow-lg">
                       <Image src={p.image} alt={p.alt} fill className="object-cover" />
                     </div>
                     <p className="mt-4 font-semibold text-gray-800">{p.name}</p>
                     <p className="text-sm text-emerald-600">Pastorado Actual</p>
                   </div>
                 ))}
               </motion.div>
             </div>
           </div>
         </div>
       </div>

      {/* Estadísticas */}
      <div className="container mx-auto px-4 relative">
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-black rounded-xl p-6 md:p-8 text-white">
          <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Users className="h-9 w-9 mx-auto mb-2 text-blue-200" />
              <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
              <div className="text-sm md:text-lg font-semibold text-blue-200">Miembros Activos</div>
            </div>
            <div>
              <Target className="h-9 w-9 mx-auto mb-2 text-blue-200" />
              <div className="text-3xl md:text-4xl font-bold mb-1">15</div>
              <div className="text-sm md:text-lg font-semibold text-blue-200">Años de Ministerio</div>
            </div>
            <div>
              <Heart className="h-9 w-9 mx-auto mb-2 text-blue-200" />
              <div className="text-3xl md:text-4xl font-bold mb-1">8</div>
              <div className="text-sm md:text-lg font-semibold text-blue-200">Ministerios Activos</div>
            </div>
            <div>
              <Users className="h-9 w-9 mx-auto mb-2 text-blue-200" />
              <div className="text-3xl md:text-4xl font-bold mb-1">1000+</div>
              <div className="text-sm md:text-lg font-semibold text-blue-200">Vidas Transformadas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// Fondo blanco para la sección About sin modificar el componente original
if (typeof document !== 'undefined') {
  requestAnimationFrame(() => {
    document
      .querySelectorAll('section.relative.space-y-24')
      .forEach(el => el.classList.add('bg-white'));
  });
}