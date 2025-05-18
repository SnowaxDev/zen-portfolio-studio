
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
      className={`group bg-black/60 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-500/50 transition-all duration-300 transform ${rotateStyle} ${translateYStyle}`}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.2)" }}
      onHoverStart={() => handleStatHover(index)}
      onHoverEnd={() => handleStatHover(null)}
    >
      <motion.div 
        className="flex items-center justify-center"
        animate={{ y: hoveredStat === index ? [0, -3, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-3xl font-bold text-yellow-400">{value}</span>
        
        <motion.span 
          className="ml-1 text-yellow-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hoveredStat === index ? 1 : 0,
            scale: hoveredStat === index ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <MoveUp size={16} />
        </motion.span>
      </motion.div>
      <p className="text-sm text-foreground/70 text-center mt-2">{label}</p>
    </motion.div>
  );
};

export default StatBox;
