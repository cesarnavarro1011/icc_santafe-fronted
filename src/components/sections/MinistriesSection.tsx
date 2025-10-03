'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, Clock, Mail, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Ministry {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  targetAudience: string;
  schedule: string;
  leader: string;
  contactEmail?: string;
  isActive: boolean;
}

// Datos de ejemplo - en producción vendrían del backend
const ministries: Ministry[] = [
  {
    id: '1',
    name: 'Ministerio Infantil',
    description: 'Un espacio especial donde los niños aprenden sobre el amor de Dios a través de actividades divertidas, juegos, cantos y enseñanzas bíblicas adaptadas a su edad.',
    imageUrl: '/api/placeholder/400/300',
    targetAudience: 'Niños de 4 a 12 años',
    schedule: 'Domingos 9:00 AM - 11:00 AM',
    leader: 'Pastora María González',
    contactEmail: 'infantil@iglesiacristiana.com',
    isActive: true
  },
  {
    id: '2',
    name: 'Ministerio de Jóvenes',
    description: 'Un lugar donde los jóvenes pueden crecer en su fe, desarrollar liderazgo y encontrar propósito mientras se divierten y crean amistades duraderas en Cristo.',
    imageUrl: '/api/placeholder/400/300',
    targetAudience: 'Jóvenes de 13 a 25 años',
    schedule: 'Viernes 7:00 PM - 9:00 PM',
    leader: 'Pastor David Morales',
    contactEmail: 'jovenes@iglesiacristiana.com',
    isActive: true
  },
  {
    id: '3',
    name: 'Ministerio de Parejas',
    description: 'Fortalecemos los matrimonios y las relaciones de pareja a través de enseñanzas bíblicas, talleres prácticos y actividades que promueven la unidad y el crecimiento conjunto.',
    imageUrl: '/api/placeholder/400/300',
    targetAudience: 'Matrimonios y parejas',
    schedule: 'Sábados 6:00 PM - 8:00 PM (2da semana del mes)',
    leader: 'Pastores Carlos y Ana Ruiz',
    contactEmail: 'parejas@iglesiacristiana.com',
    isActive: true
  },
  {
    id: '4',
    name: 'Ministerio de Damas',
    description: 'Un ministerio donde las mujeres se fortalecen mutuamente, crecen espiritualmente y desarrollan sus dones mientras sirven a Dios y a la comunidad.',
    imageUrl: '/api/placeholder/400/300',
    targetAudience: 'Mujeres de todas las edades',
    schedule: 'Miércoles 7:00 PM - 9:00 PM',
    leader: 'Hermana Patricia López',
    contactEmail: 'damas@iglesiacristiana.com',
    isActive: true
  },
  {
    id: '5',
    name: 'Ministerio de Adoración',
    description: 'Llevamos la presencia de Dios a través de la música y la adoración, preparando los corazones para recibir la Palabra y experimentar Su amor.',
    imageUrl: '/api/placeholder/400/300',
    targetAudience: 'Músicos y adoradores',
    schedule: 'Ensayos: Jueves 7:00 PM - 9:00 PM',
    leader: 'Director Musical: Juan Pérez',
    contactEmail: 'adoracion@iglesiacristiana.com',
    isActive: true
  },
  {
    id: '6',
    name: 'Ministerio de Evangelismo',
    description: 'Compartimos el amor de Cristo en nuestra comunidad a través de actividades de alcance, visitas y eventos evangelísticos que transforman vidas.',
    imageUrl: '/api/placeholder/400/300',
    targetAudience: 'Toda la congregación',
    schedule: 'Sábados 10:00 AM - 12:00 PM',
    leader: 'Pastor Miguel Torres',
    contactEmail: 'evangelismo@iglesiacristiana.com',
    isActive: true
  },
  {
    id: '7',
    name: 'Ministerio de Intercesión',
    description: 'Nos dedicamos a la oración constante por las necesidades de la iglesia, la comunidad y las naciones, siendo instrumentos de bendición a través de la intercesión.',
    imageUrl: '/api/placeholder/400/300',
    targetAudience: 'Intercesores y guerreros de oración',
    schedule: 'Martes 6:00 AM - 7:00 AM y Viernes 9:00 PM - 10:00 PM',
    leader: 'Hermana Rosa Martínez',
    contactEmail: 'intercesion@iglesiacristiana.com',
    isActive: true
  },
  {
    id: '8',
    name: 'Ministerio de Células',
    description: 'Crecimiento espiritual en grupos pequeños donde experimentamos comunión íntima, estudio bíblico profundo y cuidado pastoral personalizado.',
    imageUrl: '/api/placeholder/400/300',
    targetAudience: 'Toda la congregación',
    schedule: 'Miércoles 7:30 PM - 9:00 PM (en hogares)',
    leader: 'Pastor Principal',
    contactEmail: 'celulas@iglesiacristiana.com',
    isActive: true
  }
];

