
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
  
  // Container animation
  const containerVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  // Button animation with subtle hover effects
  const buttonVariants = {
    initial: { opacity: 0 },
    animate: (i: number) => ({ 
      opacity: 1,
      transition: { 
        delay: 0.2 + (i * 0.1),
        duration: 0.3
      }
    }),
    hover: {
      scale: shouldReduceAnimations ? 1 : 1.05,
      y: shouldReduceAnimations ? 0 : -2,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    tap: { scale: 0.97 }
  };
  
  return (
    <motion.div 
      className="relative w-full max-w-lg mx-auto mb-8"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-1.5 flex max-w-sm mx-auto relative z-10 shadow-xl shadow-black/10 border border-zinc-800/50">
        {/* Background highlight */}
        <motion.div 
          className="absolute h-full top-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-lg"
          style={{ 
            width: `${100 / options.length}%` 
          }}
          animate={{ 
            left: `${selectedIndex * (100 / options.length)}%`,
            // Include box-shadow animation in the same animate object to avoid duplicate attributes
            boxShadow: [
              "0px 0px 0px 0px rgba(234, 179, 8, 0.0)", 
              "0px 0px 15px 2px rgba(234, 179, 8, 0.4)", 
              "0px 0px 0px 0px rgba(234, 179, 8, 0.0)"
            ]
          }}
          initial={{ boxShadow: "0px 0px 0px 0px rgba(234, 179, 8, 0.0)" }}
          transition={{
            // Position transition
            left: { 
              type: "spring", 
              stiffness: 500, 
              damping: 30
            },
            // Box shadow transition
            boxShadow: {
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
        
        {options.map((option, i) => (
          <motion.button
            key={option.value}
            custom={i}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium z-10",
              selectedValue === option.value ? "text-black" : "text-zinc-400 hover:text-zinc-200"
            )}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CustomerTypeSelector;
