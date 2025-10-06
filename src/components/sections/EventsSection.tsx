'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Filter } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  isRecurring: boolean;
  category: 'servicio' | 'evento-especial' | 'ministerio' | 'conferencia' | 'actividad-juvenil';
}

// Datos de ejemplo - en producción vendrían del backend
const events: Event[] = [
  {
    id: '1',
    title: 'Servicio Dominical',
    description: 'Únete a nosotros para un tiempo de adoración, enseñanza y comunión fraternal.',
    date: '2025-10-05',
    time: '10:00 AM',
    location: 'Santuario Principal',
    imageUrl: '/images/servicioDominical.jpg',
    isRecurring: true,
    category: 'servicio'
  },
  {
    id: '2',
    title: 'Actividad Juvenil',
    description: 'Una Actividad especial para jóvenes con música, predicación y actividades dinámicas.',
    date: '2025-10-15',
    time: '7:00 PM',
    location: 'Auditorio Central',
    imageUrl: '/images/ministerioJovenes.jpg',
    isRecurring: false,
    category: 'actividad-juvenil'
  },
  {
    id: '3',
    title: 'Retiro de Parejas',
    description: 'Un fin de semana para fortalecer el matrimonio y las relaciones de pareja.',
    date: '2025-10-20',
    time: '6:00 PM',
    location: 'Centro de Retiros Monte Sión',
    imageUrl: '/images/retiroParejas.jpg',
    isRecurring: false,
    category: 'evento-especial'
  },
  {
    id: '4',
    title: 'Reunión de Célula - Sector Norte',
    description: 'Crecimiento espiritual en grupos pequeños con estudio bíblico y oración.',
    date: '2025-10-08',
    time: '7:30 PM',
    location: 'Casa Familia González',
    imageUrl: '/api/placeholder/400/250',
    isRecurring: true,
    category: 'ministerio'
  },
  {
    id: '5',
    title: 'Noche de Adoración',
    description: 'Una noche especial dedicada completamente a la adoración y la presencia de Dios.',
    date: '2025-10-12',
    time: '7:00 PM',
    location: 'Santuario Principal',
    imageUrl: '/images/nocheAdoracion.jpg',
    isRecurring: false,
    category: 'evento-especial'
  },
  {
    id: '6',
    title: 'Congreso de Mujeres 2025',
    description: 'Mujeres empoderadas para vivir su propósito en Cristo.',
    date: '2025-11-05',
    time: '9:00 AM',
    location: 'Aulas Infantiles',
    imageUrl: '/images/congresoMujeres.jpg',
    isRecurring: true,
    category: 'evento-especial'
  }
];

const categoryLabels = {
  servicio: 'Servicio',
  'evento-especial': 'Evento Especial',
  ministerio: 'Ministerio',
  conferencia: 'Conferencia',
  'actividad-juvenil': 'Actividad Juvenil'
};

const categoryColors = {
  servicio: 'bg-blue-100 text-blue-800',
  'evento-especial': 'bg-purple-100 text-purple-800',
  ministerio: 'bg-green-100 text-green-800',
  conferencia: 'bg-red-100 text-red-800',
  'actividad-juvenil': 'bg-yellow-100 text-yellow-800'
};


export default function EventsSection({ showAll = false }: { showAll?: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showAllEvents, setShowAllEvents] = useState(false);

  const filteredEvents = events.filter(event => 
    selectedCategory === 'todos' || event.category === selectedCategory
  );

  // Mostrar solo la primera fila por defecto, según el número de columnas
  let maxPerRow = 1;
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 1280) maxPerRow = 4; // xl:grid-cols-4
    else if (window.innerWidth >= 1024) maxPerRow = 3; // lg:grid-cols-3
    else if (window.innerWidth >= 640) maxPerRow = 2; // sm:grid-cols-2
  }
  const displayEvents = showAll || showAllEvents ? filteredEvents : filteredEvents.slice(0, maxPerRow);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShowAll = () => {
    setShowAllEvents(true);
  };
  const handleShowLess = () => {
    setShowAllEvents(false);
    // Desplazar suavemente al inicio de la sección
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cuando se expande, hacer scroll un poco más abajo para mostrar las nuevas filas
  useEffect(() => {
    if (showAllEvents) {
      // esperar a que el DOM pinte los nuevos elementos
      const timer = setTimeout(() => {
        if (gridRef.current) {
          const rect = gridRef.current.getBoundingClientRect();
            // desplazamos hacia la parte inferior del grid menos un offset para contexto
          const targetY = window.scrollY + rect.bottom - window.innerHeight * 0.9;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showAllEvents]);

  return (
  <section ref={sectionRef} id="eventos" className="py-16 bg-white scroll-mt-24">
      {/* Contenedor full-bleed controlado: usamos w-screen centrado para eliminar márgenes laterales */}
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-4 md:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {showAll ? 'Todos Nuestros Eventos' : 'Próximos Eventos'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {showAll 
              ? 'Descubre todas las actividades y eventos que tenemos programados para ti y tu familia.'
              : 'No te pierdas nuestras próximas actividades y eventos especiales.'
            }
          </p>
        </div>

        {/* Filter Buttons */}
        {showAll && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center space-x-2 ${
                selectedCategory === 'todos'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Todos</span>
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Events Grid */}
  <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {displayEvents.map((event) => (
            <div key={event.id} className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
              {/* Event Image */}
              <div className="relative h-44 md:h-48 lg:h-52 overflow-hidden">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
                    {categoryLabels[event.category]}
                  </span>
                </div>
                {event.isRecurring && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Recurrente
                  </div>
                )}
              </div>

              {/* Event Content - grow para igualar alturas */}
              <div className="flex flex-col p-5 md:p-6 flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-4 text-sm md:text-base">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-1.5 mb-4 text-xs md:text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/eventos/${event.id}`}
                  className="mt-auto w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center font-semibold text-sm md:text-base"
                >
                  Más Información
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {!showAll && filteredEvents.length > 4 && (
          <div className="text-center mt-8">
            {!showAllEvents ? (
              <button
                type="button"
                onClick={handleShowAll}
                className="bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Ver Todos los Eventos</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleShowLess}
                className="bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Mostrar Menos</span>
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {displayEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay eventos en esta categoría
            </h3>
            <p className="text-gray-600">
              Pronto tendremos nuevos eventos. ¡Mantente atento!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}