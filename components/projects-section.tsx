"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Project data
const projects = [
  {
    id: 1,
    title: "Rhythm - Music Streaming App",
    description: "A modern music streaming platform with personalized recommendations and social features.",
    image: "https://images.pexels.com/photos/4722567/pexels-photo-4722567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "Node.js", "MongoDB", "Redux"],
    category: "fullstack",
    demo: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "DevConnect - Developer Network",
    description: "Professional network for developers to showcase projects and connect with peers.",
    image: "https://images.pexels.com/photos/34600/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    category: "frontend",
    demo: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Pulse - Analytics Dashboard",
    description: "Real-time analytics dashboard for monitoring business metrics and user engagement.",
    image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "D3.js", "Express", "PostgreSQL"],
    category: "fullstack",
    demo: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 4,
    title: "NexGen API Platform",
    description: "Scalable API platform that enables developers to build and deploy APIs quickly.",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Node.js", "GraphQL", "Docker", "MongoDB"],
    category: "backend",
    demo: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 5,
    title: "CodeCanvas - IDE",
    description: "Browser-based code editor with live collaboration and integrated debugging tools.",
    image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "WebSockets", "CodeMirror", "Firebase"],
    category: "fullstack",
    demo: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 6,
    title: "TechBlog CMS",
    description: "Content management system designed specifically for technical blogs and documentation.",
    image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Next.js", "MDX", "TailwindCSS", "Vercel"],
    category: "frontend",
    demo: "https://example.com",
    github: "https://github.com",
  },
];

// Filter categories
const categories = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-chart-2/50 transition-all duration-300 shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="gap-1" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            </Button>
            <Button size="sm" variant="outline" className="gap-1" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span>Code</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-chart-2 transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-primary/5 hover:bg-primary/10"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section 
      id="projects"
      className="py-20 md:py-32 bg-gradient-to-b from-background to-background/95 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
              <span className="relative">
                Featured
                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
                  Projects
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-chart-1/50 to-chart-2/50"></span>
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A selection of projects that showcase my expertise and problem-solving abilities.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "transition-all duration-300",
                  activeCategory === category.id && "bg-gradient-to-r from-chart-1 to-chart-2 border-none"
                )}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="group border-chart-2/50"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View More on GitHub
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}