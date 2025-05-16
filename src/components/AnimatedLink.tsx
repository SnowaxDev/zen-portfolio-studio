
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ 
  href, 
  children, 
  isActive = false,
  className = '',
  onClick,
  delay = 0
}) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 + 0.1, duration: 0.3 }}
      className="relative"
    >
      {href.startsWith('#') ? (
        <a 
          href={href}
          onClick={scrollToSection}
          className={`relative inline-block px-3 py-2 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-foreground/80 hover:text-foreground'} ${className}`}
        >
          <span className="relative z-10">{children}</span>
          {isActive && (
            <motion.span
              layoutId="navIndicator"
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold/80 to-gold-light w-full"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
        </a>
      ) : (
        <Link 
          to={href}
          onClick={onClick}
          className={`relative inline-block px-3 py-2 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-foreground/80 hover:text-foreground'} ${className}`}
        >
          <span className="relative z-10">{children}</span>
          {isActive && (
            <motion.span
              layoutId="navIndicator"
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold/80 to-gold-light w-full"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
        </Link>
      )}
    </motion.div>
  );
};

export default AnimatedLink;
