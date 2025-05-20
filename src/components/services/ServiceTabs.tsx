
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface ServiceTabProps {
  icon: LucideIcon;
  label: string;
  value: string;
  isActive: boolean;
  index: number;
}

interface ServiceTabsProps {
  tabs: Array<{
    value: string;
    icon: LucideIcon;
    label: string;
  }>;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const ServiceTab: React.FC<ServiceTabProps> = ({ icon: Icon, label, value, isActive, index }) => {
  const { shouldReduceAnimations } = useMobileAnimationSettings();
  
  // Animation variants for tab items
  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 + (index * 0.1),
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      y: shouldReduceAnimations ? 0 : -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <motion.div
      variants={tabVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className="relative"
    >
      <TabsTrigger 
        value={value}
        className={cn(
          "flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all relative",
          isActive 
            ? "text-black font-semibold"
            : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        {/* Enhanced active background with improved animation */}
        {isActive && (
          <motion.span
            layoutId="activeServiceTab"
            className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.3 } 
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3 } 
            }}
            // Add subtle pulsing glow effect
            whileInView={{
              boxShadow: ["0px 0px 0px 0px rgba(234, 179, 8, 0.0)", "0px 0px 15px 2px rgba(234, 179, 8, 0.3)", "0px 0px 0px 0px rgba(234, 179, 8, 0.0)"],
              transition: {
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        )}
        
        {/* Icon with enhanced animation */}
        <motion.span 
          className="relative z-10"
          whileHover={{ 
            rotate: shouldReduceAnimations ? 0 : [0, -10, 10, -5, 0],
            transition: { duration: 0.5 } 
          }}
        >
          <Icon className={cn(
            "w-5 h-5", 
            isActive ? "text-black" : "text-zinc-400"
          )} />
        </motion.span>
        
        {/* Label with subtle text effects */}
        <span className="relative z-10 font-medium">
          {isActive ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          ) : (
            label
          )}
        </span>
      </TabsTrigger>
    </motion.div>
  );
};

const ServiceTabs: React.FC<ServiceTabsProps> = ({ tabs, selectedValue, onValueChange }) => {
  const { shouldReduceAnimations } = useMobileAnimationSettings();
  
  // Container animation
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full"
    >
      <Tabs
        value={selectedValue}
        onValueChange={onValueChange}
        className="w-full"
      >
        <div className="flex justify-center">
          <TabsList className="bg-zinc-900/80 backdrop-blur-sm p-1.5 rounded-2xl mb-8 shadow-xl shadow-black/10 border border-zinc-800/50">
            {tabs.map((tab, index) => (
              <ServiceTab
                key={tab.value}
                icon={tab.icon}
                label={tab.label}
                value={tab.value}
                isActive={selectedValue === tab.value}
                index={index}
              />
            ))}
          </TabsList>
        </div>
      </Tabs>
    </motion.div>
  );
};

export default ServiceTabs;
