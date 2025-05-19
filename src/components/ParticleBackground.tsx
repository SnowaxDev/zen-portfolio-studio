
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { useMobileAnimationSettings } from '../hooks/use-mobile-animation-settings';

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
  const { shouldReduceAnimations } = useMobileAnimationSettings();
  const isMobile = useIsMobile();
  
  // If we should reduce animations (mobile or reduced motion), don't render this component
  if (shouldReduceAnimations) return null;
  
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
    
    // Create particles - significantly fewer particles overall
    const getParticleCount = () => {
      return Math.min(Math.floor(window.innerWidth / 40), 15);
    };
    
    const particleCount = getParticleCount();
    const particles: Particle[] = [];
    
    // Use a fixed color scheme now that we don't have theme
    const primaryColor = '221, 83%, 53%'; // Blue color
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5, // Smaller particles
        color: `hsla(${primaryColor}, ${Math.random() * 0.3 + 0.05})`, // Lower opacity
        vx: (Math.random() - 0.5) * 0.2, // Slower movement
        vy: (Math.random() - 0.5) * 0.2  // Slower movement
      });
    }
    
    // Reduce the connection distance
    const connectionDistance = 80;
    
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
        
        // Draw fewer connections
        if (i % 2 === 0) {
          particles.forEach((otherParticle, j) => {
            if (i === j || j % 2 !== 0) return;
            
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `hsla(${primaryColor}, ${0.1 * (1 - distance / connectionDistance)})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          });
        }
      });
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-10 opacity-50"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
