
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

interface ModernCompactServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  priceType: string;
  className?: string;
  highlight?: boolean;
}

const ModernCompactServiceCard: React.FC<ModernCompactServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  price,
  priceType,
  className = '',
  highlight = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <motion.div 
        whileHover={{ 
          y: -5, 
          transition: { duration: 0.2 },
          boxShadow: highlight 
            ? "0 15px 30px -10px rgba(242, 201, 76, 0.25)" 
            : "0 15px 25px -10px rgba(0, 0, 0, 0.35)"
        }}
        className="h-full"
      >
        <Card className={cn(
          "h-full overflow-hidden transition-all duration-200 border-2",
          highlight 
            ? "border-yellow-500/30 hover:border-yellow-500/60 bg-gradient-to-b from-zinc-900 to-black/90" 
            : "border-zinc-800 hover:border-zinc-700 bg-gradient-to-b from-zinc-900 to-black/80",
          className
        )}>
          <CardContent className="p-5 h-full flex flex-col">
            <div className="flex items-center space-x-4 mb-3">
              <motion.div 
                className={cn(
                  "p-2 rounded-lg", 
                  highlight ? "bg-yellow-500/20" : "bg-zinc-800"
                )}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
              >
                <Icon className={cn(
                  "h-6 w-6", 
                  highlight ? "text-yellow-500" : "text-yellow-100/80"
                )} />
              </motion.div>
              <h3 className={cn(
                "font-bold", 
                highlight ? "text-yellow-500" : "text-yellow-100"
              )}>
                {title}
              </h3>
            </div>
            
            <p className="text-sm text-zinc-400 mb-4">{description}</p>
            
            <div className="mt-auto">
              <div className="flex items-baseline">
                <span className={cn(
                  "text-lg font-bold", 
                  highlight ? "text-yellow-500" : "text-yellow-100"
                )}>
                  {price}
                </span>
                <span className="text-xs text-zinc-400 ml-1">
                  {priceType}
                </span>
              </div>
              
              <motion.button
                className={cn(
                  "mt-3 w-full py-1.5 text-sm rounded-md transition-colors",
                  highlight 
                    ? "bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20" 
                    : "bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                )}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                Více informací
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ModernCompactServiceCard;
