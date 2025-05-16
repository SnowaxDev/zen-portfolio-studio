
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  delay?: number;
  underline?: boolean;
  withArrow?: boolean;
  variant?: 'primary' | 'secondary' | 'text' | 'ghost' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  arrowAnimation?: 'slide' | 'bounce' | 'none';
  fullWidth?: boolean;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ 
  href, 
  children, 
  isActive = false,
  className = '',
  onClick,
  delay = 0,
  underline = false,
  withArrow = false,
  variant = 'text',
  size = 'md',
  arrowAnimation = 'slide',
  fullWidth = false
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
      
      if (onClick) {
        onClick();
      }
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2',
    lg: 'px-4 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    text: isActive ? 'text-gold' : 'text-foreground/80 hover:text-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    gold: 'bg-gradient-to-r from-gold to-gold-light text-background hover:shadow-gold/20 hover:shadow-lg'
  };

  // Basic animation variants
  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : delay * 0.1 + 0.1,
        duration: 0.3
      }
    },
    hover: {
      y: underline ? 0 : -2,
      transition: { duration: 0.2 }
    }
  };
  
  // Arrow animation variants
  const getArrowVariants = () => {
    switch (arrowAnimation) {
      case 'slide':
        return {
          initial: { x: 0, opacity: 0.7 },
          hover: { x: 4, opacity: 1, transition: { duration: 0.2 } }
        };
      case 'bounce':
        return {
          initial: { x: 0 },
          hover: { 
            x: [0, 4, 0], 
            transition: { 
              duration: 0.6, 
              repeat: Infinity, 
              repeatType: "loop" as const 
            } 
          }
        };
      default:
        return {};
    }
  };
  
  const arrowVariants = getArrowVariants();
  
  // Underline animation variants
  const underlineVariants = {
    initial: { width: "0%" },
    hover: { width: "100%", transition: { duration: 0.3 } }
  };

  // Skip animations for reduced motion
  if (prefersReducedMotion) {
    const baseClasses = `relative inline-block ${sizeClasses[size]} ${variantClasses[variant]} transition-colors duration-300 ${fullWidth ? 'w-full text-center' : ''} ${className}`;
    
    const content = (
      <>
        <span className="relative z-10">{children}</span>
        
        {withArrow && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="ml-1 inline-block"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        )}
        
        {isActive && variant === 'text' && (
          <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold/80 to-gold-light w-full" />
        )}
      </>
    );
    
    return href.startsWith('#') ? (
      <a href={href} onClick={scrollToSection} className={baseClasses}>
        {content}
      </a>
    ) : (
      <Link to={href} onClick={onClick} className={baseClasses}>
        {content}
      </Link>
    );
  }
  
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      
      {withArrow && (
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="ml-1 inline-block"
          variants={arrowVariants}
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </motion.svg>
      )}
      
      {underline && (
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold/80 to-gold-light w-full origin-left"
          variants={underlineVariants}
          initial="initial"
          whileHover="hover"
        />
      )}
      
      {isActive && variant === 'text' && (
        <motion.span
          layoutId="navIndicator"
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold/80 to-gold-light w-full"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </>
  );

  return (
    <motion.div
      variants={linkVariants}
      initial="initial"
      animate="animate"
      whileHover={prefersReducedMotion ? undefined : "hover"}
      className={`relative ${fullWidth ? 'w-full' : ''}`}
    >
      {href.startsWith('#') ? (
        <a 
          href={href}
          onClick={scrollToSection}
          className={`relative inline-block ${sizeClasses[size]} ${variantClasses[variant]} transition-colors duration-300 ${fullWidth ? 'w-full text-center' : ''} ${className} rounded-md`}
        >
          {content}
        </a>
      ) : (
        <Link 
          to={href}
          onClick={onClick}
          className={`relative inline-block ${sizeClasses[size]} ${variantClasses[variant]} transition-colors duration-300 ${fullWidth ? 'w-full text-center' : ''} ${className} rounded-md`}
        >
          {content}
        </Link>
      )}
    </motion.div>
  );
};

export default AnimatedLink;
