
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
  
  // Animation variants
  const tabVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 + (index * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: shouldReduceAnimations ? 1 : 1.05,
      y: shouldReduceAnimations ? 0 : -2,
      transition: { type: "spring", stiffness: 400, damping: 17 }
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
    >
      <TabsTrigger 
        value={value}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative",
          isActive 
            ? "text-black font-semibold"
            : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        {isActive && (
          <motion.span
            layoutId="activeServiceTab"
            className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        <motion.span 
          className="relative z-10"
          whileHover={{ 
            rotate: shouldReduceAnimations ? 0 : [0, -5, 5, 0],
            scale: shouldReduceAnimations ? 1 : 1.15,
            transition: { duration: 0.4 } 
          }}
        >
          <Icon className={cn(
            "w-5 h-5", 
            isActive ? "text-black" : "text-zinc-400"
          )} />
        </motion.span>
        
        <span className="relative z-10">{label}</span>
      </TabsTrigger>
    </motion.div>
  );
};

const ServiceTabs: React.FC<ServiceTabsProps> = ({ tabs, selectedValue, onValueChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-10"
    >
      <Tabs
        value={selectedValue}
        onValueChange={onValueChange}
        className="w-full"
      >
        <div className="flex justify-center overflow-x-auto pb-2">
          <TabsList className="bg-zinc-900/80 backdrop-blur-sm p-1.5 rounded-xl shadow-lg shadow-black/10 border border-zinc-800/50">
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
