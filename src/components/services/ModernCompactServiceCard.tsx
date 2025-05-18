
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
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <motion.div 
        whileHover={{ 
          y: -5, 
          boxShadow: highlight 
            ? "0 20px 30px -10px rgba(212, 175, 55, 0.15)" 
            : "0 20px 30px -10px rgba(0, 0, 0, 0.3)"
        }}
        className="h-full"
      >
        <Card className={cn(
          "h-full overflow-hidden transition-all duration-300",
          highlight 
            ? "border-gold/20 hover:border-gold/50 bg-gradient-to-b from-black/60 to-card/80" 
            : "border-white/10 hover:border-white/30 bg-gradient-to-b from-black/40 to-card/60",
          className
        )}>
          <CardContent className="p-5 h-full flex flex-col">
            <div className="flex items-center space-x-4 mb-3">
              <motion.div 
                className={cn(
                  "p-2 rounded-lg", 
                  highlight ? "bg-gold/10" : "bg-white/5"
                )}
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Icon className={cn(
                  "h-6 w-6", 
                  highlight ? "text-gold" : "text-foreground"
                )} />
              </motion.div>
              <h3 className={cn(
                "font-bold", 
                highlight ? "text-gold" : "text-foreground"
              )}>
                {title}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            
            <div className="mt-auto">
              <div className="flex items-baseline">
                <span className={cn(
                  "text-lg font-bold", 
                  highlight ? "text-gold" : "text-foreground"
                )}>
                  {price}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  {priceType}
                </span>
              </div>
              
              <motion.button
                className={cn(
                  "mt-3 w-full py-1.5 text-sm rounded-md transition-colors",
                  highlight 
                    ? "bg-transparent border border-gold/50 text-gold hover:bg-gold/10" 
                    : "bg-transparent border border-white/10 text-foreground hover:bg-white/5"
                )}
                whileHover={{ scale: 1.02 }}
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
