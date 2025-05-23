
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <motion.button
      className={cn(
        "flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2.5 md:py-3.5 rounded-lg transition-all duration-200 relative text-sm md:text-base whitespace-nowrap",
        isActive 
          ? "text-black font-semibold"
          : "text-zinc-300 hover:text-zinc-100"
      )}
      onClick={onClick}
      whileHover={{ 
        scale: isActive ? 1 : (isMobile ? 1 : 1.05),
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
          "w-4 h-4 md:w-5 md:h-5 transition-transform", 
          isActive ? "text-black" : "text-zinc-300"
        )} />
      </span>
      
      <span className="relative z-10 hidden sm:inline">{label}</span>
      
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
    <div className="w-full mb-6 md:mb-10">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl overflow-x-auto pb-2">
          <motion.div 
            className="bg-black/60 backdrop-blur-md p-1.5 md:p-2 rounded-xl shadow-xl border border-white/10 flex gap-1 min-w-max mx-auto"
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
    </div>
  );
};

export default ServiceTabs;
