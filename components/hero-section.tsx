"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = this.getColor();
      }

      getColor() {
        const colors = [
          'rgba(255, 85, 85, 0.7)',   // Red
          'rgba(85, 85, 255, 0.7)',   // Blue
          'rgba(85, 255, 255, 0.7)',  // Cyan
          'rgba(255, 85, 255, 0.7)',  // Magenta
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      const particleCount = Math.min(window.innerWidth / 10, 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 opacity-50"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h2 className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-chart-1/20 to-chart-2/20 text-foreground">
              Full-Stack Developer
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="relative">
              <span className="relative z-10">Building digital</span>
              <span className={cn(
                "absolute -left-1 bottom-0 right-0 h-4 bg-gradient-to-r from-chart-1/30 to-chart-2/30 -z-10",
                "dark:from-chart-1/20 dark:to-chart-2/20"
              )}></span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
              experiences that pulse
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            Creating immersive, interactive web applications with cutting-edge technologies and design principles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-1/90 hover:to-chart-2/90 text-white"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-chart-2/50 hover:border-chart-2"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
          <span className="block w-1 h-2 bg-chart-2 rounded-full animate-bounce mt-1"></span>
        </div>
      </div>
    </section>
  );
}