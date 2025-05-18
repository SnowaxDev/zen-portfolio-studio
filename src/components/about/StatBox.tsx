
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMobileUtils } from '@/hooks/use-mobile-utils';

interface StatBoxProps {
  label: string;
  value: number; // Updated to ensure value is always a number
  icon: React.ReactNode;
  className?: string;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, icon, className }) => {
  const { isMobile } = useMobileUtils();
  
  return (
    <motion.div
      whileHover={{ scale: isMobile ? 1.01 : 1.03 }}
      className={cn(
        "group p-4 md:p-6 border border-white/10 rounded-xl flex items-center justify-between bg-card/50 hover:bg-card/70 transition-colors backdrop-blur-sm",
        className
      )}
    >
      <div className="space-y-2">
        <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
      </div>
      
      <div className="bg-gold/10 p-2 md:p-3 rounded-full text-gold group-hover:bg-gold/20 transition-colors">
        {icon}
      </div>
    </motion.div>
  );
};

export default StatBox;
