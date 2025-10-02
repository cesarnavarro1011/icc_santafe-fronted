import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventsSection from '@/components/sections/EventsSection';
import { SimpleBreadcrumbs } from '@/components/ui/Breadcrumbs';

export default function EventosPage() {
  return (
    <>
      <Header />
      <SimpleBreadcrumbs current="Eventos" />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Eventos y Actividades
              </h1>
              <p className="text-xl md:text-2xl text-purple-100">
                Únete a nosotros en nuestras celebraciones, conferencias y actividades especiales. 
                Cada evento es una oportunidad de crecimiento, comunión y bendición.
              </p>
            </div>
          </div>
        </section>

        <EventsSection showAll={true} />
        
        {/* Calendario Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Calendario Mensual
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <p className="text-gray-600 text-lg">
                  Calendario interactivo próximamente
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}