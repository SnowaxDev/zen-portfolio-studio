
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ServiceCardProps {
  title: string;
  description: string;
  price: number | string | null;
  isOneTime?: boolean;
  features: string[];
  isPrimary?: boolean;
  isCustom?: boolean;
  ctaText?: string;
  onButtonClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  isOneTime = true,
  features,
  isPrimary = false,
  isCustom = false,
  ctaText = "Objednat",
  onButtonClick
}) => {
  const { shouldReduceAnimations } = useMobileAnimationSettings();
  
  // Format price display
  const formatPrice = () => {
    if (price === null) return isCustom ? "Dle konzultace" : "Kontaktujte nás";
    if (typeof price === 'number') return price.toLocaleString();
    return price;
  };
  
  const priceDisplay = formatPrice();
  const showPriceType = price !== null && !isCustom;
  
  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.97 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { 
      y: shouldReduceAnimations ? 0 : -10,
      scale: shouldReduceAnimations ? 1 : 1.03,
      boxShadow: isPrimary 
        ? "0 25px 50px -12px rgba(234, 179, 8, 0.25)" 
        : isCustom
          ? "0 25px 50px -12px rgba(139, 92, 246, 0.25)" 
          : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Features animation
  const featureVariants = {
    initial: { opacity: 0, x: -10 },
    animate: (i: number) => ({
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.3 + (i * 0.1),
        duration: 0.4
      }
    })
  };
  
  // Button animation
  const buttonVariants = {
    hover: { 
      scale: shouldReduceAnimations ? 1 : 1.05,
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.97 }
  };
  
  // Shimmer animation for the card
  const shimmerVariants = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      },
    },
  };
  
  return (
    <motion.div
      className="h-full"
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={cn(
        "h-full rounded-2xl border-2 bg-gradient-to-b p-6 flex flex-col relative overflow-hidden",
        isPrimary 
          ? "from-zinc-900 to-black border-yellow-500/30" 
          : isCustom
            ? "from-zinc-900 to-black border-purple-500/30" 
            : "from-zinc-900 to-black border-zinc-800"
      )}>
        {/* Shimmer effect */}
        {(isPrimary || isCustom) && !shouldReduceAnimations && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              backgroundSize: '200% 100%',
            }}
            variants={shimmerVariants}
            animate="animate"
          />
        )}
        
        {/* Popular badge */}
        {isPrimary && (
          <motion.div
            className="absolute -top-3 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-yellow-500 text-black px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
              Nejoblíbenější
            </span>
          </motion.div>
        )}
        
        {/* Custom badge */}
        {isCustom && (
          <motion.div
            className="absolute -top-3 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-purple-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
              Individuální
            </span>
          </motion.div>
        )}
        
        {/* Card Content */}
        <div className={cn(
          "flex flex-col h-full",
          (isPrimary || isCustom) ? "pt-3" : ""
        )}>
          {/* Title */}
          <motion.h3 
            className={cn(
              "text-xl font-bold mb-2",
              isPrimary ? "text-yellow-500" : isCustom ? "text-purple-400" : "text-white"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="text-sm text-zinc-400 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
          
          {/* Price */}
          <motion.div 
            className="mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-baseline">
              <span className={cn(
                "text-3xl font-bold",
                isPrimary ? "text-yellow-500" : isCustom ? "text-purple-400" : "text-white"
              )}>
                {priceDisplay}
              </span>
              {showPriceType && (
                <span className="text-zinc-400 ml-2">
                  Kč {isOneTime ? "jednorázově" : "měsíčně"}
                </span>
              )}
            </div>
            
            {showPriceType && (
              <div className="mt-1.5 flex items-center">
                <div className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  isOneTime
                    ? "bg-blue-500/20 text-blue-300" 
                    : "bg-green-500/20 text-green-300"
                )}>
                  {isOneTime 
                    ? 'Jednorázová platba' 
                    : 'Měsíční platba'}
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1.5 text-zinc-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {isOneTime 
                          ? 'Jednorázová platba za kompletní dodání služby' 
                          : 'Opakovaná měsíční platba za průběžné poskytování služby'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </motion.div>
          
          {/* Features */}
          <div className="flex-grow mb-5">
            <motion.h4 
              className="font-medium text-sm mb-3 text-zinc-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Co je zahrnuto:
            </motion.h4>
            
            <ul className="space-y-2.5">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start text-sm"
                  custom={index}
                  variants={featureVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className={cn(
                    "mr-2.5 mt-0.5 p-1 rounded-full",
                    isPrimary 
                      ? "bg-yellow-500/10" 
                      : isCustom
                        ? "bg-purple-500/10" 
                        : "bg-green-500/10"
                  )}>
                    <Check className={cn(
                      "h-3 w-3", 
                      isPrimary ? "text-yellow-500" : isCustom ? "text-purple-400" : "text-green-400"
                    )} />
                  </div>
                  <span className="text-zinc-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* CTA Button */}
          <div className="mt-auto">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                className={cn(
                  "w-full relative overflow-hidden", 
                  isPrimary 
                    ? "bg-yellow-500 hover:bg-yellow-400 text-black" 
                    : isCustom
                      ? "bg-purple-500 hover:bg-purple-400 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white"
                )}
                onClick={onButtonClick}
              >
                <motion.span 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ 
                    x: '100%', 
                    opacity: shouldReduceAnimations ? 0 : 1,
                    transition: { duration: 0.7 }
                  }}
                />
                {isCustom ? "Nezávazná konzultace" : ctaText}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
