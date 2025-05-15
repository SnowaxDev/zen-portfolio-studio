
import React from 'react';
import { motion } from 'framer-motion';

interface TextWithGlowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong' | 'extreme';
  color?: string;
  pulsate?: boolean;
  delay?: number;
  duration?: number;
  hoverScale?: boolean;
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
  hoverScale = true,
  gradient = false,
  gradientColors = 'from-gold via-gold-light to-gold-dark',
}) => {
  // Set shadow intensity based on prop
  const getShadowIntensity = () => {
    switch (intensity) {
      case 'light': return `0 0 10px ${color}, 0 0 20px ${color}40`;
      case 'medium': return `0 0 10px ${color}, 0 0 18px ${color}50`;
      case 'strong': return `0 0 12px ${color}, 0 0 24px ${color}, 0 0 36px ${color}60`;
      case 'extreme': return `0 0 15px ${color}, 0 0 30px ${color}, 0 0 45px ${color}80, 0 0 60px ${color}30`;
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
    hover: {
      textShadow: intensity === 'strong' || intensity === 'extreme' 
        ? `0 0 15px ${color}, 0 0 25px ${color}, 0 0 40px ${color}70` 
        : `0 0 15px ${color}, 0 0 25px ${color}60`,
      scale: hoverScale ? 1.05 : 1,
      transition: { duration: 0.3 }
    }
  };

  if (gradient) {
    return (
      <motion.span
        className={`bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent ${className}`}
        initial={{ backgroundPosition: "0% center" }}
        animate={{ 
          backgroundPosition: ["0% center", "100% center", "0% center"],
          transition: { 
            duration: duration * 3, 
            ease: "linear", 
            repeat: Infinity,
            delay: delay
          } 
        }}
        whileHover={hoverScale ? { scale: 1.05, transition: { duration: 0.3 } } : {}}
      >
        {children}
      </motion.span>
    );
  }

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
