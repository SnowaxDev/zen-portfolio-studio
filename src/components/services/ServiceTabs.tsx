
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        "flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all relative data-[state=active]:text-black",
        isActive 
          ? "text-black font-medium" 
          : "text-zinc-400 hover:text-zinc-200"
      )}
    >
      {/* Active background with improved animation */}
      {isActive && (
        <motion.span
          layoutId="activeServiceTab"
          className="absolute inset-0 bg-yellow-500 rounded-lg"
          transition={{ 
            type: "spring", 
            stiffness: 300, 
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
      
      <span className="relative z-10">
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
        <TabsList className="bg-zinc-900/60 p-1 mb-8">
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
