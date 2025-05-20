
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
  const { shouldReduceAnimations, animationIntensity } = useMobileAnimationSettings();
  const selectedIndex = options.findIndex(option => option.value === selectedValue);
  
  // Enhanced container variants
  const containerVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  // Button animation variants with improved hover effect
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
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };
  
  return (
    <motion.div 
      className="relative w-full max-w-xl mx-auto"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-1.5 flex max-w-sm mx-auto relative shadow-xl shadow-black/10 border border-zinc-800/50">
        {/* Moving background with enhanced animation */}
        <motion.div 
          className="absolute h-full top-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-xl"
          style={{ 
            width: `${100 / options.length}%` 
          }}
          animate={{ 
            left: `${selectedIndex * (100 / options.length)}%`,
            transition: { 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              duration: 0.4
            }
          }}
          // Enhanced pulsing effect
          whileInView={{
            boxShadow: ["0px 0px 0px 0px rgba(234, 179, 8, 0.0)", "0px 0px 20px 2px rgba(234, 179, 8, 0.4)", "0px 0px 0px 0px rgba(234, 179, 8, 0.0)"],
            transition: {
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
              "flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors relative z-10",
              selectedValue === option.value ? "text-black" : "text-zinc-400"
            )}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            {/* Enhanced text glow effect on selected item */}
            {selectedValue === option.value ? (
              <span className="relative">
                <span className="absolute inset-0 blur-sm opacity-60 bg-yellow-300 rounded-full" />
                <span className="relative">{option.label}</span>
              </span>
            ) : (
              option.label
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CustomerTypeSelector;
