
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

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
  const { 
    shouldReduceAnimations,
    getAnimationDuration,
    getAnimationEasing
  } = useMobileAnimationSettings();

  // Enhanced card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: getAnimationDuration(0.4),
        ease: getAnimationEasing()
      }
    },
    hover: {
      y: shouldReduceAnimations ? 0 : -5,
      boxShadow: highlight 
        ? "0 15px 30px -10px rgba(234, 179, 8, 0.4)" 
        : "0 15px 30px -10px rgba(0, 0, 0, 0.4)",
      transition: { 
        duration: getAnimationDuration(0.2),
        ease: getAnimationEasing()
      }
    }
  };

  // Icon animation for more engaging interaction
  const iconVariants = {
    hover: {
      rotate: shouldReduceAnimations ? 0 : [0, -10, 10, -5, 0],
      scale: shouldReduceAnimations ? 1 : 1.05,
      transition: { duration: 0.5 }
    }
  };
  
  // Button hover effect with shimmer
  const buttonVariants = {
    hover: {
      scale: shouldReduceAnimations ? 1 : 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className="h-full"
    >
      <motion.div 
        whileHover={shouldReduceAnimations ? {} : "hover"} 
        className="h-full"
      >
        <div className={cn(
          "h-full rounded-2xl border-2 bg-black p-5 flex flex-col relative overflow-hidden transition-all duration-300",
          highlight ? "border-yellow-500/40" : "border-zinc-800",
          className
        )}>
          {/* Animated shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ 
              opacity: shouldReduceAnimations ? 0 : 1,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="absolute -inset-x-full top-0 bottom-0 h-full w-[200%]"
              style={{
                background: highlight 
                  ? 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.08), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
                backgroundSize: '200% 100%'
              }}
              animate={shouldReduceAnimations ? {} : { 
                x: ['100%', '-100%'],
                transition: { 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: 'loop', 
                  ease: "linear" 
                } 
              }}
            />
          </motion.div>
          
          {/* Icon with interactive animation */}
          <motion.div 
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
              highlight ? "bg-yellow-500/20" : "bg-zinc-800"
            )}
            whileHover="hover"
            variants={iconVariants}
          >
            <Icon className={cn(
              "w-6 h-6",
              highlight ? "text-yellow-500" : "text-zinc-300"
            )} />
          </motion.div>
          
          {/* Title and description */}
          <h3 className={cn(
            "text-xl font-bold mb-2",
            highlight ? "text-yellow-500" : "text-white"
          )}>
            {title}
          </h3>
          
          <p className="text-zinc-400 text-sm mb-4 flex-grow">
            {description}
          </p>
          
          {/* Price with subtle animation */}
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
            
            {/* Enhanced button */}
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
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
                  whileHover={{ 
                    x: shouldReduceAnimations ? "-100%" : "100%", 
                    opacity: shouldReduceAnimations ? 0 : 1 
                  }}
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
