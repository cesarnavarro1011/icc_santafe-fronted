'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/nosotros', label: 'Quiénes Somos' },
    { href: '/eventos', label: 'Eventos' },
    { href: '/ministerios', label: 'Ministerios' },
    { href: '/predicaciones', label: 'Predicaciones' },
  ];

  const ministries = [
    { href: '/ministerios/ninos', label: 'Ministerio Infantil' },
    { href: '/ministerios/jovenes', label: 'Ministerio de Jóvenes' },
    { href: '/ministerios/parejas', label: 'Ministerio de Parejas' },
    { href: '/ministerios/damas', label: 'Ministerio de Damas' },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y Descripción */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <span className="relative h-12 w-12 rounded-md overflow-hidden ring-1 ring-white/10 shadow-sm shadow-black/30 flex-shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo Iglesia"
                  fill
                  sizes="100px"
                  className="object-cover"
                  priority
                />
              </span>
              <div>
                <h3 className="text-xl font-bold">Iglesa Cuadrangular Santa Fe</h3>
                <p className="text-gray-400 text-sm">Creciendo en número y en conocimiento</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Somos una comunidad cristiana comprometida con el amor de Dios y el servicio al prójimo. 
              Te invitamos a ser parte de nuestra familia en la fe.
            </p>

            {/* Información de Contacto */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">Calle Principal #123, Ciudad, País</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">contacto@iglesiacristiana.com</p>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/contacto"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Ministerios */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ministerios</h4>
            <ul className="space-y-2">
              {ministries.map((ministry) => (
                <li key={ministry.href}>
                  <Link 
                    href={ministry.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {ministry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h5 className="text-lg font-semibold mb-2">Suscríbete a nuestro boletín</h5>
              <p className="text-gray-400">Recibe noticias y actualizaciones de nuestra comunidad</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:w-64"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-200">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Iglesa Cuadrangular Santa Fe. Todos los derechos reservados.
          </p>
            <p className="text-gray-400">
            Created by César Navarro Developer.
          </p>
        </div>
      </div>
    </footer>
  );
}
