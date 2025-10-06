import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutSection from '@/components/sections/AboutSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { SimpleBreadcrumbs } from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <SimpleBreadcrumbs current="Quiénes Somos" />
      <main>
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden text-white py-24 md:py-28">
          {/* Imagen de fondo */}
          <Image 
            src="/images/hero1.jpg" 
            alt="Nuestra congregación" 
            fill 
            priority
            className="object-cover object-center absolute inset-0 -z-20" 
          />
          {/* Capa degradado oscura para legibilidad */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          {/* Decoración ligera (blur) */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl -z-10" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-700/30 blur-3xl -z-10" />
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block mb-4 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1 text-xs font-semibold tracking-wider uppercase">Quiénes Somos</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Nuestra Historia, <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">Nuestra Fe</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-200/90 leading-relaxed">
                Conoce más sobre quiénes somos, qué creemos y cómo Dios nos ha guiado a lo largo de estos años de ministerio y servicio a la comunidad.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#historia" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-white text-gray-900 shadow-md shadow-black/30 hover:shadow-lg hover:bg-blue-50 transition">
                  Ver Historia
                </a>
                <a href="#equipo" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-black/30 transition">
                  Nuestro Equipo
                </a>
              </div>
            </div>
          </div>
        </section>

        <AboutSection />
        <StatsSection />
        
        {/* Historia Section */}
  <section id="historia" className="py-16 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Nuestra Historia
              </h2>
              
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Los Primeros Años (1999-2005)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nuestra iglesia comenzó como un pequeño grupo de familias que se reunían en hogares, 
                      con el sueño de crear una comunidad donde las personas pudieran experimentar el amor 
                      incondicional de Dios. Con apenas 15 miembros, empezamos nuestro caminar de fe.
                    </p>
                  </div>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-600">Imagen histórica - Primeros años</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center md:order-1">
                    <p className="text-gray-600">Imagen - Primer templo</p>
                  </div>
                  <div className="md:order-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Crecimiento y Expansión (2005-2015)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      En 2005 adquirimos nuestro primer templo y comenzamos a desarrollar ministerios 
                      especializados. La congregación creció a más de 200 miembros activos y establecimos 
                      programas para niños, jóvenes y familias.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ministerio Integral (2015-Presente)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Hoy somos una iglesia de más de 800 miembros con 12 ministerios activos, 
                      programas de alcance comunitario y una visión misionera que nos lleva a 
                      impactar no solo nuestra ciudad, sino también otras naciones.
                    </p>
                  </div>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-600">Imagen actual - Congregación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
  <section id="equipo" className="py-16 bg-gray-50 scroll-mt-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Nuestro Equipo Pastoral
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Pastor Principal */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <p className="text-gray-600">Foto Pastor Principal</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Pastor Juan Carlos Rodríguez
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">Pastor Principal</p>
                  <p className="text-gray-600 text-sm">
                    Con más de 20 años de experiencia pastoral, lidera nuestra congregación 
                    con sabiduría, amor y una visión clara del propósito de Dios para la iglesia.
                  </p>
                </div>
              </div>

              {/* Pastora Asociada */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <p className="text-gray-600">Foto Pastora Asociada</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Pastora María Elena Sánchez
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">Pastora Asociada</p>
                  <p className="text-gray-600 text-sm">
                    Especializada en ministerios familiares y consejería, aporta su corazón 
                    pastoral y experiencia en el cuidado integral de las familias.
                  </p>
                </div>
              </div>

              {/* Pastor de Jóvenes */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <p className="text-gray-600">Foto Pastor Jóvenes</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Pastor David Morales
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">Pastor de Jóvenes</p>
                  <p className="text-gray-600 text-sm">
                    Apasionado por el ministerio juvenil, trabaja incansablemente para 
                    guiar a la próxima generación en su crecimiento espiritual y liderazgo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}