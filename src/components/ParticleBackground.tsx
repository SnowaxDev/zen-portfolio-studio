
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles - significantly fewer on mobile
    const getParticleCount = () => {
      if (isMobile) {
        return Math.min(Math.floor(window.innerWidth / 30), 20);
      }
      return Math.min(Math.floor(window.innerWidth / 10), 100);
    };
    
    const particleCount = getParticleCount();
    const particles: Particle[] = [];
    
    // Use a fixed color scheme now that we don't have theme
    const primaryColor = '221, 83%, 53%'; // Blue color
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `hsla(${primaryColor}, ${Math.random() * 0.4 + 0.1})`,
        vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5),
        vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5)
      });
    }
    
    // Optimize the connection distance for mobile
    const getConnectionDistance = () => isMobile ? 100 : 150;
    const connectionDistance = getConnectionDistance();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Only draw connections on non-mobile or if we have few particles
        if (!isMobile || particleCount < 30) {
          particles.forEach((otherParticle, j) => {
            if (i === j) return;
            
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `hsla(${primaryColor}, ${0.2 * (1 - distance / connectionDistance)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });
    };
    
    // Only start animation if not on mobile or if we allow it
    const animationFrame = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [isMobile]);
  
  // Optionally hide completely for mobile if needed
  // if (isMobile) return null;
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-10 opacity-70"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
