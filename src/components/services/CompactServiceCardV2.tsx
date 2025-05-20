
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

  // Improved card container animation with better hover
  const containerVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5
      }
    },
    hover: {
      y: shouldReduceAnimations ? 0 : -8,
      scale: shouldReduceAnimations ? 1 : 1.03,
      boxShadow: highlight 
        ? "0px 20px 25px -5px rgba(234, 179, 8, 0.25)" 
        : "0px 20px 25px -5px rgba(0, 0, 0, 0.25)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    hover: {
      rotate: shouldReduceAnimations ? 0 : [0, -10, 10, -5, 0],
      scale: shouldReduceAnimations ? 1 : 1.15,
      transition: { 
        duration: 0.5 
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      variants={containerVariants}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full w-full"
    >
      <div className={cn(
        "h-full w-full rounded-xl border-2 p-5 flex flex-col overflow-hidden transition-all duration-300 relative",
        highlight 
          ? "border-yellow-500/30 bg-gradient-to-b from-zinc-900/80 to-black hover:border-yellow-500/70 shadow-lg shadow-yellow-500/5" 
          : "border-zinc-800/70 bg-gradient-to-b from-zinc-900/50 to-black hover:border-zinc-700",
        className
      )}>
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute -inset-x-full top-0 bottom-0 h-full w-[200%] opacity-0"
          style={{
            background: highlight 
              ? 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.10), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent)',
            backgroundSize: '200% 100%'
          }}
          variants={{
            hover: {
              x: ['100%', '-100%'],
              opacity: 1,
              transition: { 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: 'loop', 
                ease: "linear" 
              }
            }
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
              highlight ? "bg-yellow-500/20" : "bg-zinc-800"
            )}
            variants={iconVariants}
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
            {/* Price with static appearance */}
            <div className="flex items-baseline mb-3">
              <span className={cn(
                "text-2xl font-bold",
                highlight ? "text-yellow-500" : "text-white"
              )}>
                {price}
              </span>
              <span className="text-zinc-400 text-xs ml-2">{priceType}</span>
            </div>
            
            {/* Button with improved hover animation */}
            <motion.div
              whileHover={{ 
                scale: shouldReduceAnimations ? 1 : 1.03 
              }}
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
