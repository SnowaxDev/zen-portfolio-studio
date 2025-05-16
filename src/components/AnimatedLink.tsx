
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
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ 
  href, 
  children, 
  isActive = false,
  className = '',
  onClick,
  delay = 0,
  underline = false,
  withArrow = false
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
  const arrowVariants = {
    initial: { x: 0, opacity: 0.7 },
    hover: { x: 4, opacity: 1, transition: { duration: 0.2 } }
  };
  
  // Underline animation variants
  const underlineVariants = {
    initial: { width: "0%" },
    hover: { width: "100%", transition: { duration: 0.3 } }
  };
  
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
          variants={prefersReducedMotion ? {} : arrowVariants}
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </motion.svg>
      )}
      
      {underline && (
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold/80 to-gold-light w-full origin-left"
          variants={prefersReducedMotion ? {} : underlineVariants}
          initial="initial"
          whileHover="hover"
        />
      )}
      
      {isActive && (
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
      className="relative"
    >
      {href.startsWith('#') ? (
        <a 
          href={href}
          onClick={scrollToSection}
          className={`relative inline-block px-3 py-2 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-foreground/80 hover:text-foreground'} ${className}`}
        >
          {content}
        </a>
      ) : (
        <Link 
          to={href}
          onClick={onClick}
          className={`relative inline-block px-3 py-2 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-foreground/80 hover:text-foreground'} ${className}`}
        >
          {content}
        </Link>
      )}
    </motion.div>
  );
};

export default AnimatedLink;
