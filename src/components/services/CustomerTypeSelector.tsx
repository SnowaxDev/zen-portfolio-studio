
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
    <div className="relative w-full max-w-lg mx-auto mb-8">
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-1.5 flex max-w-sm mx-auto relative z-10 shadow-xl shadow-black/10 border border-zinc-800/50">
        {/* Background highlight */}
        <motion.div 
          className="absolute h-full top-0 bg-yellow-500 rounded-lg"
          style={{ width: `${100 / options.length}%` }}
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
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium z-10",
              selectedValue === option.value ? "text-black" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomerTypeSelector;
