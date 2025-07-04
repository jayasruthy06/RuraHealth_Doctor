import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-primary/50">
        <CardHeader>
          <CardDescription className="text-gray-800 font-nubito font-bold">Pending Consultations</CardDescription>
          <CardTitle className="text-2xl font-nubito font-bold tabular-nums @[250px]/card:text-3xl">
            10
          </CardTitle>
          
        </CardHeader>
        
      </Card>
      <Card className="@container/card bg-primary/50">
        <CardHeader>
          <CardDescription className="text-gray-800 font-nubito font-bold">Average Consultations Per Week</CardDescription>
          <CardTitle className="text-2xl font-nubito font-bold tabular-nums @[250px]/card:text-3xl">
            30
          </CardTitle>
          
        </CardHeader>
        
      </Card>
      
    </div>
  );
}
