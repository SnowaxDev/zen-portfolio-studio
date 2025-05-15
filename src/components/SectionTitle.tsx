
import React from 'react';
import { motion } from 'framer-motion';
import TextWithGlow from './TextWithGlow';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  accentColor?: 'gold' | 'purple' | 'gradient';
  size?: 'default' | 'large' | 'small';
  alignment?: 'center' | 'left' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = '',
  accentColor = 'gradient',
  size = 'default',
  alignment = 'center',
}) => {
  // Size classes
  const sizeClasses = {
    small: 'text-2xl md:text-3xl',
    default: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl',
  };
  
  // Alignment classes
  const alignmentClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto',
  };
  
  // Line gradient classes
  const gradientClasses = {
    gold: 'from-gold to-gold-light',
    purple: 'from-purple to-purple-light',
    gradient: 'from-purple via-gold to-purple-light',
  };

  // Animation variants for the line
  const lineVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: { 
      width: "100%", 
      opacity: 1, 
      transition: { 
        duration: 1.2, 
        ease: [0.19, 1.0, 0.22, 1.0],
        delay: 0.3
      } 
    }
  };

  return (
    <div className={`${alignmentClasses[alignment]} ${className}`}>
      <motion.div 
        className="inline-block" 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`${sizeClasses[size]} font-bold mb-3 relative inline-block`}>
          {accentColor === 'gradient' ? (
            <TextWithGlow gradient gradientColors="from-gold via-gold-light to-gold">
              {title}
            </TextWithGlow>
          ) : (
            <TextWithGlow intensity="medium" color={accentColor === 'purple' ? 'rgba(139, 92, 246, 0.8)' : 'rgba(212, 175, 55, 0.8)'}>
              {title}
            </TextWithGlow>
          )}
          
          <motion.span 
            className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r ${gradientClasses[accentColor]} rounded-full`}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </h2>
      </motion.div>
      
      {subtitle && (
        <motion.p 
          className="text-foreground/70 max-w-2xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
