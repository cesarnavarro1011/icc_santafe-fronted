'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Calendar, User, Tag, Search, Filter } from 'lucide-react';

interface Sermon {
  id: string;
  title: string;
  description: string;
  speaker: string;
  date: string;
  videoUrl: string;
  thumbnailUrl: string;
  series?: string;
  tags: string[];
}

// Datos de ejemplo - en producción vendrían del backend
const sermons: Sermon[] = [
  {
    id: '1',
    title: 'El Poder del Amor de Dios',
    description: 'Una reflexión profunda sobre cómo el amor incondicional de Dios transforma nuestras vidas y nos capacita para amar a otros.',
    speaker: 'Pastor Juan Carlos Rodríguez',
    date: '2025-09-29',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '/api/placeholder/400/225',
    series: 'Fundamentos de la Fe',
    tags: ['amor', 'transformación', 'fe']
  },
  {
    id: '2',
    title: 'Caminando en Propósito',
    description: 'Descubre cómo encontrar y vivir el propósito que Dios tiene para tu vida, alineándote con Su voluntad perfecta.',
    speaker: 'Pastora María Elena Sánchez',
    date: '2025-09-22',
    videoUrl: 'https://vimeo.com/123456789',
    thumbnailUrl: '/api/placeholder/400/225',
    series: 'Vida con Propósito',
    tags: ['propósito', 'llamado', 'voluntad de Dios']
  },
  {
    id: '3',
    title: 'La Oración que Transforma',
    description: 'Aprende los principios bíblicos de una vida de oración efectiva que produce cambios reales en tu vida y circunstancias.',
    speaker: 'Pastor David Morales',
    date: '2025-09-15',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '/api/placeholder/400/225',
    series: 'Escuela de Oración',
    tags: ['oración', 'intercesión', 'milagros']
  },
  {
    id: '4',
    title: 'Finanzas Bíblicas: Mayordomía Fiel',
    description: 'Principios bíblicos para manejar nuestras finanzas de manera que honre a Dios y nos lleve a la prosperidad integral.',
    speaker: 'Pastor Carlos Ruiz',
    date: '2025-09-08',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '/api/placeholder/400/225',
    series: 'Mayordomía Cristiana',
    tags: ['finanzas', 'mayordomía', 'bendición']
  },
  {
    id: '5',
    title: 'El Fruto del Espíritu en la Vida Diaria',
    description: 'Cómo manifestar el fruto del Espíritu Santo en nuestras relaciones, trabajo y vida cotidiana.',
    speaker: 'Pastora Ana Ruiz',
    date: '2025-09-01',
    videoUrl: 'https://vimeo.com/123456789',
    thumbnailUrl: '/api/placeholder/400/225',
    series: 'Vida en el Espíritu',
    tags: ['fruto del espíritu', 'carácter', 'santidad']
  },
  {
    id: '6',
    title: 'Evangelismo con Amor y Poder',
    description: 'Estrategias prácticas para compartir el evangelio con efectividad, demostrando el amor de Cristo en acción.',
    speaker: 'Pastor Miguel Torres',
    date: '2025-08-25',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '/api/placeholder/400/225',
    series: 'Alcance y Evangelismo',
    tags: ['evangelismo', 'testimonio', 'alcance']
  }
];

export default function SermonsSection({ showAll = false }: { showAll?: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('todas');
  
  // Obtener series únicas
  const series = [...new Set(sermons.map(sermon => sermon.series).filter(Boolean))];
  
  // Filtrar sermones
  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSeries = selectedSeries === 'todas' || sermon.series === selectedSeries;
    
    return matchesSearch && matchesSeries;
  });

  const displaySermons = showAll ? filteredSermons : filteredSermons.slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getVideoId = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? match[1] : null;
    } else if (url.includes('vimeo.com')) {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {showAll ? 'Todas las Predicaciones' : 'Predicaciones Recientes'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {showAll 
              ? 'Explora nuestra biblioteca completa de enseñanzas bíblicas y encuentra el mensaje que tu corazón necesita escuchar.'
              : 'Alimenta tu alma con la Palabra de Dios a través de nuestras enseñanzas bíblicas más recientes.'
            }
          </p>
        </div>

        {/* Search and Filter Section */}
        {showAll && (
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar predicaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Series Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedSeries('todas')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  selectedSeries === 'todas'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>Todas las Series</span>
              </button>
              {series.map((serie) => (
                <button
                  key={serie}
                  onClick={() => setSelectedSeries(serie!)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                    selectedSeries === serie
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {serie}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displaySermons.map((sermon) => (
            <div key={sermon.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <img
                  src={sermon.thumbnailUrl}
                  alt={sermon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={`/predicaciones/${sermon.id}`}
                    className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </Link>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded-full">
                  <Play className="h-4 w-4" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Series Badge */}
                {sermon.series && (
                  <div className="mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {sermon.series}
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {sermon.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {sermon.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{sermon.speaker}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{formatDate(sermon.date)}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {sermon.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      <Tag className="h-3 w-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/predicaciones/${sermon.id}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center font-medium inline-flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Ver Predicación</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && filteredSermons.length > 6 && (
          <div className="text-center mt-12">
            <Link
              href="/predicaciones"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Ver Todas las Predicaciones</span>
            </Link>
          </div>
        )}

        {/* Empty State */}
        {displaySermons.length === 0 && (
          <div className="text-center py-12">
            <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron predicaciones
            </h3>
            <p className="text-gray-600">
              Intenta con una búsqueda diferente o selecciona otra serie.
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            ¿Te gustaría recibir nuestras predicaciones?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Suscríbete a nuestro canal de YouTube y no te pierdas ninguna enseñanza. 
            También puedes recibir notificaciones por email de nuevas predicaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youtube.com/@iglesiacristiana"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              Suscribirse en YouTube
            </a>
            <Link
              href="/newsletter"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Recibir por Email
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}