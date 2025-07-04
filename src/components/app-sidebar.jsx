"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  BookPlus,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  History,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import DoctorPfp from "../../public/DoctorPfp.jpeg"
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
    name: "Doctor",
    email: "doctor@example.com",
    avatar: DoctorPfp
  },
  
  navMain: [
    {
      title: "View Consultations",
      icon: BookPlus,
      url: "/dashboard/consultations"
    },
    {
      title: "Previous Consultations",
      icon: History,
      url: "/dashboard/previous-consultations"
    },
    {
      title: "Profile",
      icon: User,
      url: "/dashboard/profile"
    }
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      
      <SidebarContent>
        <NavMain items={data.navMain} /> 
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
