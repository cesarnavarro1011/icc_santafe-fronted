'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle, Gift, Bell, Users } from 'lucide-react';

interface NewsletterProps {
  variant?: 'default' | 'sidebar' | 'footer';
  showBenefits?: boolean;
}

export default function Newsletter({ variant = 'default', showBenefits = true }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const benefits = [
    {
      icon: <Bell className="h-5 w-5" />,
      text: 'Notificaciones de eventos especiales'
    },
    {
      icon: <Gift className="h-5 w-5" />,
      text: 'Contenido exclusivo y recursos'
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: 'Actualizaciones de la comunidad'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
        setName('');
      }, 3000);
    } catch (error) {
      console.error('Error al suscribirse:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variant: Sidebar
  if (variant === 'sidebar') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-4">
          <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Mantente Conectado
          </h3>
          <p className="text-sm text-gray-600">
            Recibe nuestras últimas noticias y actualizaciones
          </p>
        </div>

        {isSubscribed ? (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-green-700 font-medium">¡Suscrito exitosamente!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Suscribirse</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  // Variant: Footer (simple)
  if (variant === 'footer') {
    return (
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h5 className="text-lg font-semibold mb-2">Suscríbete a nuestro boletín</h5>
          <p className="text-gray-400">Recibe noticias y actualizaciones de nuestra comunidad</p>
        </div>
        <div className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:w-64"
          />
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-200"
          >
            Suscribirse
          </button>
        </div>
      </div>
    );
  }

  // Variant: Default (full section)
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="h-16 w-16 mx-auto mb-4 text-blue-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mantente Conectado con Nuestra Comunidad
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Únete a más de 1,000 miembros que reciben nuestras actualizaciones semanales con 
              enseñanzas, eventos especiales y noticias de la iglesia.
            </p>
          </div>

          {showBenefits && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-blue-200 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <p className="text-sm text-blue-100">{benefit.text}</p>
                </div>
              ))}
            </div>
          )}

          {isSubscribed ? (
            <div className="bg-white bg-opacity-20 rounded-lg p-8 backdrop-blur-sm">
              <CheckCircle className="h-16 w-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">¡Bienvenido a la Familia!</h3>
              <p className="text-blue-100">
                Te has suscrito exitosamente. Revisa tu email para confirmar tu suscripción.
              </p>
            </div>
          ) : (
            <div className="bg-white bg-opacity-20 rounded-lg p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 bg-white bg-opacity-90 border border-transparent rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 bg-white bg-opacity-90 border border-transparent rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-white text-blue-600 py-3 px-6 rounded-md font-semibold hover:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-500 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span>Suscribiendo...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Suscribirme al Boletín</span>
                    </>
                  )}
                </button>
              </form>
              
              <p className="text-xs text-blue-200 mt-4">
                No spam. Puedes cancelar tu suscripción en cualquier momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}