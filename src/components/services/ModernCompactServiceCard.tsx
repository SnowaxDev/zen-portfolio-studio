
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
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
  const { 
    shouldReduceAnimations,
    getAnimationDuration,
    getSmoothExitProps
  } = useMobileAnimationSettings();

  // Add smooth exit transitions
  const { exitTransition } = getSmoothExitProps();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: getAnimationDuration(0.3) }}
      className="h-full"
    >
      <motion.div 
        whileHover={{ 
          y: shouldReduceAnimations ? 0 : -5, 
          transition: { duration: getAnimationDuration(0.15) },
          boxShadow: highlight 
            ? "0 15px 30px -10px rgba(234, 179, 8, 0.3)" 
            : "0 15px 25px -10px rgba(0, 0, 0, 0.4)"
        }}
        exit={{ 
          y: 0, 
          boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)", 
          transition: exitTransition 
        }}
        className="h-full"
      >
        <Card className={cn(
          "h-full overflow-hidden transition-all duration-200 border-2",
          highlight 
            ? "border-yellow-500/40 hover:border-yellow-500/80 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black/90" 
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
                whileHover={{ 
                  rotate: shouldReduceAnimations ? 0 : [0, -10, 10, 0], 
                  transition: { duration: 0.3 } 
                }}
                exit={{ rotate: 0, transition: { duration: 0.2 } }}
              >
                <Icon className={cn(
                  "h-5 w-5", 
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
                <motion.span 
                  className={cn(
                    "text-lg font-bold", 
                    highlight ? "text-yellow-500" : "text-yellow-100"
                  )}
                  whileHover={{ 
                    scale: shouldReduceAnimations ? 1 : 1.05,
                    transition: { duration: 0.15 } 
                  }}
                  exit={{ scale: 1, transition: { duration: 0.15 } }}
                >
                  {price}
                </motion.span>
                <span className="text-xs text-zinc-400 ml-1">
                  {priceType}
                </span>
              </div>
              
              <motion.div
                whileHover={{ 
                  scale: shouldReduceAnimations ? 1 : 1.03, 
                  transition: { duration: 0.15 } 
                }}
                whileTap={{ scale: 0.98 }}
                exit={{ scale: 1, transition: { duration: 0.15 } }}
              >
                <Button
                  className={cn(
                    "mt-3 w-full py-1.5 text-sm rounded-md relative overflow-hidden",
                    highlight 
                      ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/30" 
                      : "bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                  )}
                  onClick={onButtonClick}
                >
                  <motion.span 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: highlight 
                        ? 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.15), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                      backgroundSize: '200% 100%'
                    }}
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ 
                      x: '100%', 
                      opacity: shouldReduceAnimations ? 0 : 1,
                      transition: { duration: 0.6 }
                    }}
                    exit={{ opacity: 0 }}
                  />
                  {buttonText}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ModernCompactServiceCard;
