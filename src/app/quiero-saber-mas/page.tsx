'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  Facebook,
  Instagram,
  Youtube,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general' // general, prayer, counseling, event
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactReasons = [
    { value: 'general', label: 'Consulta General' },
    { value: 'prayer', label: 'Petición de Oración' },
    { value: 'counseling', label: 'Consejería Espiritual' },
    { value: 'event', label: 'Información sobre Eventos' },
    { value: 'ministry', label: 'Unirse a un Ministerio' },
    { value: 'visit', label: 'Primera Visita' }
  ];

  const schedules = [
    { day: 'Domingos', times: '10:00 AM - Servicio Principal\n9:00 AM - Escuela Dominical' },
    { day: 'Miércoles', times: '7:00 PM - Reunión de Oración\n7:00 PM - Ministerio de Damas' },
    { day: 'Viernes', times: '7:00 PM - Ministerio de Jóvenes' },
    { day: 'Sábados', times: '6:00 PM - Ministerio de Parejas (2da semana)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar los datos al backend
      await new Promise(resolve => setTimeout(resolve, 2000));
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
                  ¡Mensaje Enviado!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
                </p>
                  <Link
                    href="/"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
                  >
                    Volver al Inicio
                  </Link>
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
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Estamos Aquí Para Ti
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                No dudes en contactarnos. Estaremos encantados de responder tus preguntas y acompañarte en tu crecimiento espiritual.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Envíanos un Mensaje
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
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
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                          Motivo de Contacto
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {contactReasons.map((reason) => (
                            <option key={reason.value} value={reason.value}>
                              {reason.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Asunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Breve descripción del tema"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Escribe tu mensaje aquí..."
                      />
                    </div>

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
                          <span>Enviar Mensaje</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-6">
                
                {/* Contact Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Información de Contacto
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Dirección</p>
                        <p className="text-gray-600">Calle Principal #123<br />Ciudad, Estado, CP 12345<br />País</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Teléfono</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">contacto@iglesiacristiana.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedules */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    Horarios de Servicio
                  </h3>
                  <div className="space-y-3">
                    {schedules.map((schedule, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-3">
                        <p className="font-medium text-gray-900">{schedule.day}</p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{schedule.times}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Síguenos en Redes Sociales
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="text-pink-600 hover:text-pink-800 transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="YouTube"
                    >
                      <Youtube className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-800 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="h-6 w-6" />
                    </a>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-semibold text-red-900 mb-2">
                    Emergencias Pastorales
                  </h4>
                  <p className="text-red-700 text-sm mb-3">
                    Para situaciones urgentes fuera de horario de oficina.
                  </p>
                  <p className="text-red-800 font-medium">+1 (555) 999-0000</p>
                  <p className="text-red-700 text-xs mt-1">24/7 - Solo emergencias</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Cómo Llegar
            </h2>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              {/* Aquí iría el componente de Google Maps */}
              <div className="text-center text-gray-600">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Mapa interactivo próximamente</p>
                <p className="text-sm">Calle Principal #123, Ciudad</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}