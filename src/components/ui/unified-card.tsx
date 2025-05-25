
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface UnifiedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'interactive' | 'elevated';
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  delay?: number;
  hover?: boolean;
  glow?: 'gold' | 'purple' | 'blue' | 'none';
}

const UnifiedCard: React.FC<UnifiedCardProps> = ({
  children,
  className = '',
  variant = 'default',
  animation = 'fade',
  delay = 0,
  hover = true,
  glow = 'none',
}) => {
  const { shouldReduceAnimations, getAnimationDuration } = useMobileAnimationSettings();

  const baseClasses = designSystem.components.card.base;
  const hoverClasses = hover ? designSystem.components.card.hover : '';
  const interactiveClasses = variant === 'interactive' ? designSystem.components.card.interactive : '';
  
  const glowClasses = {
    gold: 'hover:shadow-gold',
    purple: 'hover:shadow-purple',
    blue: 'hover:shadow-lg hover:shadow-blue-500/20',
    none: '',
  };

  const animationVariants = {
    fade: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: getAnimationDuration(0.5),
          delay,
          ease: "easeOut"
        }
      }
    },
    slide: {
      hidden: { opacity: 0, x: -30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: getAnimationDuration(0.6),
          delay,
          ease: "easeOut"
        }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: getAnimationDuration(0.4),
          delay,
          ease: "easeOut"
        }
      }
    },
    none: {
      visible: { opacity: 1 }
    }
  };

  const hoverVariants = shouldReduceAnimations ? {} : {
    y: variant === 'interactive' ? -8 : -4,
    scale: variant === 'elevated' ? 1.02 : 1.01,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  };

  if (shouldReduceAnimations || animation === 'none') {
    return (
      <div className={cn(
        baseClasses,
        hoverClasses,
        interactiveClasses,
        glowClasses[glow],
        className
      )}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        baseClasses,
        hoverClasses,
        interactiveClasses,
        glowClasses[glow],
        className
      )}
      variants={animationVariants[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hover ? hoverVariants : undefined}
    >
      {children}
    </motion.div>
  );
};

export default UnifiedCard;
