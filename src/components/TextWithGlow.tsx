
import React from 'react';
import { motion } from 'framer-motion';

interface TextWithGlowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  color?: string;
}

const TextWithGlow: React.FC<TextWithGlowProps> = ({
  children,
  className = '',
  intensity = 'medium',
  color = 'rgba(212, 175, 55, 0.8)' // Default gold color
}) => {
  // Set shadow intensity based on prop
  const getShadowIntensity = () => {
    switch (intensity) {
      case 'light': return `0 0 10px ${color}, 0 0 20px ${color}40`;
      case 'strong': return `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}60`;
      default: return `0 0 10px ${color}, 0 0 15px ${color}50`;
    }
  };

  const textGlowVariants = {
    initial: {
      textShadow: `0 0 5px ${color}00`
    },
    animate: {
      textShadow: getShadowIntensity(),
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.span
      className={className}
      variants={textGlowVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.span>
  );
};

export default TextWithGlow;
