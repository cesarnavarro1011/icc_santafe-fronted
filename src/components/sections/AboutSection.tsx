"use client";

import Image from "next/image";
import { Eye, Target, Heart, Users } from "lucide-react";

interface AboutItem {
  title: string;
  text: string;
  image: string;
  icon: React.ReactNode;
  accent: string; // tailwind color string e.g. 'from-blue-500'
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

export default function AboutSectionAlt() {
  const items: AboutItem[] = [
    {
      title: "Nuestra Visión",
      text: aboutData.vision.text,
      image: aboutData.vision.image,
      icon: <Eye className="h-6 w-6" />,
      accent: "from-blue-500 to-indigo-500"
    },
    {
      title: "Nuestra Misión",
      text: aboutData.mission.text,
      image: aboutData.mission.image,
      icon: <Target className="h-6 w-6" />,
      accent: "from-green-500 to-emerald-500"
    },
    {
      title: "Nuestros Valores",
      text: "Estos principios guían cada decisión y cada paso que damos como comunidad de fe.",
      image: aboutData.values.image,
      icon: <Heart className="h-6 w-6" />,
      accent: "from-rose-500 to-pink-500"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent)]">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl" />
      </div>

      {/* Encabezado centrado con márgenes */}
      <div className="container mx-auto px-4 relative mb-30">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            ¿Quiénes Somos?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Conoce nuestra identidad, propósito y fundamentos. Un vistazo claro y ordenado de lo que creemos y hacia dónde caminamos.
          </p>
        </div>
      </div>

      {/* Contenido principal - ancho completo para imágenes */}
      <div className="space-y-16">
        {items.map((item, idx) => (
          <div
            key={item.title}
            className={`relative flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}
          >
            {/* Imagen - ancho completo sin márgenes */}
            <div className="md:w-1/2 relative group">
              <div
                className={
                  `absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition duration-500 blur-md ` +
                  (idx === 0
                    ? 'from-blue-500/30 to-indigo-500/30'
                    : idx === 1
                      ? 'from-green-500/30 to-emerald-500/30'
                      : 'from-rose-500/30 to-pink-500/30')
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

            {/* Contenido - con márgenes y padding */}
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
          </div>
        ))}
      </div>

      {/* Estadísticas con contenedor */}
      <div className="container mx-auto px-4 relative">
        {/* Statistics - Full width */}
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 mt-2 bg-black rounded-xl p-6 md:p-8 text-white mt-12">
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

        {/* Call to Action */}
        {/* <div className="mt-12 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Te gustaría conocer más sobre nosotros?
          </h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Te invitamos a visitarnos y ser parte de nuestra familia. Estamos aquí para acompañarte en tu crecimiento espiritual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Contáctanos
            </a>
            <a
              href="/eventos"
              className="bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200 inline-block"
            >
              Ver Próximos Eventos
            </a>
          </div>
        </div> */}
    </section>
  );
}
