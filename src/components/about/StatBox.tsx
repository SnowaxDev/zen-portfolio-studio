
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import TextWithGlow from '../TextWithGlow';
import { MoveUp } from 'lucide-react';
import { useMobileAnimationSettings } from '../../hooks/use-mobile-animation-settings';

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
  const { isMobile, shouldReduceAnimations } = useMobileAnimationSettings();
  const controls = useAnimation();
  
  // Apply rotation and translation only on desktop
  const rotateStyle = rotationDegree && !isMobile ? `rotate-[${rotationDegree}deg]` : '';
  const translateYStyle = translateY && !isMobile ? `md:translate-y-${translateY}` : '';
  
  // Handle interaction effects
  const isActive = hoveredStat === index;
  
  // Pulse effect on tap for mobile
  React.useEffect(() => {
    if (isActive && isMobile) {
      const pulse = async () => {
        await controls.start({
          scale: [1, 1.03, 1],
          transition: { duration: 0.4, times: [0, 0.5, 1] }
        });
      };
      pulse();
    }
  }, [isActive, isMobile, controls]);

  return (
    <motion.div 
      className={`group bg-black/60 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-500/50 transition-all duration-300 transform ${rotateStyle} ${translateYStyle}`}
      animate={controls}
      whileHover={shouldReduceAnimations ? {} : { 
        y: -5, 
        boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.2)",
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      onHoverStart={() => !shouldReduceAnimations && handleStatHover(index)}
      onHoverEnd={() => !shouldReduceAnimations && handleStatHover(null)}
      onTap={() => isMobile && handleStatHover(index !== hoveredStat ? index : null)}
    >
      <motion.div 
        className="flex items-center justify-center"
        animate={{ 
          y: isActive ? [0, -3, 0] : 0,
          transition: { 
            duration: isMobile ? 0.3 : 0.5,
            ease: "easeInOut"
          }
        }}
      >
        <motion.span 
          className="text-3xl font-bold text-yellow-400"
          animate={{ 
            scale: isActive && isMobile ? [1, 1.05, 1] : 1,
            transition: { duration: 0.3, times: [0, 0.5, 1] }
          }}
        >
          {value}
        </motion.span>
        
        <motion.span 
          className="ml-1 text-yellow-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0,
            transition: { 
              duration: 0.2,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
        >
          <MoveUp size={16} />
        </motion.span>
      </motion.div>
      <p className="text-sm text-foreground/70 text-center mt-2">{label}</p>
    </motion.div>
  );
};

export default StatBox;
