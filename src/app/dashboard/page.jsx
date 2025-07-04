import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import ConsultationTickets from "@/components/consultation-dashboard"

export const metadata = {
  title: "RuraHealth - Doctor | Dashboard"
}
export default function Page() {
  return (
    <>
          <h3 className="font-nubito text-primary text-6xl ml-6 mt-8 font-bold">Welcome!</h3>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
            </div>
            <div className="p-10">
              <ConsultationTickets/>
            </div>
      </>
  );
}
