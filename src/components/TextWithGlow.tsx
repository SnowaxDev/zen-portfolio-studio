
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
}

const TextWithGlow: React.FC<TextWithGlowProps> = ({
  children,
  className = '',
  intensity = 'medium',
  color = 'rgba(212, 175, 55, 0.8)', // Default gold color
  pulsate = true,
  delay = 0,
  duration = 2,
}) => {
  // Set shadow intensity based on prop
  const getShadowIntensity = () => {
    switch (intensity) {
      case 'light': return `0 0 10px ${color}, 0 0 20px ${color}40`;
      case 'strong': return `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}60`;
      default: return `0 0 10px ${color}, 0 0 15px ${color}50`;
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
    hover: {
      textShadow: intensity === 'strong' 
        ? `0 0 15px ${color}, 0 0 25px ${color}, 0 0 35px ${color}70` 
        : `0 0 15px ${color}, 0 0 25px ${color}60`,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.span
      className={className}
      variants={textGlowVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {children}
    </motion.span>
  );
};

export default TextWithGlow;
