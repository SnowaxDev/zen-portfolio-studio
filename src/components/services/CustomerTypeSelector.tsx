
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface CustomerType {
  value: string;
  label: string;
}

interface CustomerTypeSelectorProps {
  options: CustomerType[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const CustomerTypeSelector: React.FC<CustomerTypeSelectorProps> = ({
  options,
  selectedValue,
  onChange
}) => {
  const selectedIndex = options.findIndex(option => option.value === selectedValue);
  const { getAnimationDuration, shouldReduceAnimations } = useMobileAnimationSettings();
  
  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto mb-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: getAnimationDuration(0.5), delay: 0.2, ease: "easeOut" }}
    >
      <div className="bg-black/60 backdrop-blur-md rounded-xl p-1.5 flex mx-auto relative z-10 shadow-xl border border-white/10">
        {/* Background highlight */}
        <motion.div 
          className="absolute h-full top-0 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg z-0"
          style={{ width: `${100 / options.length}%` }}
          initial={false}
          animate={{ 
            left: `${selectedIndex * (100 / options.length)}%` 
          }}
          transition={{ 
            type: "spring", 
            stiffness: shouldReduceAnimations ? 300 : 400, 
            damping: shouldReduceAnimations ? 35 : 30 
          }}
        />
        
        {options.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium z-10 transition-colors duration-200",
              selectedValue === option.value 
                ? "text-black font-semibold" 
                : "text-zinc-300 hover:text-zinc-100"
            )}
            whileHover={{ 
              scale: selectedValue === option.value ? 1 : 1.05,
              transition: { duration: 0.2 } 
            }}
            whileTap={{ scale: 0.98 }}
          >
            {option.label}
          </motion.button>
        ))}
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 -z-10 bg-yellow-500/10 blur-xl rounded-full opacity-50" />
      </div>
    </motion.div>
  );
};

export default CustomerTypeSelector;
