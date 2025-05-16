
import React from 'react';
import { motion } from 'framer-motion';

interface HobbyItemProps {
  text: string;
  index: number;
}

const HobbyItem: React.FC<HobbyItemProps> = ({ text, index }) => {
  return (
    <div className="flex items-start gap-3 mb-2.5">
      <motion.span 
        className="text-purple mt-0.5"
        animate={{ 
          x: [0, 3, 0],
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: index * 0.5,
        }}
      >»</motion.span>
      <span className="text-foreground/90">{text}</span>
    </div>
  );
};

export default HobbyItem;
