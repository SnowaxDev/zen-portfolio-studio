
import React from 'react';
import { motion } from 'framer-motion';

interface HobbyItemProps {
  text: string;
  index: number;
  translateX?: number;
}

const HobbyItem: React.FC<HobbyItemProps> = ({ 
  text, 
  index,
  translateX = 0
}) => {
  const transformClass = translateX !== 0 ? `transform ${translateX > 0 ? 'translate-x-1' : '-translate-x-1'}` : '';
  
  return (
    <div className={`flex items-start gap-3 ${transformClass}`}>
      <motion.span 
        className="text-purple mt-0.5"
        animate={{ 
          x: [0, 5, 0],
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
