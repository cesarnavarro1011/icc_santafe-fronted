'use client';

import { useState, useEffect, useRef } from 'react';
import { Users, Calendar, Heart, Award, Church, Book, Hand, Globe } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: number;
  icon: React.ReactNode;
  suffix?: string;
  prefix?: string;
  color: string;
}

const stats: Stat[] = [
  {
    id: 'members',
    label: 'Miembros Activos',
    value: 850,
    icon: <Users className="h-8 w-8" />,
    suffix: '+',
    color: 'text-blue-600'
  },
  {
    id: 'years',
    label: 'Años de Ministerio',
    value: 25,
    icon: <Church className="h-8 w-8" />,
    color: 'text-green-600'
  },
  {
    id: 'ministries',
    label: 'Ministerios Activos',
    value: 12,
    icon: <Heart className="h-8 w-8" />,
    color: 'text-red-600'
  },
  {
    id: 'events',
    label: 'Eventos Anuales',
    value: 150,
    icon: <Calendar className="h-8 w-8" />,
    suffix: '+',
    color: 'text-purple-600'
  },
  {
    id: 'baptisms',
    label: 'Bautismos este Año',
    value: 45,
    icon: <Award className="h-8 w-8" />,
    color: 'text-indigo-600'
  },
  {
    id: 'sermons',
    label: 'Predicaciones Online',
    value: 200,
    icon: <Book className="h-8 w-8" />,
    suffix: '+',
    color: 'text-yellow-600'
  },
  {
    id: 'volunteers',
    label: 'Voluntarios Activos',
    value: 120,
    icon: <Hand className="h-8 w-8" />,
    color: 'text-teal-600'
  },
  {
    id: 'missions',
    label: 'Misiones Apoyadas',
    value: 8,
    icon: <Globe className="h-8 w-8" />,
    color: 'text-orange-600'
  }
];

// Hook personalizado para animación de números
function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!shouldStart || hasStarted) return;

    setHasStarted(true);
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function para una animación más suave
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(end * easeOutQuad));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart, hasStarted]);

  return count;
}

// Componente para cada estadística individual
function StatCard({ stat, inView }: { stat: Stat; inView: boolean }) {
  const animatedValue = useCountUp(stat.value, 2500, inView);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className={`${stat.color} mb-4 flex justify-center`}>
        {stat.icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {stat.prefix}
        {inView ? animatedValue.toLocaleString() : 0}
        {stat.suffix}
      </div>
      <div className="text-gray-600 font-medium">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [inView]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestra Comunidad en Números
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cada número representa vidas transformadas, familias bendecidas y un testimonio 
            del amor de Dios obrando en nuestra comunidad a lo largo de los años.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} inView={inView} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-700">
                <strong>Financiamiento Local</strong>
                <p className="text-sm mt-1">Sostenidos completamente por las ofrendas de nuestra congregación</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-4xl font-bold text-green-600">24/7</div>
              <div className="text-gray-700">
                <strong>Cobertura de Oración</strong>
                <p className="text-sm mt-1">Cadena de oración continua por las necesidades de la comunidad</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-4xl font-bold text-purple-600">5★</div>
              <div className="text-gray-700">
                <strong>Satisfacción</strong>
                <p className="text-sm mt-1">Calificación promedio en testimonios de crecimiento espiritual</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Te gustaría ser parte de esta historia?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Cada estadística representa personas reales con historias reales de transformación. 
            Te invitamos a ser parte de esta familia que crece y sirve junta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quiero-saber-mas"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Únete a Nosotros
            </a>
            <a
              href="/nosotros"
              className="bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200 inline-block"
            >
              Conoce Nuestra Historia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}