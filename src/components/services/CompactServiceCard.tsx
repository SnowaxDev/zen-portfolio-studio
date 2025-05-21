
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface CompactServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  priceType?: string;
  highlight?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const CompactServiceCard: React.FC<CompactServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  price,
  priceType = "jednorázově",
  highlight = false,
  buttonText = "Více informací",
  onButtonClick
}) => {
  const { shouldReduceAnimations } = useMobileAnimationSettings();
  
  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      y: shouldReduceAnimations ? 0 : -5,
      scale: shouldReduceAnimations ? 1 : 1.02,
      boxShadow: highlight 
        ? "0 15px 30px -10px rgba(234, 179, 8, 0.25)" 
        : "0 15px 30px -10px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };
  
  // Icon animation variants
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, type: "spring" }
    },
    hover: {
      rotate: shouldReduceAnimations ? 0 : [0, -5, 5, 0],
      scale: shouldReduceAnimations ? 1 : 1.1,
      transition: { duration: 0.5 }
    }
  };
  
  // Content animation stagger effect
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="h-full"
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className={cn(
        "h-full rounded-xl border p-5 flex flex-col relative overflow-hidden bg-zinc-900",
        highlight ? "border-yellow-500/30" : "border-zinc-800"
      )}>
        {/* Shimmer effect for highlighted cards */}
        {highlight && !shouldReduceAnimations && (
          <motion.div
            className="absolute -inset-x-full top-0 bottom-0 h-full w-[300%]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.07), transparent)',
              backgroundSize: '200% 100%'
            }}
            animate={{
              x: ['100%', '-100%'],
              transition: { 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }
            }}
          />
        )}
        
        <motion.div 
          className="relative z-10 flex flex-col h-full"
          variants={contentVariants}
        >
          {/* Icon with animation */}
          <motion.div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
              highlight ? "bg-yellow-500/20" : "bg-zinc-800"
            )}
            variants={iconVariants}
            whileHover="hover"
          >
            <Icon className={cn(
              "w-6 h-6",
              highlight ? "text-yellow-500" : "text-zinc-300"
            )} />
          </motion.div>
          
          {/* Title */}
          <motion.h3 
            className={cn(
              "text-lg font-bold mb-2",
              highlight ? "text-yellow-500" : "text-white"
            )}
            variants={itemVariants}
          >
            {title}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="text-sm text-zinc-400 mb-4 flex-grow"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          
          {/* Price */}
          <motion.div 
            className="flex items-baseline mb-3"
            variants={itemVariants}
          >
            <span className={cn(
              "text-xl font-bold",
              highlight ? "text-yellow-500" : "text-white"
            )}>
              {price}
            </span>
            <span className="text-zinc-400 text-xs ml-1.5">{priceType}</span>
          </motion.div>
          
          {/* Button */}
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
              {buttonText}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompactServiceCard;
