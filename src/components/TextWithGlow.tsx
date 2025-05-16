
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

  // Shimmering gradient style
  const shimmerStyles = shimmer ? {
    backgroundImage: `linear-gradient(90deg, ${color}00 0%, ${color}60 50%, ${color}00 100%)`,
    backgroundSize: '200% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'shimmer 2s infinite linear',
  } : {};

  // Combined styles
  const combinedStyles = {
    ...(shimmer ? shimmerStyles : {}),
    ...(gradient ? {
      backgroundImage: `linear-gradient(to right, var(--gold), var(--gold-light))`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    } : {})
  };

  // Add gradient class if needed
  const gradientClass = gradient 
    ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` 
    : '';

  return (
    <motion.span
      className={`${className} ${gradientClass}`}
      variants={textGlowVariants}
      initial={animateOnScroll ? "initial" : "animate"}
      animate="animate"
      whileInView={animateOnScroll ? "animate" : undefined}
      viewport={animateOnScroll ? { once: true, margin: "-100px" } : undefined}
      whileHover={hover ? "hover" : undefined}
      style={combinedStyles}
    >
      {children}
    </motion.span>
  );
};

export default TextWithGlow;
