'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Users, Clock, Mail, ArrowLeft, HeartHandshake, Sparkles } from 'lucide-react';
import type { Ministry } from '@/types';

// Fuente temporal: reutilizamos el array local hasta que exista backend/API.
// Para evitar duplicar lógica podrías extraer este array a un módulo compartido.
const ministries: Ministry[] = [
  {
    id: '1',
    name: 'Ministerio Infantil',
    description:
      'Espacio donde los niños aprenden sobre el amor de Dios con actividades creativas, dinámicas y enseñanza bíblica adaptada a su edad. Sembramos principios eternos en su corazón.',
    imageUrl: '/api/placeholder/800/500',
    targetAudience: 'Niños de 4 a 12 años',
    schedule: 'Domingos 9:00 AM - 11:00 AM',
    leader: 'Pastora María González',
    contactEmail: 'infantil@iglesiacristiana.com',
    isActive: true,
  },
  {
    id: '2',
    name: 'Ministerio de Jóvenes',
    description:
      'Lugar para que los jóvenes crezcan en su fe, desarrollen liderazgo y encuentren propósito mientras forman amistades centradas en Cristo. En cada reunión buscamos un encuentro transformador con Dios.',
    imageUrl: '/api/placeholder/800/500',
    targetAudience: 'Jóvenes de 13 a 25 años',
    schedule: 'Viernes 7:00 PM - 9:00 PM',
    leader: 'Pastor David Morales',
    contactEmail: 'jovenes@iglesiacristiana.com',
    isActive: true,
  },
  {
    id: '3',
    name: 'Ministerio de Parejas',
    description:
      'Acompañamos a matrimonios y parejas a fortalecer su unidad a través de principios bíblicos, talleres prácticos y tiempos de consejería. Creemos que los hogares sólidos bendicen a la iglesia y a la sociedad.',
    imageUrl: '/api/placeholder/800/500',
    targetAudience: 'Matrimonios y parejas',
    schedule: 'Sábados 6:00 PM - 8:00 PM (2da semana del mes)',
    leader: 'Pastores Carlos y Ana Ruiz',
    contactEmail: 'parejas@iglesiacristiana.com',
    isActive: true,
  },
  {
    id: '4',
    name: 'Ministerio de Damas',
    description:
      'Un espacio donde las mujeres crecen espiritualmente, se animan mutuamente y descubren sus dones para servir a Dios y a la comunidad. Desarrollamos discipulado y mentoría intencional.',
    imageUrl: '/api/placeholder/800/500',
    targetAudience: 'Mujeres de todas las edades',
    schedule: 'Miércoles 7:00 PM - 9:00 PM',
    leader: 'Hermana Patricia López',
    contactEmail: 'damas@iglesiacristiana.com',
    isActive: true,
  },
  {
    id: '5',
    name: 'Ministerio de Adoración',
    description:
      'Equipo que ministra a la congregación guiando momentos de adoración genuina y excelencia musical, preparando corazones para la Palabra y la presencia de Dios.',
    imageUrl: '/api/placeholder/800/500',
    targetAudience: 'Músicos y adoradores',
    schedule: 'Ensayos: Jueves 7:00 PM - 9:00 PM',
    leader: 'Director Musical: Juan Pérez',
    contactEmail: 'adoracion@iglesiacristiana.com',
    isActive: true,
  },
  {
    id: '6',
    name: 'Ministerio de Evangelismo',
    description:
      'Realizamos actividades de alcance, visitas y eventos evangelísticos para compartir el evangelio con amor y poder. Llevamos luz donde hay necesidad.',
    imageUrl: '/api/placeholder/800/500',
    targetAudience: 'Toda la congregación',
    schedule: 'Sábados 10:00 AM - 12:00 PM',
    leader: 'Pastor Miguel Torres',
    contactEmail: 'evangelismo@iglesiacristiana.com',
    isActive: true,
  },
  {
    id: '7',
    name: 'Ministerio de Intercesión',
    description:
      'Equipo dedicado a la oración estratégica y la intercesión continua por la iglesia, la ciudad y las naciones. Creemos en el poder de la oración persistente.',
    imageUrl: '/api/placeholder/800/500',
    targetAudience: 'Intercesores y guerreros de oración',
    schedule: 'Martes 6:00 AM - 7:00 AM y Viernes 9:00 PM - 10:00 PM',
    leader: 'Hermana Rosa Martínez',
    contactEmail: 'intercesion@iglesiacristiana.com',
    isActive: true,
  },
  {
    id: '8',
    name: 'Ministerio de Células',
    description:
      'Modelo de crecimiento a través de grupos pequeños en hogares, donde hay comunión, estudio bíblico, cuidado pastoral y entrenamiento de nuevos líderes.',
    imageUrl: '/api/placeholder/800/500',
    targetAudience: 'Toda la congregación',
    schedule: 'Miércoles 7:30 PM - 9:00 PM (en hogares)',
    leader: 'Pastor Principal',
    contactEmail: 'celulas@iglesiacristiana.com',
    isActive: true,
  },
];

