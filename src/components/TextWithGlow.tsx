
import React from 'react';
import { motion } from 'framer-motion';

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
}) => {
  // Set shadow intensity based on prop
  const getShadowIntensity = () => {
    switch (intensity) {
      case 'light': return `0 0 10px ${color}, 0 0 20px ${color}40`;
      case 'strong': return `0 0 12px ${color}, 0 0 24px ${color}, 0 0 36px ${color}60`;
      default: return `0 0 10px ${color}, 0 0 18px ${color}50`;
    }
  };

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

  // Add shimmering effect for a more dynamic appearance
  const shimmerStyles = shimmer ? {
    backgroundImage: `linear-gradient(90deg, ${color}00 0%, ${color}60 50%, ${color}00 100%)`,
    backgroundSize: '200% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'shimmer 2s infinite linear',
  } : {};

  return (
    <motion.span
      className={className}
      variants={textGlowVariants}
      initial="initial"
      animate="animate"
      whileHover={hover ? "hover" : undefined}
      style={shimmer ? shimmerStyles : {}}
    >
      {children}
    </motion.span>
  );
};

export default TextWithGlow;
