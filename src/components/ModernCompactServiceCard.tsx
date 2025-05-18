
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ModernCompactServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  priceType?: string;
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
  priceType = "jednorázově",
  className = '',
  highlight = false,
  buttonText = "Více informací",
  onButtonClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <motion.div 
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 },
        }}
        className="h-full"
      >
        <div className={cn(
          "h-full rounded-2xl border-2 bg-black p-5 flex flex-col relative overflow-hidden",
          highlight ? "border-yellow-500/40" : "border-zinc-800",
          className
        )}>
          <motion.div
            whileHover={{ 
              rotate: [0, -10, 10, -5, 0], 
              scale: 1.05,
              transition: { duration: 0.5 }
            }}
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
              highlight ? "bg-yellow-500/20" : "bg-zinc-800"
            )}
          >
            <Icon className={cn(
              "w-6 h-6",
              highlight ? "text-yellow-500" : "text-zinc-300"
            )} />
          </motion.div>
          
          <h3 className={cn(
            "text-xl font-bold mb-2",
            highlight ? "text-yellow-500" : "text-white"
          )}>
            {title}
          </h3>
          
          <p className="text-zinc-400 text-sm mb-4 flex-grow">
            {description}
          </p>
          
          <div className="mt-auto">
            <div className="flex items-baseline mb-3">
              <span className={cn(
                "text-2xl font-bold",
                highlight ? "text-yellow-500" : "text-white"
              )}>
                {price}
              </span>
              <span className="text-zinc-400 text-xs ml-2">{priceType}</span>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                onClick={onButtonClick}
                className={cn(
                  "w-full border relative overflow-hidden",
                  highlight 
                    ? "border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10" 
                    : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                )}
              >
                <motion.span
                  className={cn(
                    "absolute inset-0 opacity-0",
                    highlight 
                      ? "bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0" 
                      : "bg-gradient-to-r from-zinc-700/0 via-zinc-700/30 to-zinc-700/0"
                  )}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%", opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                {buttonText}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModernCompactServiceCard;
