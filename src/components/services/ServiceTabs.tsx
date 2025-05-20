
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ServiceTabProps {
  icon: LucideIcon;
  label: string;
  value: string;
  isActive: boolean;
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

const ServiceTab: React.FC<ServiceTabProps> = ({ icon: Icon, label, value, isActive }) => {
  return (
    <TabsTrigger 
      value={value}
      className={cn(
        "flex items-center gap-2 px-4 py-3 rounded-xl transition-all relative data-[state=active]:text-black",
        isActive 
          ? "text-black font-semibold" 
          : "text-zinc-400 hover:text-zinc-200"
      )}
    >
      {/* Active background with improved animation */}
      {isActive && (
        <motion.span
          layoutId="activeServiceTab"
          className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl"
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        />
      )}
      
      <span className="relative z-10">
        <Icon className={cn(
          "w-5 h-5", 
          isActive ? "text-black" : "text-zinc-400"
        )} />
      </span>
      
      <span className="relative z-10 font-medium">
        {label}
      </span>
    </TabsTrigger>
  );
};

const ServiceTabs: React.FC<ServiceTabsProps> = ({ tabs, selectedValue, onValueChange }) => {
  return (
    <Tabs
      value={selectedValue}
      onValueChange={onValueChange}
      className="w-full"
    >
      <div className="flex justify-center">
        <TabsList className="bg-zinc-900/80 p-1.5 rounded-2xl mb-8 shadow-xl shadow-black/10">
          {tabs.map((tab) => (
            <ServiceTab
              key={tab.value}
              icon={tab.icon}
              label={tab.label}
              value={tab.value}
              isActive={selectedValue === tab.value}
            />
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
};

export default ServiceTabs;
