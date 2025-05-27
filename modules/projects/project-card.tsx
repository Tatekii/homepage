"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Code, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ProjectData } from "@/modules/projects/types"

export type ProjectCardProps = ProjectData & {
  onShowPreview: (project: ProjectData) => void
}

export function ProjectCard({ 
  title, 
  description, 
  tech, 
  link = "", 
  preview, 
  sourceCode = "",
  onShowPreview
}: ProjectCardProps) {
  const path = "projects/" + preview

  const handleShowPreview = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onShowPreview({ title, description, tech, link, preview, sourceCode })
  }

  return (
    <Card className="bg-card/30 backdrop-blur-sm hover:border-chart-2/50 transition-all shadow-sm hover:shadow-md hover:shadow-chart-2/20 group h-full overflow-hidden">
      {/* Preview Image - Clickable */}
      <div className="relative h-32 w-full overflow-hidden cursor-pointer" onClick={handleShowPreview}>
        <Image
          src={path}
          alt={`${title} - Project by Siyn Ma`}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          priority={false}
        />
      </div>

      {/* Card Content */}
      <CardHeader className="pb-1 pt-3 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-semibold">{title}</CardTitle>

          <div className="links flex gap-1">
            {sourceCode && (
              <Link href={sourceCode} target="_blank" rel="noopener noreferrer" className="block" aria-label={`View source code for ${title}`}>
                <Code className="h-4 w-4 opacity-50 hover:opacity-100 transition-opacity" />
              </Link>
            )}

            {link && (
              <Link href={link} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Visit live demo of ${title}`}>
                <ExternalLink className="h-4 w-4 opacity-50 hover:opacity-100 transition-opacity" />
              </Link>
            )}
          </div>
        </div>
        <CardDescription className="text-xs line-clamp-2">{description}</CardDescription>
      </CardHeader>

      <CardFooter className="px-3 pt-0 pb-3">
        <div className="flex flex-wrap gap-1">
          {tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-[10px] py-0 px-2 bg-gradient-to-r from-chart-1/10 to-chart-2/10 hover:from-chart-1/20 hover:to-chart-2/20 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
