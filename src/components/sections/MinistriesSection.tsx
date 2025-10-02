'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, Clock, Mail, ChevronRight } from 'lucide-react';

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
  const activeMinistries = ministries.filter(ministry => ministry.isActive);
  const displayMinistries = showAll ? activeMinistries : activeMinistries.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMinistries.map((ministry) => (
            <div key={ministry.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Ministry Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={ministry.imageUrl}
                  alt={ministry.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>

              {/* Ministry Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {ministry.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {ministry.description}
                </p>

                {/* Ministry Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span>{ministry.targetAudience}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span>{ministry.schedule}</span>
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Líder: {ministry.leader}</span>
                  </div>
                  {ministry.contactEmail && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                      <a 
                        href={`mailto:${ministry.contactEmail}`}
                        className="text-blue-600 hover:underline"
                      >
                        {ministry.contactEmail}
                      </a>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/ministerios/${ministry.id}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center font-medium inline-flex items-center justify-center space-x-2 group"
                >
                  <span>Más Información</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && activeMinistries.length > 6 && (
          <div className="text-center mt-12">
            <Link
              href="/ministerios"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Ver Todos los Ministerios</span>
            </Link>
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