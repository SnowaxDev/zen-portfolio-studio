
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface ModernCompactServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  priceType: string;
  className?: string;
  highlight?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ModernCompactServiceCard: React.FC<ModernCompactServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  price,
  priceType,
  className = '',
  highlight = false,
  buttonText = "Více informací",
  onButtonClick
}) => {
  const { shouldReduceAnimations } = useMobileAnimationSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div className={cn(
        "h-full rounded-xl overflow-hidden border-2 transition-all duration-200 bg-zinc-900 shadow-lg",
        highlight 
          ? "border-yellow-500/50 hover:border-yellow-500" 
          : "border-zinc-800 hover:border-zinc-700",
        className
      )}>
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-center space-x-3 mb-3">
            <div className={cn(
              "p-2 rounded-lg", 
              highlight ? "bg-yellow-500/20" : "bg-zinc-800"
            )}>
              <Icon className={cn(
                "h-5 w-5", 
                highlight ? "text-yellow-500" : "text-zinc-300"
              )} />
            </div>
            <h3 className={cn(
              "font-bold", 
              highlight ? "text-yellow-500" : "text-zinc-100"
            )}>
              {title}
            </h3>
          </div>
          
          <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{description}</p>
          
          <div className="mt-auto">
            <div className="flex items-baseline mb-3">
              <span className={cn(
                "text-lg font-bold", 
                highlight ? "text-yellow-500" : "text-zinc-100"
              )}>
                {price}
              </span>
              <span className="text-xs text-zinc-400 ml-1">
                {priceType}
              </span>
            </div>
            
            <Button
              className={cn(
                "w-full text-sm",
                highlight 
                  ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
              )}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernCompactServiceCard;
