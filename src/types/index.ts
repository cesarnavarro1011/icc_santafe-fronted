// Tipos de datos para la aplicación

export interface Hero {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

export interface AboutSection {
  id: string;
  vision: string;
  mission: string;
  values: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  imageUrl?: string;
  isRecurring: boolean;
  category: 'servicio' | 'evento-especial' | 'ministerio' | 'conferencia';
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  targetAudience: string;
  schedule: string;
  leader: string;
  contactEmail?: string;
  isActive: boolean;
}

export interface Sermon {
  id: string;
  title: string;
  description: string;
  speaker: string;
  date: Date;
  videoUrl: string; // YouTube or Vimeo URL
  audioUrl?: string;
  thumbnailUrl?: string;
  series?: string;
  tags: string[];
}

export interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: 'hero-cta' | 'contact-form' | 'newsletter' | 'event-registration';
  createdAt: Date;
  status: 'nuevo' | 'contactado' | 'seguimiento' | 'convertido';
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  subscribedAt: Date;
}

// Tipos para el dashboard privado
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pastor' | 'lider' | 'miembro';
  isActive: boolean;
}

export interface DashboardStats {
  totalMembers: number;
  activeMinistries: number;
  upcomingEvents: number;
  recentLeads: number;
  newsletterSubscribers: number;
}