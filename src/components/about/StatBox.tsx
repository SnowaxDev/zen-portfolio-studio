
import React from 'react';
import { motion } from 'framer-motion';
import TextWithGlow from '../TextWithGlow';
import { MoveUp } from 'lucide-react';

interface StatBoxProps {
  value: string;
  label: string;
  index: number;
  hoveredStat: number | null;
  handleStatHover: (index: number | null) => void;
  rotationDegree?: number;
  translateY?: number;
}

const StatBox: React.FC<StatBoxProps> = ({ 
  value, 
  label, 
  index, 
  hoveredStat, 
  handleStatHover,
  rotationDegree = 0,
  translateY = 0
}) => {
  const rotateStyle = rotationDegree ? `rotate-[${rotationDegree}deg]` : '';
  const translateYStyle = translateY ? `md:translate-y-${translateY}` : '';
  
  return (
    <motion.div 
      className={`bg-card/60 backdrop-blur-sm border border-gold/5 rounded-xl p-4 hover:border-gold/30 transition-all duration-300 transform ${rotateStyle} ${translateYStyle}`}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
      onHoverStart={() => handleStatHover(index)}
      onHoverEnd={() => handleStatHover(null)}
    >
      <motion.h3 
        className="text-2xl font-bold mb-1 flex items-center justify-center"
        animate={{ y: hoveredStat === index ? [0, -3, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <TextWithGlow 
          color="rgba(212, 175, 55, 0.8)" 
          intensity="medium" 
          gradient={true} 
          gradientColors="from-gold to-gold-light"
        >
          {value}
        </TextWithGlow>
        
        <motion.span 
          className="ml-1 text-gold/80"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hoveredStat === index ? 1 : 0,
            scale: hoveredStat === index ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <MoveUp size={16} />
        </motion.span>
      </motion.h3>
      <p className="text-sm text-foreground/70 text-center">{label}</p>
    </motion.div>
  );
};

export default StatBox;
