
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useMobileUtils } from '../../hooks/use-mobile-utils';

interface StatBoxProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, icon, className }) => {
  const { isMobile } = useMobileUtils();
  
  return (
    <motion.div
      whileHover={{ scale: isMobile ? 1.01 : 1.03 }}
      className={cn(
        "group p-4 md:p-6 border border-white/10 rounded-xl flex items-center justify-between bg-card/50 hover:bg-card/70 transition-colors backdrop-blur-sm relative overflow-hidden",
        className
      )}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="space-y-2 relative z-10">
        <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100,
            duration: 0.8,
            delay: 0.2
          }}
          className="relative"
        >
          <motion.p 
            className="text-2xl md:text-3xl font-bold text-foreground"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            {value}
          </motion.p>
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-gold/10 p-2 md:p-3 rounded-full text-gold group-hover:bg-gold/20 transition-colors relative z-10"
        whileHover={{ 
          rotate: [0, -10, 10, -5, 0],
          transition: { duration: 0.5 }
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

export default StatBox;
