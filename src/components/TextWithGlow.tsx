
import React from 'react';
import { motion } from 'framer-motion';
import { useMobileAnimationSettings } from '../hooks/use-mobile-animation-settings';

interface TextWithGlowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  color?: string;
  pulsate?: boolean;
  delay?: number;
  duration?: number;
  hover?: boolean;
  shimmer?: boolean;
  gradient?: boolean;
  gradientColors?: string;
}

const TextWithGlow: React.FC<TextWithGlowProps> = ({
  children,
  className = '',
  intensity = 'medium',
  color = 'rgba(212, 175, 55, 0.8)',
  pulsate = false,
  delay = 0,
  duration = 3,
  hover = true,
  shimmer = false,
  gradient = false,
  gradientColors = 'from-gold to-gold-light',
}) => {
  const { 
    shouldReduceAnimations,
    getAnimationDuration,
    getAnimationDelay,
    premiumEasing
  } = useMobileAnimationSettings();
  
  // Optimized glow intensities for premium feel
  const getShadowIntensity = () => {
    switch (intensity) {
      case 'subtle': 
        return `0 0 8px ${color}40, 0 0 16px ${color}20`;
      case 'strong': 
        return `0 0 12px ${color}, 0 0 24px ${color}80, 0 0 36px ${color}40`;
      default: 
        return `0 0 10px ${color}60, 0 0 20px ${color}30`;
    }
  };

  // Skip animations for reduced motion
  if (shouldReduceAnimations) {
    const combinedClassName = gradient 
      ? `${className} bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent`
      : className;
    
    return <span className={combinedClassName}>{children}</span>;
  }

  // Premium glow animation variants
  const glowVariants = {
    initial: {
      textShadow: `0 0 0px ${color}00`,
      ...(gradient && { 
        backgroundSize: "100% 100%",
        backgroundPosition: "0% 50%"
      })
    },
    animate: {
      textShadow: getShadowIntensity(),
      ...(gradient && shimmer && {
        backgroundSize: "200% 100%",
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }),
      transition: {
        duration: getAnimationDuration(duration),
        repeat: pulsate ? Infinity : 0,
        repeatType: "reverse" as const,
        ease: premiumEasing,
        delay: getAnimationDelay(delay)
      }
    },
    hover: hover ? {
      textShadow: intensity === 'strong' 
        ? `0 0 15px ${color}, 0 0 30px ${color}90, 0 0 45px ${color}60` 
        : `0 0 12px ${color}80, 0 0 24px ${color}50`,
      scale: 1.02,
      transition: { 
        duration: getAnimationDuration(0.3),
        ease: premiumEasing
      }
    } : {}
  };

  // Enhanced gradient styles
  const gradientStyle = gradient ? {
    background: `linear-gradient(45deg, var(--gold), var(--gold-light), var(--purple-light))`,
    backgroundSize: shimmer ? "200% 100%" : "100% 100%",
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'brightness(1.1)'
  } : {};

  const gradientClass = gradient 
    ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` 
    : '';

  return (
    <motion.span
      className={`${className} ${gradientClass} relative`}
      variants={glowVariants}
      initial="initial"
      animate="animate"
      whileHover={hover ? "hover" : undefined}
      style={gradientStyle}
    >
      {children}
      
      {/* Enhanced shimmer effect */}
      {shimmer && !shouldReduceAnimations && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0']
          }}
          transition={{
            duration: getAnimationDuration(2),
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}
    </motion.span>
  );
};

export default TextWithGlow;
