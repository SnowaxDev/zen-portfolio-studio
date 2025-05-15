
import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  alignment?: 'left' | 'center' | 'right';
  accentColor?: 'gold' | 'purple';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = '',
  alignment = 'center',
  accentColor = 'gold'
}) => {
  // Dynamic classes based on alignment
  const containerClasses = {
    'text-left': alignment === 'left',
    'text-center': alignment === 'center',
    'text-right': alignment === 'right',
    'mb-16': true
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

  return (
    <div className={`${Object.entries(containerClasses)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ')} ${className}`}>
      
      <div className="relative inline-block">
        {/* Asymmetric decoration based on alignment */}
        <motion.div 
          className={`absolute ${alignment === 'left' ? '-right-6' : (alignment === 'right' ? '-left-6' : '-right-8')} 
            -top-6 w-12 h-12 rounded-full bg-gradient-to-br ${accentGradient} opacity-20 blur-xl`}
          variants={decorationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        
        <motion.div 
          className="relative inline-block" 
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 relative inline-block">
            {title}
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
          className={`text-foreground/70 mt-4 ${alignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
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
