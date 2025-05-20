
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
  const { shouldReduceAnimations } = useMobileAnimationSettings();
  const selectedIndex = options.findIndex(option => option.value === selectedValue);
  
  return (
    <div className="bg-zinc-900/80 rounded-2xl p-1.5 flex max-w-sm mx-auto relative shadow-xl shadow-black/10">
      {/* Moving background with smoother animation */}
      <motion.div 
        className="absolute h-full top-0 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl"
        style={{ 
          width: `${100 / options.length}%` 
        }}
        animate={{ 
          left: `${selectedIndex * (100 / options.length)}%` 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30 
        }}
      />
      
      {options.map((option) => (
        <motion.button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors relative z-10",
            selectedValue === option.value ? "text-black" : "text-zinc-400"
          )}
          whileHover={selectedValue !== option.value ? { scale: shouldReduceAnimations ? 1 : 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          {option.label}
        </motion.button>
      ))}
    </div>
  );
};

export default CustomerTypeSelector;