interface PageProps {
  params: { id: string };
}

export default function MinistryDetailPage({ params }: PageProps) {
  const ministry = ministries.find(m => m.id === params.id);

  if (!ministry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image
          src={ministry!.imageUrl}
          alt={ministry!.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-10 pb-6">
          <Link
            href="/ministerios"
            className="inline-flex items-center text-sm text-white/80 hover:text-white transition mb-3"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Ministerios
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">{ministry!.name}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-white/80">
            <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {ministry!.targetAudience}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {ministry!.schedule}</span>
            <span className="inline-flex items-center gap-1"><HeartHandshake className="h-4 w-4" /> Líder: {ministry!.leader}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Descripción</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {ministry!.description}
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-500" /> ¿Por qué existe este ministerio?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Este ministerio nace para responder a una necesidad específica dentro del cuerpo de Cristo y fomentar crecimiento, servicio y formación espiritual. Próximamente añadiremos más información detallada y testimonios.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Oportunidades para Servir</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Apoyo en organización y logística</li>
                <li>Intercesión y acompañamiento</li>
                <li>Enseñanza / facilitación (según perfil)</li>
                <li>Apoyo en eventos especiales</li>
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Información Clave</h3>
              <dl className="space-y-3 text-sm text-gray-700">
                <div>
                  <dt className="font-medium text-gray-900">Audiencia</dt>
                  <dd>{ministry!.targetAudience}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Horario</dt>
                  <dd>{ministry!.schedule}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Líder</dt>
                  <dd>{ministry!.leader}</dd>
                </div>
                {ministry!.contactEmail && (
                  <div>
                    <dt className="font-medium text-gray-900">Contacto</dt>
                    <dd>
                      <a
                        href={`mailto:${ministry!.contactEmail}`}
                        className="text-blue-600 hover:text-blue-700 hover:underline break-all"
                      >
                        {ministry!.contactEmail}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
              <h3 className="text-sm font-semibold mb-2">¿Quieres participar?</h3>
              <p className="text-white/90 text-sm mb-4">Envíanos un correo o acércate a un líder después de la reunión.</p>
              {ministry!.contactEmail && (
                <a
                  href={`mailto:${ministry!.contactEmail}?subject=Quiero participar en ${encodeURIComponent(ministry!.name)}`}
                  className="inline-flex items-center justify-center w-full rounded-full bg-white text-blue-700 font-semibold py-2.5 text-sm hover:bg-blue-50 transition"
                >
                  Escribir Ahora
                </a>
              )}
            </div>

            <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Próximos Pasos</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-600 text-sm">
                <li>Habla con el líder del ministerio</li>
                <li>Participa en una reunión introductoria</li>
                <li>Define un área de servicio</li>
                <li>Comprométete y crece con nosotros</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
