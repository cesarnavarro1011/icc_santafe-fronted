'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Send, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';

export default function QuieroSaberMas() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interests: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const interestOptions = [
    'Conocer más sobre la fe cristiana',
    'Unirme a un ministerio',
    'Participar en eventos',
    'Recibir consejería espiritual',
    'Bautismo',
    'Grupos pequeños/células',
    'Oración por necesidades específicas',
    'Otro'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar los datos al backend
      // Simulamos una llamada API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En producción, enviar a una API endpoint
      console.log('Datos del formulario:', formData);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="py-16 bg-gray-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-lg shadow-md p-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  ¡Gracias por tu interés!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Hemos recibido tu mensaje y pronto nos pondremos en contacto contigo. 
                  Estamos emocionados de poder acompañarte en tu crecimiento espiritual.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Te llamaremos pronto</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Revisa tu email</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">WhatsApp disponible</span>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="/"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
                  >
                    Volver al Inicio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Queremos Conocerte
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Estamos aquí para acompañarte en tu crecimiento espiritual. Cuéntanos un poco sobre ti 
                y cómo podemos ayudarte en tu caminar con Dios.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulario */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Información Personal */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Información Personal
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre Completo *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo Electrónico *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono (Opcional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Intereses */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        ¿En qué te gustaría participar?
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {interestOptions.map((interest) => (
                          <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.interests.includes(interest)}
                              onChange={() => handleInterestChange(interest)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje (Opcional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Cuéntanos un poco más sobre ti o cualquier pregunta que tengas..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            <span>Enviar Información</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    También Puedes Contactarnos
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Teléfono</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">contacto@iglesiacristiana.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    ¿Primera vez visitando?
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Te damos la más cordial bienvenida. Nuestros servicios dominicales son a las 10:00 AM. 
                    ¡Ven como estés, serás bienvenido!
                  </p>
                  <a
                    href="/eventos"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Ver horarios de servicios →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}