
import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';

interface TextWithGlowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  color?: string;
  pulsate?: boolean;
  delay?: number;
  duration?: number;
  hover?: boolean;
  shimmer?: boolean;
  animateOnScroll?: boolean;
  gradient?: boolean;
  gradientColors?: string;
}

const TextWithGlow: React.FC<TextWithGlowProps> = ({
  children,
  className = '',
  intensity = 'medium',
  color = 'rgba(212, 175, 55, 0.8)', // Default gold color
  pulsate = true,
  delay = 0,
  duration = 2,
  hover = true,
  shimmer = false,
  animateOnScroll = false,
  gradient = false,
  gradientColors = 'from-gold to-gold-light',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Set shadow intensity based on prop
  const getShadowIntensity = () => {
    switch (intensity) {
      case 'light': return `0 0 10px ${color}, 0 0 20px ${color}40`;
      case 'strong': return `0 0 12px ${color}, 0 0 24px ${color}, 0 0 36px ${color}60`;
      default: return `0 0 10px ${color}, 0 0 18px ${color}50`;
    }
  };

  // Skip animations for users who prefer reduced motion
  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  // Dynamic text glow variants with customized timing
  const textGlowVariants = {
    initial: {
      textShadow: `0 0 5px ${color}00`
    },
    animate: {
      textShadow: getShadowIntensity(),
      transition: {
        duration: duration,
        repeat: pulsate ? Infinity : 0,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: delay
      }
    },
    hover: hover ? {
      textShadow: intensity === 'strong' 
        ? `0 0 15px ${color}, 0 0 25px ${color}, 0 0 40px ${color}70` 
        : `0 0 15px ${color}, 0 0 25px ${color}60`,
      scale: 1.05,
      transition: { duration: 0.3 }
    } : {}
  };

  // Shimmer styles - fixed to avoid the backgroundSize animation warning
  const shimmerClass = shimmer ? 'shimmer-effect' : '';

  // Combined styles for gradient
  const gradientStyle = gradient ? {
    backgroundImage: `linear-gradient(to right, var(--gold), var(--gold-light))`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } : {};

  // Add gradient class if needed
  const gradientClass = gradient 
    ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` 
    : '';

  return (
    <motion.span
      className={`${className} ${gradientClass} ${shimmerClass}`}
      variants={textGlowVariants}
      initial={animateOnScroll ? "initial" : "animate"}
      animate="animate"
      whileInView={animateOnScroll ? "animate" : undefined}
      viewport={animateOnScroll ? { once: true, margin: "-100px" } : undefined}
      whileHover={hover ? "hover" : undefined}
      style={gradientStyle}
    >
      {children}
      
      {/* Add global style for shimmer effect if needed */}
      {shimmer && (
        <style jsx global>{`
          .shimmer-effect {
            position: relative;
            background-size: 200% 100%;
            background-repeat: no-repeat;
            background-clip: text;
            -webkit-background-clip: text;
            background-image: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
            animation: shimmer 2s infinite linear;
          }
          @keyframes shimmer {
            0% { background-position: -100% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      )}
    </motion.span>
  );
};

export default TextWithGlow;
