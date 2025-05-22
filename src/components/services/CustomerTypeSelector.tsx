
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  
  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto mb-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <div className="bg-zinc-900 rounded-xl p-1.5 flex mx-auto relative z-10 shadow-lg border border-zinc-800">
        {/* Background highlight */}
        <motion.div 
          className="absolute h-full top-0 bg-yellow-500 rounded-lg z-0"
          style={{ width: `${100 / options.length}%` }}
          initial={false}
          animate={{ 
            left: `${selectedIndex * (100 / options.length)}%` 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30 
          }}
        />
        
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium z-10 transition-colors duration-200",
              selectedValue === option.value ? "text-black" : "text-zinc-300 hover:text-zinc-100"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CustomerTypeSelector;
