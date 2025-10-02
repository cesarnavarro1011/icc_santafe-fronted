'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

// Datos de ejemplo
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    role: 'Miembro desde 2018',
    content: 'Esta iglesia se ha convertido en mi segunda familia. El amor y la calidez de la comunidad me han ayudado a crecer espiritualmente de maneras que nunca imaginé posibles.',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'Líder de Jóvenes',
    content: 'Llegué aquí buscando respuestas y encontré una comunidad que me abrazo tal como era. Los ministerios me han permitido servir y descubrir mi propósito en Cristo.',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: '3',
    name: 'Ana y Pedro Martín',
    role: 'Matrimonio participante',
    content: 'El ministerio de parejas transformó nuestro matrimonio. Las enseñanzas prácticas y el apoyo de otros matrimonios nos ayudaron a fortalecer nuestra relación.',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: '4',
    name: 'José Luis Torres',
    role: 'Nuevo miembro',
    content: 'Como alguien que recién conocía sobre la fe cristiana, me sorprendió lo acogedor y paciente que fue todo el equipo pastoral para responder mis preguntas.',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: '5',
    name: 'Isabella Morales',
    role: 'Ministerio de Damas',
    content: 'En el ministerio de damas encontré hermanas que me apoyan en oración y me animan constantemente. Es un espacio de crecimiento y amistad genuina.',
    rating: 5,
    image: '/api/placeholder/80/80'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Historias que Inspiran
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escucha las experiencias de quienes han encontrado en nuestra comunidad 
            un lugar para crecer, servir y experimentar el amor de Dios.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 relative">
            <Quote className="h-12 w-12 text-blue-200 absolute top-6 left-6" />
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              
              <blockquote className="text-lg md:text-xl text-gray-700 text-center mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                {testimonials[currentIndex].image && (
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-600 hover:text-blue-600"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Grid of Mini Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-center mb-3">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                )}
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-xs text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-2">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Te gustaría ser parte de estas historias?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Cada testimonio comienza con un primer paso. Te invitamos a visitarnos 
            y descubrir cómo Dios puede transformar tu historia también.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quiero-saber-mas"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Quiero Conocer Más
            </a>
            <a
              href="/eventos"
              className="bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200 inline-block"
            >
              Ver Próximos Eventos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}