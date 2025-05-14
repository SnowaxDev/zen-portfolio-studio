
import React from 'react';
import { motion } from 'framer-motion';
import { easings } from '../lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  type?: 'words' | 'chars' | 'lines';
  staggerChildren?: number;
  delayChildren?: number;
  animation?: 'fade' | 'slide' | 'bounce' | 'scale' | 'typewriter' | 'wave';
  threshold?: number;
  highlightColor?: string;
  textGradient?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  once = true,
  type = 'words',
  staggerChildren = 0.08,
  delayChildren = 0.03,
  animation = 'fade',
  threshold = 0.1,
  highlightColor = "",
  textGradient = false
}) => {
  // Split the text based on type
  const getTextContent = () => {
    switch (type) {
      case 'chars':
        return text.split('');
      case 'lines':
        return text.split('\n');
      case 'words':
      default:
        return text.split(' ');
    }
  };
  
  const items = getTextContent();
  
  // Animation variants
  const getAnimationVariant = () => {
    switch (animation) {
      case 'slide':
        return {
          hidden: { 
            y: 20, 
            opacity: 0 
          },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 10,
              stiffness: 80,
            },
          },
        };
      case 'bounce':
        return {
          hidden: { 
            y: 20, 
            opacity: 0 
          },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 6,
              stiffness: 100,
              velocity: 2
            },
          },
        };
      case 'scale':
        return {
          hidden: { 
            scale: 0.8, 
            opacity: 0 
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 10,
              stiffness: 80,
            },
          },
        };
      case 'typewriter':
        return {
          hidden: { 
            opacity: 0,
            width: 0
          },
          visible: {
            opacity: 1,
            width: "auto",
            transition: {
              duration: 0.3,
            },
          },
        };
      case 'wave':
        return {
          hidden: { 
            y: 0,
            opacity: 0
          },
          visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: i * 0.05,
              type: "spring",
              damping: 10,
              stiffness: 100,
            },
          }),
        };
      case 'fade':
      default:
        return {
          hidden: { 
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: easings.easeOut,
            },
          },
        };
    }
  };
  
  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren, 
        delayChildren: delayChildren * i 
      },
    }),
  };
  
  // Special class for highlight color or gradient
  const getSpecialClasses = () => {
    if (textGradient) return "text-gradient";
    if (highlightColor) return `text-${highlightColor}`;
    return "";
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className={`inline-block ${getSpecialClasses()}`}
          variants={getAnimationVariant()}
          // For wave animation, pass the index
          custom={animation === 'wave' ? index : undefined}
        >
          {item}
          {type !== 'chars' && index < items.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
