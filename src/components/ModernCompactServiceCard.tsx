
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
    getAnimationEasing,
    getSmoothExitProps
  } = useMobileAnimationSettings();

  // Container animation variants with improved hover scaling
  const containerVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: getAnimationDuration(0.4),
        ease: getAnimationEasing()
      }
    },
    hover: {
      scale: shouldReduceAnimations ? 1 : 1.03,  // Increased scale factor
      y: shouldReduceAnimations ? 0 : -8,       // More noticeable lift
      boxShadow: highlight 
        ? "0 20px 30px -15px rgba(234, 179, 8, 0.3)" 
        : "0 20px 30px -15px rgba(0, 0, 0, 0.2)",
      transition: { 
        duration: getAnimationDuration(0.3),
        ease: getAnimationEasing()
      }
    },
    exit: getSmoothExitProps().exitVariant
  };

  // Card content animation for staggered children
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  // Individual element animations
  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: getAnimationDuration(0.3),
        ease: getAnimationEasing()
      }
    }
  };

  // Icon animation 
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: getAnimationDuration(0.4),
        ease: "backOut" 
      }
    },
    hover: {
      rotate: shouldReduceAnimations ? 0 : [0, -5, 5, 0],
      scale: shouldReduceAnimations ? 1 : 1.1,
      transition: { 
        duration: getAnimationDuration(0.5),
        ease: "easeInOut" 
      }
    }
  };

  return (
    <motion.div
      className="h-full w-full" // Ensure container takes up full space
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      exit="exit"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className={cn(
        "h-full rounded-2xl border-2 bg-black p-5 flex flex-col relative overflow-hidden transition-all duration-300",
        highlight ? "border-yellow-500/40" : "border-zinc-800",
        className
      )}>
        {/* Enhanced background shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0"
          variants={{
            hover: { 
              opacity: shouldReduceAnimations ? 0 : 0.15,
              transition: { duration: 0.5 }
            }
          }}
        >
          <div className={cn(
            "absolute inset-0",
            highlight 
              ? "bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent" 
              : "bg-gradient-to-br from-zinc-500/5 via-transparent to-transparent"
          )} />
        </motion.div>
        
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute -inset-x-full top-0 bottom-0 h-full w-[300%]"
          style={{
            background: highlight 
              ? 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.15), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent)',
            backgroundSize: '200% 100%'
          }}
          variants={{
            hover: {
              x: shouldReduceAnimations ? '100%' : ['100%', '-100%'],
              transition: { 
                duration: 1.5, 
                repeat: shouldReduceAnimations ? 0 : Infinity, 
                repeatType: 'loop', 
                ease: "linear" 
              }
            }
          }}
        />
        
        <motion.div 
          className="relative z-10 flex flex-col h-full"
          variants={contentVariants}
        >
          {/* Icon with enhanced animation */}
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
          
          {/* Title with animation */}
          <motion.h3 
            className={cn(
              "text-xl font-bold mb-2",
              highlight ? "text-yellow-500" : "text-white"
            )}
            variants={itemVariants}
          >
            {title}
          </motion.h3>
          
          {/* Description with animation */}
          <motion.p 
            className="text-zinc-400 text-sm mb-4 flex-grow"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          
          <div className="mt-auto">
            {/* Price with static appearance (no hover effect) */}
            <motion.div 
              className="flex items-baseline mb-3"
              variants={itemVariants}
            >
              <span className={cn(
                "text-2xl font-bold",
                highlight ? "text-yellow-500" : "text-white"
              )}>
                {price}
              </span>
              <span className="text-zinc-400 text-xs ml-2">{priceType}</span>
            </motion.div>
            
            {/* Button with improved animation but no hover scaling */}
            <motion.div variants={itemVariants}>
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
                {/* Improved button shine effect */}
                <motion.span
                  className={cn(
                    "absolute inset-0 opacity-0",
                    highlight 
                      ? "bg-gradient-to-r from-yellow-500/0 via-yellow-500/30 to-yellow-500/0" 
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModernCompactServiceCard;
