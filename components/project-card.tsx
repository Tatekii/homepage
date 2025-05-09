import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  link: string
}

export function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="block">
      <Card
        className="bg-card/30 backdrop-blur-sm hover:border-chart-2/50 transition-all shadow-sm hover:shadow-md hover:shadow-chart-2/20 group h-full"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {tech.map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 hover:from-chart-1/20 hover:to-chart-2/20 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}