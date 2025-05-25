
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface UnifiedTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle' | 'body' | 'caption' | 'accent';
  className?: string;
  gradient?: boolean;
  glow?: boolean;
  animation?: 'fade' | 'slide' | 'none';
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const UnifiedText: React.FC<UnifiedTextProps> = ({
  children,
  variant = 'body',
  className = '',
  gradient = false,
  glow = false,
  animation = 'none',
  delay = 0,
  as,
}) => {
  const { shouldReduceAnimations, getAnimationDuration } = useMobileAnimationSettings();

  const variantClasses = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
    h3: 'text-2xl md:text-3xl font-bold leading-tight',
    h4: 'text-xl md:text-2xl font-semibold leading-tight',
    subtitle: 'text-lg md:text-xl font-medium text-gray-300',
    body: 'text-base leading-relaxed text-gray-400',
    caption: 'text-sm text-gray-500',
    accent: 'text-gold font-medium',
  };

  const defaultTags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    subtitle: 'p',
    body: 'p',
    caption: 'span',
    accent: 'span',
  };

  const Component = motion[as || defaultTags[variant] || 'p'] as any;

  const baseClasses = cn(
    variantClasses[variant],
    gradient && designSystem.components.text.gradient,
    glow && 'animate-text-glow',
    className
  );

  const animationVariants = {
    fade: {
      hidden: { opacity: 0, y: 15 },
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
      hidden: { opacity: 0, x: -20 },
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
    none: {
      visible: { opacity: 1 }
    }
  };

  if (shouldReduceAnimations || animation === 'none') {
    const StaticComponent = as || defaultTags[variant] || 'p';
    return React.createElement(StaticComponent, { className: baseClasses }, children);
  }

  return (
    <Component
      className={baseClasses}
      variants={animationVariants[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      {children}
    </Component>
  );
};

export default UnifiedText;
