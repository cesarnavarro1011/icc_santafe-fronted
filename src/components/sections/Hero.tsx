'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

// Datos de ejemplo - en producción vendrían del backend
const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Bienvenidos a Nuestra Familia',
    subtitle: 'Una comunidad unida en Cristo',
    description: 'Descubre el amor de Dios y forma parte de una familia que crece junta en la fe, esperanza y amor.',
    imageUrl: '/api/placeholder/1200/600', // Placeholder - reemplazar con imagen real
    ctaText: 'Únete a Nosotros',
    ctaLink: '/quiero-saber-mas',
    isActive: true,
  },
  {
    id: '2',
    title: 'Servicios Dominicales',
    subtitle: 'Cada domingo a las 10:00 AM',
    description: 'Acompáñanos en nuestros servicios llenos de adoración, enseñanza bíblica y comunión fraternal.',
    imageUrl: '/api/placeholder/1200/600', // Placeholder - reemplazar con imagen real
    ctaText: 'Ver Horarios',
    ctaLink: '/eventos',
    isActive: true,
  },
  {
    id: '3',
    title: 'Ministerios para Toda la Familia',
    subtitle: 'Creciendo juntos en la fe',
    description: 'Tenemos ministerios especiales para niños, jóvenes, adultos y parejas. Encuentra tu lugar en nuestra comunidad.',
    imageUrl: '/api/placeholder/1200/600', // Placeholder - reemplazar con imagen real
    ctaText: 'Conocer Ministerios',
    ctaLink: '/ministerios',
    isActive: true,
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const activeSlides = heroSlides.filter(slide => slide.isActive);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || activeSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, activeSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % activeSlides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + activeSlides.length) % activeSlides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  if (activeSlides.length === 0) {
    return null;
  }

  const currentSlideData = activeSlides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentSlideData.imageUrl}
          alt={currentSlideData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-blue-200 uppercase tracking-wide">
          {currentSlideData.subtitle}
        </h2>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {currentSlideData.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          {currentSlideData.description}
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={currentSlideData.ctaLink}
            className="px-8 py-3 rounded-full font-semibold bg-[#f5cc00] text-black shadow-lg hover:shadow-xl hover:bg-[#0E34A0] hover:text-white transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f5cc00]/60"
          >
            {currentSlideData.ctaText}
          </Link>
          <Link
            href="/predicaciones"
            className="flex items-center space-x-2 px-6 py-3 rounded-full font-semibold bg-[#f5cc00] text-black shadow-lg hover:shadow-xl hover:bg-[#0E34A0] hover:text-white transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#f5cc00]/60"
          >
            <Play className="h-5 w-5" />
            <span>Ver Predicaciones</span>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {activeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}