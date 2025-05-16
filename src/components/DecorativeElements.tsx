
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCircleProps {
  className?: string;
  size?: string;
  delay?: number;
  duration?: number;
  amplitude?: number;
  color?: 'gold' | 'purple' | 'white';
  variant?: 'filled' | 'outlined' | 'dashed';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const FloatingCircle: React.FC<FloatingCircleProps> = ({
  className = '',
  size = 'w-8 h-8',
  delay = 0,
  duration = 5,
  amplitude = 10,
  color = 'gold',
  variant = 'filled',
  top,
  left,
  right,
  bottom,
}) => {
  const colorClasses = {
    gold: variant === 'filled' 
      ? 'bg-gold/10 backdrop-blur-sm' 
      : variant === 'outlined' 
        ? 'border border-gold/30' 
        : 'border border-dashed border-gold/20',
    purple: variant === 'filled' 
      ? 'bg-purple/10 backdrop-blur-sm' 
      : variant === 'outlined'
        ? 'border border-purple/30' 
        : 'border border-dashed border-purple/20',
    white: variant === 'filled' 
      ? 'bg-white/5 backdrop-blur-sm' 
      : variant === 'outlined'
        ? 'border border-white/20' 
        : 'border border-dashed border-white/10',
  };
  
  const positionStyles: React.CSSProperties = {};
  if (top !== undefined) positionStyles.top = top;
  if (left !== undefined) positionStyles.left = left;
  if (right !== undefined) positionStyles.right = right;
  if (bottom !== undefined) positionStyles.bottom = bottom;

  return (
    <motion.div
      className={`absolute rounded-full ${size} ${colorClasses[color]} ${className}`}
      style={positionStyles}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
        x: [0, amplitude, 0, -amplitude, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        delay: delay,
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
};

interface FloatingLineProps {
  className?: string;
  width?: string;
  height?: string;
  color?: 'gold' | 'purple' | 'white';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: string;
  delay?: number;
}

export const FloatingLine: React.FC<FloatingLineProps> = ({
  className = '',
  width = 'w-16',
  height = 'h-0.5',
  color = 'gold',
  top,
  left,
  right,
  bottom,
  rotate = 'rotate-0',
  delay = 0,
}) => {
  const colorClasses = {
    gold: 'bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0',
    purple: 'bg-gradient-to-r from-purple/0 via-purple/40 to-purple/0',
    white: 'bg-gradient-to-r from-white/0 via-white/20 to-white/0',
  };
  
  const positionStyles: React.CSSProperties = {};
  if (top !== undefined) positionStyles.top = top;
  if (left !== undefined) positionStyles.left = left;
  if (right !== undefined) positionStyles.right = right;
  if (bottom !== undefined) positionStyles.bottom = bottom;

  return (
    <motion.div
      className={`absolute ${width} ${height} ${colorClasses[color]} ${rotate} ${className}`}
      style={positionStyles}
      animate={{
        opacity: [0.3, 0.7, 0.3],
        width: ['100%', '80%', '100%'],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

interface FloatingGridProps {
  className?: string;
}

export const FloatingGrid: React.FC<FloatingGridProps> = ({
  className = '',
}) => {
  return (
    <motion.div 
      className={`absolute inset-0 opacity-20 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 55, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

interface GlowSphereProps {
  className?: string;
  size?: string;
  color?: 'gold' | 'purple' | 'white';
  intensity?: 'low' | 'medium' | 'high';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const GlowSphere: React.FC<GlowSphereProps> = ({
  className = '',
  size = 'w-64 h-64',
  color = 'gold',
  intensity = 'medium',
  top,
  left,
  right,
  bottom,
}) => {
  const colorClasses = {
    gold: {
      low: 'bg-gold/5 blur-xl',
      medium: 'bg-gold/10 blur-2xl',
      high: 'bg-gold/15 blur-3xl',
    },
    purple: {
      low: 'bg-purple/5 blur-xl',
      medium: 'bg-purple/10 blur-2xl',
      high: 'bg-purple/15 blur-3xl',
    },
    white: {
      low: 'bg-white/5 blur-xl',
      medium: 'bg-white/10 blur-2xl',
      high: 'bg-white/15 blur-3xl',
    }
  };
  
  const positionStyles: React.CSSProperties = {};
  if (top !== undefined) positionStyles.top = top;
  if (left !== undefined) positionStyles.left = left;
  if (right !== undefined) positionStyles.right = right;
  if (bottom !== undefined) positionStyles.bottom = bottom;

  return (
    <motion.div
      className={`absolute rounded-full ${size} ${colorClasses[color][intensity]} opacity-70 ${className}`}
      style={positionStyles}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};
