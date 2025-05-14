
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
  animation?: 'fade' | 'slide' | 'bounce' | 'scale';
  threshold?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  once = true,
  type = 'words',
  staggerChildren = 0.08,
  delayChildren = 0.03,
  animation = 'fade',
  threshold = 0.1
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
          className="inline-block"
          variants={getAnimationVariant()}
        >
          {item}
          {type !== 'chars' && index < items.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
