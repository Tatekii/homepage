"use client";

import { Button } from "@/components/ui/button";
import { motion } from "@/lib/motion";
import { ArrowRight, Code, Globe, DivideIcon as LucideIcon, Server, User } from "lucide-react";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

function TimelineItem({ year, title, description, icon, isLast = false }: TimelineItemProps) {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-6">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-chart-1/20 text-chart-1">
          {icon}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-chart-1/20 mt-2"></div>}
      </div>
      <div className="pb-8">
        <time className="text-sm font-semibold text-chart-1">{year}</time>
        <h3 className="text-xl font-semibold mt-1">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

const timelineData = [
  {
    year: "2020 - Present",
    title: "Senior Software Engineer",
    description: "Lead development efforts for enterprise applications using React, Node.js, and cloud infrastructure.",
    icon: <Code className="w-5 h-5" />,
  },
  {
    year: "2018 - 2020",
    title: "Full Stack Developer",
    description: "Built scalable web applications and RESTful APIs using modern JavaScript frameworks.",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    year: "2015 - 2018",
    title: "Backend Developer",
    description: "Designed and implemented robust backend systems and databases for high-traffic applications.",
    icon: <Server className="w-5 h-5" />,
  },
  {
    year: "2013 - 2015",
    title: "Computer Science Degree",
    description: "Graduated with honors, specializing in software engineering and algorithms.",
    icon: <User className="w-5 h-5" />,
    isLast: true,
  },
];

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="py-20 md:py-32 bg-gradient-to-b from-background to-background/95 relative"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
              <span className="relative">
                About 
                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
                  Me
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-chart-1/50 to-chart-2/50"></span>
              </span>
            </h2>
            
            <div className="space-y-4 text-lg">
              <p>
                I'm a passionate full-stack developer with 8+ years of experience crafting digital solutions that combine technical excellence with beautiful design.
              </p>
              <p>
                My approach blends creative problem-solving with deep technical expertise to build scalable, user-centered applications that deliver exceptional experiences.
              </p>
              <p>
                I specialize in modern JavaScript frameworks, cloud architecture, and building high-performance applications that scale.
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
              <Button
                className="group"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-6">My Journey</h3>
            
            <div className="space-y-2">
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  isLast={item.isLast}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}