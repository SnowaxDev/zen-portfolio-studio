
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface CompactServiceCardV2Props {
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

const CompactServiceCardV2: React.FC<CompactServiceCardV2Props> = ({
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
  const { shouldReduceAnimations } = useMobileAnimationSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: shouldReduceAnimations ? 0 : -5,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <div className={cn(
        "group h-full rounded-xl border-2 p-5 flex flex-col overflow-hidden transition-all duration-300",
        highlight 
          ? "border-yellow-500/30 bg-gradient-to-b from-zinc-900/80 to-black hover:border-yellow-500/70 shadow-lg shadow-yellow-500/5" 
          : "border-zinc-800/70 bg-gradient-to-b from-zinc-900/50 to-black hover:border-zinc-700",
        className
      )}>
        {/* Enhanced hover effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={cn(
            "h-full w-full",
            highlight ? "bg-yellow-500/5" : "bg-zinc-800/10"
          )}></div>
        </div>
        
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute -inset-x-full top-0 bottom-0 h-full w-[200%] opacity-0 group-hover:opacity-100"
          style={{
            background: highlight 
              ? 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.08), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
            backgroundSize: '200% 100%'
          }}
          animate={{ 
            x: ['100%', '-100%'],
            transition: { duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: "linear" } 
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
              highlight ? "bg-yellow-500/20" : "bg-zinc-800"
            )}
            whileHover={{ 
              rotate: shouldReduceAnimations ? 0 : [0, -10, 10, -5, 0], 
              scale: shouldReduceAnimations ? 1 : 1.05, 
              transition: { duration: 0.5 } 
            }}
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
            <motion.div 
              className="flex items-baseline mb-3"
              whileHover={{ 
                scale: shouldReduceAnimations ? 1 : 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <span className={cn(
                "text-2xl font-bold",
                highlight ? "text-yellow-500" : "text-white"
              )}>
                {price}
              </span>
              <span className="text-zinc-400 text-xs ml-2">{priceType}</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: shouldReduceAnimations ? 1 : 1.02 }}
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
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: highlight 
                      ? 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.15), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ 
                    x: shouldReduceAnimations ? "-100%" : "100%", 
                    opacity: shouldReduceAnimations ? 0 : 1,
                    transition: { duration: 0.6 }
                  }}
                />
                {buttonText}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompactServiceCardV2;
