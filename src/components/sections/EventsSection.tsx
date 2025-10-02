'use client';

import { useState } from 'react';
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
  category: 'servicio' | 'evento-especial' | 'ministerio' | 'conferencia';
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
    imageUrl: '/api/placeholder/400/250',
    isRecurring: true,
    category: 'servicio'
  },
  {
    id: '2',
    title: 'Conferencia de Jóvenes 2025',
    description: 'Un encuentro especial para jóvenes con música, predicación y actividades dinámicas.',
    date: '2025-10-15',
    time: '7:00 PM',
    location: 'Auditorio Central',
    imageUrl: '/api/placeholder/400/250',
    isRecurring: false,
    category: 'conferencia'
  },
  {
    id: '3',
    title: 'Retiro de Parejas',
    description: 'Un fin de semana para fortalecer el matrimonio y las relaciones de pareja.',
    date: '2025-10-20',
    time: '6:00 PM',
    location: 'Centro de Retiros Monte Sión',
    imageUrl: '/api/placeholder/400/250',
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
    imageUrl: '/api/placeholder/400/250',
    isRecurring: false,
    category: 'evento-especial'
  },
  {
    id: '6',
    title: 'Escuela Dominical Infantil',
    description: 'Enseñanza bíblica especialmente diseñada para niños de 4 a 12 años.',
    date: '2025-10-05',
    time: '9:00 AM',
    location: 'Aulas Infantiles',
    imageUrl: '/api/placeholder/400/250',
    isRecurring: true,
    category: 'ministerio'
  }
];

const categoryLabels = {
  servicio: 'Servicio',
  'evento-especial': 'Evento Especial',
  ministerio: 'Ministerio',
  conferencia: 'Conferencia'
};

const categoryColors = {
  servicio: 'bg-blue-100 text-blue-800',
  'evento-especial': 'bg-purple-100 text-purple-800',
  ministerio: 'bg-green-100 text-green-800',
  conferencia: 'bg-red-100 text-red-800'
};

export default function EventsSection({ showAll = false }: { showAll?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  
  const filteredEvents = events.filter(event => 
    selectedCategory === 'todos' || event.category === selectedCategory
  );

  const displayEvents = showAll ? filteredEvents : filteredEvents.slice(0, 4);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Event Image */}
              <div className="relative h-48">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
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

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/eventos/${event.id}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center font-medium inline-block"
                >
                  Más Información
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && filteredEvents.length > 4 && (
          <div className="text-center mt-8">
            <Link
              href="/eventos"
              className="bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Ver Todos los Eventos</span>
            </Link>
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