export default function MinistriesSection({ showAll = false }: { showAll?: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [showAllMinistries, setShowAllMinistries] = useState(false);
  const activeMinistries = ministries.filter(ministry => ministry.isActive);
  // Mostrar por defecto 6 cards (2 filas de 3)
  const displayMinistries = showAll || showAllMinistries ? activeMinistries : activeMinistries.slice(0, 6);

  const handleShowAll = () => {
    setShowAllMinistries(true);
  };
  const handleShowLess = () => {
    setShowAllMinistries(false);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } 
  };
  useEffect(() => {
    if (showAllMinistries) {
      const timer = setTimeout(() => {
        if (gridRef.current) {
          const rect = gridRef.current.getBoundingClientRect();
          const targetY = window.scrollY + rect.bottom - window.innerHeight * 0.9;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showAllMinistries]);

  return (
  <section ref={sectionRef} id="ministerios" className="py-16 bg-gray-50 scroll-mt-24">
      {/* Contenedor full-bleed similar a EventsSection */}
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-4 md:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {showAll ? 'Todos Nuestros Ministerios' : 'Nuestros Ministerios'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {showAll 
              ? 'Descubre todos los ministerios disponibles y encuentra el lugar perfecto para servir y crecer en tu fe.'
              : 'Encuentra tu lugar en nuestra comunidad. Tenemos ministerios para todas las edades y llamados.'
            }
          </p>
        </div>

        {/* Ministries Grid */}
  <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {displayMinistries.map((ministry) => (
            <div
              key={ministry.id}
              className="relative group rounded-2xl overflow-hidden aspect-square bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-500 focus-within:ring-2 focus-within:ring-blue-500"
            >
              {/* Imagen base */}
              <Image
                src={ministry.imageUrl}
                alt={ministry.name}
                fill
                className="object-cover brightness-[0.75] group-hover:brightness-90 scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
              />

              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Título: centrado por defecto, se desplaza arriba a la izquierda en hover */}
              <div className="absolute z-10 px-4 text-center transition-all duration-500
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                group-hover:top-4 group-hover:left-4 group-hover:-translate-x-0 group-hover:-translate-y-0 group-hover:text-left group-hover:px-0 group-hover:pr-4">
                <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg leading-snug
                  transition-all duration-500 group-hover:text-lg md:group-hover:text-xl line-clamp-2">
                  {ministry.name}
                </h3>
              </div>

              {/* Contenido que aparece al hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex flex-col h-[60%] translate-y-1/2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                <p className="text-gray-200 text-[11px] md:text-xs mb-2 line-clamp-3">
                  {ministry.description}
                </p>
                <div className="space-y-1 text-[10px] md:text-[11px] text-gray-300 mb-2">
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-2 text-blue-400" />
                    <span className="truncate">{ministry.targetAudience}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-2 text-blue-400" />
                    <span className="truncate">{ministry.schedule}</span>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-3.5 w-3.5 mr-2 text-blue-400 mt-0.5" />
                    <span className="truncate">Líder: {ministry.leader}</span>
                  </div>
                  {ministry.contactEmail && (
                    <div className="flex items-center">
                      <Mail className="h-3.5 w-3.5 mr-2 text-blue-400" />
                      <a
                        href={`mailto:${ministry.contactEmail}`}
                        className="text-blue-300 hover:text-blue-200 underline-offset-2 hover:underline truncate"
                      >
                        {ministry.contactEmail}
                      </a>
                    </div>
                  )}
                </div>
                <Link
                  href={`/ministerios/${ministry.id}`}
                  className="mt-auto inline-flex items-center justify-center gap-1.5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-full px-3.5 py-1.5 text-[11px] md:text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-black/20"
                >
                  <span>Ver más</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Fallback mobile: mostrar todo si no hay hover (touch) */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex flex-col h-[60%] md:hidden bg-gradient-to-t from-black/85 via-black/65 to-transparent">
                <p className="text-gray-200 text-[11px] mb-2 line-clamp-3">
                  {ministry.description}
                </p>
                <Link
                  href={`/ministerios/${ministry.id}`}
                  className="mt-auto inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full px-3.5 py-1.5 text-[11px] font-semibold"
                >
                  <span>Ver más</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
  {!showAll && activeMinistries.length > 6 && (
          <div className="text-center mt-12">
            {!showAllMinistries ? (
              <button
                type="button"
                onClick={handleShowAll}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Ver Todos los Ministerios</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleShowLess}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Mostrar Menos</span>
              </button>
            )}
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            ¿Te gustaría formar parte de un ministerio?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Creemos que cada persona tiene dones únicos para servir. Te invitamos a descubrir tu llamado 
            y ser parte activa de nuestra comunidad de fe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiero-saber-mas"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Quiero Participar
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Contactar Líder
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}