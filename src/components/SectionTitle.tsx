
import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';
import TextWithGlow from './TextWithGlow';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  alignment?: 'left' | 'center' | 'right';
  accentColor?: 'gold' | 'purple';
  withGlow?: boolean;
  withGradient?: boolean;
  withAnimation?: boolean;
  decorative?: boolean;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  subtitleSize?: 'sm' | 'md' | 'lg';
  highlight?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = '',
  alignment = 'center',
  accentColor = 'gold',
  withGlow = false,
  withGradient = false,
  withAnimation = true,
  decorative = true,
  titleSize = 'md',
  subtitleSize = 'md',
  highlight,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Dynamic classes based on alignment
  const containerClasses = {
    'text-left': alignment === 'left',
    'text-center': alignment === 'center',
    'text-right': alignment === 'right',
    'mb-16': true
  };
  
  // Dynamic title size classes
  const titleSizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl',
  };
  
  // Dynamic subtitle size classes
  const subtitleSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Dynamic underline animation based on alignment
  const underlineVariants = {
    hidden: {
      width: "0%",
      left: alignment === 'right' ? 'auto' : 0,
      right: alignment === 'right' ? 0 : 'auto'
    },
    visible: {
      width: "100%",
      transition: { duration: 0.7, delay: 0.2, ease: "easeOut" }
    }
  };

  // Dynamic accent color
  const accentGradient = accentColor === 'gold' 
    ? "from-gold to-gold-light" 
    : "from-purple to-purple-light";

  // Motion variants for asymmetric entrances
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: alignment === 'left' ? -20 : (alignment === 'right' ? 20 : 15)
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      x: alignment === 'left' ? -10 : (alignment === 'right' ? 10 : 0)
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Asymmetric decoration effect
  const decorationVariants = {
    hidden: { scale: 0, rotate: -30, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0,
      opacity: [0, 0.8, 0.6],
      transition: { 
        duration: 0.8, 
        delay: 0.4,
        ease: "easeOut" 
      }
    }
  };
  
  // Handle highlighted text in title
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return title;
    }
    
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className={`font-bold ${withGradient ? `bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent` : 'text-gold'}`}>
          {highlight}
        </span>
        {parts[1]}
      </>
    );
  };
  
  // If reduced motion is preferred, render without animations
  if (prefersReducedMotion || !withAnimation) {
    return (
      <div className={`${Object.entries(containerClasses)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(' ')} ${className}`}>
        
        <div className="relative inline-block">
          <h2 className={`${titleSizeClasses[titleSize]} font-bold mb-2 relative inline-block`}>
            {withGradient ? (
              <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                {renderTitle()}
              </span>
            ) : (
              renderTitle()
            )}
            <span className={`absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r ${accentGradient} rounded-full`} />
          </h2>
        </div>
        
        {subtitle && (
          <p className={`${subtitleSizeClasses[subtitleSize]} text-foreground/70 mt-4 ${alignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`${Object.entries(containerClasses)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ')} ${className}`}>
      
      <div className="relative inline-block">
        {/* Asymmetric decoration based on alignment */}
        {decorative && (
          <motion.div 
            className={`absolute ${alignment === 'left' ? '-right-6' : (alignment === 'right' ? '-left-6' : '-right-8')} 
              -top-6 w-12 h-12 rounded-full bg-gradient-to-br ${accentGradient} opacity-20 blur-xl`}
            variants={decorationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        )}
        
        <motion.div 
          className="relative inline-block" 
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={`${titleSizeClasses[titleSize]} font-bold mb-2 relative inline-block`}>
            {withGlow ? (
              <TextWithGlow 
                intensity="medium" 
                color={accentColor === 'gold' ? 'rgba(212, 175, 55, 0.8)' : 'rgba(139, 92, 246, 0.8)'} 
                gradient={withGradient}
                gradientColors={accentGradient}
              >
                {renderTitle()}
              </TextWithGlow>
            ) : withGradient ? (
              <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                {renderTitle()}
              </span>
            ) : (
              renderTitle()
            )}
            <motion.span 
              className={`absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r ${accentGradient} rounded-full`}
              variants={underlineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </h2>
        </motion.div>
      </div>
      
      {subtitle && (
        <motion.p 
          className={`${subtitleSizeClasses[subtitleSize]} text-foreground/70 mt-4 ${alignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
          variants={subtitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
