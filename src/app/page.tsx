import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import EventsSection from '@/components/sections/EventsSection';
import MinistriesSection from '@/components/sections/MinistriesSection';
import SermonsSection from '@/components/sections/SermonsSection';
import Newsletter from '@/components/ui/Newsletter';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EventsSection />
        <SermonsSection />
        <MinistriesSection />
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </>
  );
}
