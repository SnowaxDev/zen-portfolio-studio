
import React from 'react';
import { motion } from 'framer-motion';
import TextWithGlow from '../TextWithGlow';
import { LucideIcon } from 'lucide-react';

interface TechStackItemProps {
  title: string;
  technologies: string;
  icon: LucideIcon;
  delay?: number;
  translateX?: number;
}

const TechStackItem: React.FC<TechStackItemProps> = ({ 
  title, 
  technologies, 
  icon: Icon, 
  delay = 0,
  translateX = 0
}) => {
  const transformClass = translateX ? `transform translate-x-${translateX}` : '';
  
  return (
    <div className={`mb-6 ${transformClass}`}>
      <div className="flex items-center mb-2 group">
        <motion.div 
          className="p-2 rounded-md bg-gold/10 mr-3 group-hover:bg-gold/20 transition-colors duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="text-gold" size={18} />
        </motion.div>
        <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" pulsate={false} hover={true}>
          <h5 className="font-medium">{title}</h5>
        </TextWithGlow>
      </div>
      <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
        {technologies}
      </p>
    </div>
  );
};

export default TechStackItem;
