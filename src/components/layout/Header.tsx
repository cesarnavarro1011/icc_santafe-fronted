'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Church } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(o => !o);

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Quiénes Somos' },
    { href: '/eventos', label: 'Eventos' },
    { href: '/ministerios', label: 'Ministerios' },
    { href: '/predicaciones', label: 'Predicaciones' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const baseHeaderClasses = 'fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-saturate-150';
  const stateHeaderClasses = scrolled
    ? 'bg-[#0b0b0d]/90 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/10'
    : 'bg-gradient-to-b from-[#1a0000]/90 via-[#000000FF]/40 to-transparent backdrop-blur-sm';

  return (
    <header className={`${baseHeaderClasses} ${stateHeaderClasses}`}>
      {/* Línea de acento superior */}
  <div className="h-0.5 w-full bg-gradient-to-r from-[#710000] via-[#5a189a] to-[#0E34A0] opacity-80" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-3 md:py-4 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="relative flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-[#710000] via-[#5a189a] to-[#0E34A0] text-white shadow-md shadow-[#710000]/40 ring-1 ring-white/10 group-hover:scale-105 transition-transform">
              <Church className="h-6 w-6" />
            </span>
            <div className="leading-tight">
              <h1 className="text-base md:text-lg font-bold text-white tracking-tight">I.C.C. Santa Fe</h1>
              <p className="text-[10px] md:text-[11px] uppercase tracking-wide font-medium bg-gradient-to-r from-[#8000FFFF] via-[#0041F3FF]  via-[#FF0000FF] to-[#F4CB00FF]  bg-clip-text text-transparent">Creciendo en número y en conocimiento</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map(item => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-colors duration-200 text-sm tracking-wide ${active ? 'text-white' : 'text-gray-300 hover:text-[#f5cc00]'}`}
                >
                  <span className="px-0.5 py-2 inline-block">{item.label}</span>
                  <span
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#5a189a] via-[#0E34A0]  via-[#710000] to-[#f5cc00] transition-all duration-300 ${active ? 'w-8' : 'group-hover:w-8'} `}
                  />
                </Link>
              );
            })}
          </nav>

            {/* CTA Button Desktop */}
          <div className="hidden lg:block">
            <Link
              href="/quiero-saber-mas"
              className="relative inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold bg-[#FFFFFFFF] text-[#000000FF] shadow-md shadow-black/30 ring-1 ring-[#f5cc00]/30 hover:shadow-lg hover:shadow-black/50 hover:bg-[#f5cc00] hover:text-[#FFFFFFFF] focus:outline-none focus:ring-2 focus:ring-[#0E34A0]/60 transition"
            >
              <span className="relative">Quiero Saber Más</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}  
          <button
            onClick={toggleMenu}
            aria-label="Abrir menú"
            className="lg:hidden p-2 rounded-md text-gray-200 hover:text-[#f5cc00] hover:bg-white/5 transition"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation (overlay) */}
      <div
  className={`lg:hidden transition-all duration-300 origin-top ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'} bg-[#0b0b0d]/95 backdrop-blur-xl border-t border-white/10`}
      >
        <nav className="px-6 py-6 flex flex-col gap-2">
          {menuItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-md px-4 py-2.5 text-sm font-medium transition flex items-center justify-between ${active ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-[#f5cc00] hover:bg-white/5'}`}
              >
                {item.label}
                {active && <span className="ml-3 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />}
              </Link>
            );
          })}
          <Link
            href="/quiero-saber-mas"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 relative inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#710000] via-[#5a189a] to-[#0E34A0] shadow-md shadow-black/30 ring-1 ring-white/10 hover:shadow-lg hover:shadow-black/50"
          >
            Quiero Saber Más
          </Link>
        </nav>
      </div>
    </header>
  );
}
