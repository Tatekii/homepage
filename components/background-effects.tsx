"use client";

import { useEffect, useRef } from "react";

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      radius: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.radius = Math.random() * 1.5 + 0.5;
        this.density = Math.random() * 30 + 1;
        this.color = this.getColor();
      }
      
      getColor() {
        const colors = [
          'rgba(32, 156, 238, 0.5)',  // Blue
          'rgba(144, 64, 255, 0.5)',  // Purple
          'rgba(0, 214, 214, 0.5)',   // Cyan
          'rgba(255, 64, 129, 0.5)',  // Pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
      
      update(mouseX: number, mouseY: number) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          const moveX = directionX * force * this.density;
          const moveY = directionY * force * this.density;
          
          this.x -= moveX;
          this.y -= moveY;
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }
    
    // Create particle array
    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 150);
      
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.x;
      mouseY = e.y;
    };
    
    // Animation loop
    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY);
        particles[i].draw();
      }
      
      // Connect particles with lines
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Connect particles with lines
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(120, 120, 255, ${0.2 - (distance / 100) * 0.2})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
    };
    
    // Initialize
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    initParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 opacity-40"
    />
  );
}