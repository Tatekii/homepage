"use client";

import { useEffect, useRef } from "react";
import { motion } from "@/lib/motion";

// Define skill categories and items
const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "CSS/SASS", level: 90 },
      { name: "Tailwind", level: 95 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "GraphQL", level: 75 },
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    category: "Other",
    items: [
      { name: "Git", level: 90 },
      { name: "AWS", level: 75 },
      { name: "Docker", level: 70 },
      { name: "CI/CD", level: 80 },
      { name: "Testing", level: 75 },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
}

function SkillBar({ name, level, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.1 }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-chart-1 to-chart-2"
        ></motion.div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let hue = 0;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawCircle = (x: number, y: number, radius: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    class Node {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `hsla(${Math.random() * 60 + 180}, 100%, 50%, 0.5)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        drawCircle(this.x, this.y, this.radius, this.color);
      }
    }

    let nodes: Node[] = [];
    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.floor(canvas.width * canvas.height / 15000);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }
    };

    const connectNodes = () => {
      const maxDistance = 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            const color = `rgba(127, 255, 212, ${opacity * 0.5})`;
            drawLine(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, color);
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();
      }
      
      connectNodes();
      hue += 0.5;
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    initNodes();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 opacity-30"
      />
      
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
                Technical 
                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
                  Skills
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-chart-1/50 to-chart-2/50"></span>
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A collection of technologies and tools I've mastered over the years, allowing me to build comprehensive solutions.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-chart-2/50 transition-colors shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
                {category.category}
              </h3>
              
              <div>
                {category.items.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}