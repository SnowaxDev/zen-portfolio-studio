
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  return (
    <button
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative",
        isActive 
          ? "text-black font-semibold"
          : "text-zinc-400 hover:text-zinc-200"
      )}
      onClick={() => {}}
    >
      {isActive && (
        <motion.span
          layoutId="activeServiceTab"
          className="absolute inset-0 bg-yellow-500 rounded-lg z-0"
          transition={{ duration: 0.3 }}
        />
      )}
      
      <span className="relative z-10">
        <Icon className={cn(
          "w-5 h-5", 
          isActive ? "text-black" : "text-zinc-400"
        )} />
      </span>
      
      <span className="relative z-10">{label}</span>
    </button>
  );
};

const ServiceTabs: React.FC<ServiceTabsProps> = ({ tabs, selectedValue, onValueChange }) => {
  return (
    <div className="w-full mb-10">
      <div className="flex justify-center overflow-x-auto pb-2">
        <div className="bg-zinc-900/80 backdrop-blur-sm p-1.5 rounded-xl shadow-lg shadow-black/10 border border-zinc-800/50 flex">
          {tabs.map((tab, index) => (
            <div key={tab.value} onClick={() => onValueChange(tab.value)}>
              <ServiceTab
                icon={tab.icon}
                label={tab.label}
                value={tab.value}
                isActive={selectedValue === tab.value}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceTabs;
