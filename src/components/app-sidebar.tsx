"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Ptr. Nando Rincón",
    email: "pastoral@iccsantafe.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Pastoral",
      url: "#",
      icon: SquareTerminal, 
      isActive: true, 
      items: [
        {
          title: "Aprobación de Cursos",
          url: "#",
        },
        {
          title: "Creación de Cursos",
          url: "#",
        },
        {
          title: "Cronograma de eventos",
          url: "#",
        },
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Ingresos y egresos",
          url: "#",
        },
        {
          title: "Miembros",
          url: "#",
        },
        {
          title: "visitas",
          url: "#",
        },
        {
          title: "Peticiones Recibidas",
          url: "#",
        },
        {
          title: "Permisos y Roles",
          url: "#",
        },
      ],
    },
    {
      title: "Lideres",
      url: "#",
      icon: SquareTerminal, 
      isActive: true, 
      items: [
        {
          title: "Cronograma de eventos",
          url: "#",
        },
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Ofrendas",
          url: "#",
        },
        {
          title: "Miembros",
          url: "#",
        },
        {
          title: "Seguimiento de visitas",
          url: "#",
        },
        {
          title: "Peticiones Recibidas",
          url: "#",
        },
      ],
    },
    {
      title: "Gestores de Contenido",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Portafolio Web",
          url: "#",
        },
      ],
    },
    {
      title: "Profesores",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Estudiantes",
          url: "#",
        },
        {
          title: "Tareas",
          url: "#",
        },
        {
          title: "Examenes",
          url: "#",
        },
      ],
    },
    {
      title: "Cursos Bíblicos",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Vida Abudante",
          url: "#",
        },
        {
          title: "Discipulado",
          url: "#",
        },
        {
          title: "Instituto Bíblico",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
