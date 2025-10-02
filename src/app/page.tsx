import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import StatsSection from '@/components/sections/StatsSection';
import EventsSection from '@/components/sections/EventsSection';
import MinistriesSection from '@/components/sections/MinistriesSection';
import SermonsSection from '@/components/sections/SermonsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import Newsletter from '@/components/ui/Newsletter';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <StatsSection />
        <EventsSection />
        <MinistriesSection />
        <SermonsSection />
        <TestimonialsSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
