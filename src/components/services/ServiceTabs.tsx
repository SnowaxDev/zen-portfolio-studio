
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface ServiceTabProps {
  icon: LucideIcon;
  label: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
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

const ServiceTab: React.FC<ServiceTabProps> = ({ icon: Icon, label, isActive, onClick }) => {
  const { shouldReduceAnimations } = useMobileAnimationSettings();
  
  return (
    <motion.button
      className={cn(
        "flex items-center gap-3 px-5 py-3.5 rounded-lg transition-all duration-200 relative",
        isActive 
          ? "text-black font-semibold"
          : "text-zinc-300 hover:text-zinc-100"
      )}
      onClick={onClick}
      whileHover={{ 
        scale: isActive ? 1 : 1.05,
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.span
          layoutId="activeServiceTab"
          className="absolute inset-0 rounded-lg z-0"
          initial={false}
          animate={{
            background: shouldReduceAnimations 
              ? "linear-gradient(to right, #eab308, #fbbf24)" 
              : ["linear-gradient(to right, #eab308, #fbbf24)", "linear-gradient(to right, #facc15, #fbbf24)"]
          }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 30,
            background: { 
              duration: 1.5, 
              repeat: shouldReduceAnimations ? 0 : Infinity, 
              repeatType: "reverse" 
            }
          }}
        />
      )}
      
      <span className="relative z-10">
        <Icon className={cn(
          "w-5 h-5 transition-transform", 
          isActive ? "text-black" : "text-zinc-300"
        )} />
      </span>
      
      <span className="relative z-10">{label}</span>
      
      {/* Add subtle shine effect when active */}
      {isActive && !shouldReduceAnimations && (
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-[1] rounded-lg"
          initial={{ x: -200, opacity: 0.3 }}
          animate={{ x: 200, opacity: 0.3 }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            repeatDelay: 0.5,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
};

const ServiceTabs: React.FC<ServiceTabsProps> = ({ tabs, selectedValue, onValueChange }) => {
  const { getAnimationDuration } = useMobileAnimationSettings();
  
  return (
    <div className="w-full mb-10">
      <div className="flex justify-center overflow-x-auto pb-2">
        <motion.div 
          className="bg-black/60 backdrop-blur-md p-2 rounded-xl shadow-xl border border-white/10 flex"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: getAnimationDuration(0.5), ease: "easeOut" }}
        >
          {tabs.map((tab) => (
            <ServiceTab
              key={tab.value}
              icon={tab.icon}
              label={tab.label}
              value={tab.value}
              isActive={selectedValue === tab.value}
              onClick={() => onValueChange(tab.value)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceTabs;
