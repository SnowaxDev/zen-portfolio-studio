
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      className="relative rounded-full w-12 h-6 glassmorphism flex items-center p-1 cursor-pointer"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-accent"
        layout
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      />
      {theme === 'dark' ? (
        <motion.span 
          className="absolute right-2 text-xs text-accent/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key="moon"
        >
          ●
        </motion.span>
      ) : (
        <motion.span 
          className="absolute left-2 text-xs text-accent/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key="sun"
        >
          ○
        </motion.span>
      )}
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
};

export default ThemeToggle;
