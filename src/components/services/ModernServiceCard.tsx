
import React from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Check, Info, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import TextWithGlow from '../TextWithGlow';
import { cn } from '@/lib/utils';
import { useMobileUtils } from '@/hooks/use-mobile-utils';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface ModernServiceCardProps {
  title: string;
  description: string;
  price: number | string | null;
  isOneTime?: boolean;
  features: string[];
  isPrimary?: boolean;
  className?: string;
  highlighted?: boolean;
  ctaText?: string;
  onButtonClick?: () => void;
  isCustom?: boolean;
}

const ModernServiceCard: React.FC<ModernServiceCardProps> = ({
  title,
  description,
  price,
  isOneTime = true,
  features,
  isPrimary = false,
  className,
  highlighted = false,
  ctaText = "Objednat",
  onButtonClick,
  isCustom = false
}) => {
  const { isMobile } = useMobileUtils();
  const { 
    shouldReduceAnimations, 
    getAnimationDelay, 
    getAnimationDuration,
    getAnimationEasing
  } = useMobileAnimationSettings();
  
  const controls = useAnimationControls();
  
  // Add shimmer effect to highlighted cards
  React.useEffect(() => {
    if ((highlighted || isPrimary) && !shouldReduceAnimations) {
      const runShimmer = async () => {
        await controls.start({
          backgroundPosition: ['200% 0%', '-200% 0%'],
          transition: { 
            duration: getAnimationDuration(3), 
            repeat: Infinity, 
            repeatType: 'reverse',
            ease: "linear" 
          }
        });
      };
      
      runShimmer();
    }
  }, [highlighted, isPrimary, controls, shouldReduceAnimations, getAnimationDuration]);

  // Enhanced card appearance with staggered animations and smooth exit
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: getAnimationDuration(0.5),
        ease: getAnimationEasing()
      }
    },
    hover: { 
      y: isMobile ? 0 : -5,
      scale: isMobile ? 1 : 1.02,
      boxShadow: isPrimary 
        ? "0 20px 30px -10px rgba(234, 179, 8, 0.3)" 
        : highlighted 
          ? "0 20px 30px -10px rgba(139, 92, 246, 0.3)" 
          : "0 20px 30px -15px rgba(0, 0, 0, 0.5)",
      transition: { 
        duration: getAnimationDuration(0.2),
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      transition: { 
        duration: 0.2 
      }
    }
  };

  // Features animation stagger effect with smooth exit
  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1, 
      x: 0,
      transition: { 
        delay: getAnimationDelay(0.1 * i),
        duration: getAnimationDuration(0.4),
        ease: getAnimationEasing()
      }
    }),
    exit: {
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  // Format price display based on the type of price
  const renderPrice = () => {
    // For numerical prices
    if (typeof price === 'number') {
      return price.toLocaleString();
    }
    
    // For custom solution or consultation
    if (price === null || price === '0' || (typeof price === 'string' && price === '0')) {
      return isCustom ? "Dle konzultace" : "Kontaktujte nás";
    }
    
    // For string prices (like "od 5000")
    return price;
  };

  const priceDisplay = renderPrice();
  const showPriceType = !(price === null || 
                        (typeof price === 'string' && price === '0') || 
                        (typeof price === 'number' && price === 0) || 
                        isCustom);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={shouldReduceAnimations ? undefined : "hover"}
      exit="exit"
      className="h-full"
    >
      <Card className={cn(
        "h-full overflow-hidden border-2 relative transition-all duration-300",
        isPrimary 
          ? "border-gold/30 bg-gradient-to-b from-card to-black/80 hover:border-gold/70" 
          : highlighted || isCustom
            ? "border-purple/30 bg-gradient-to-b from-card to-black/90 hover:border-purple/60"
            : "border-white/10 bg-card/50 hover:border-white/30",
        className
      )}>
        {/* Badge for primary/highlighted cards */}
        {(isPrimary || highlighted || isCustom) && (
          <motion.div 
            className="absolute -top-3 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: getAnimationDelay(0.2), duration: getAnimationDuration(0.5) }}
            exit={{ 
              opacity: 0, 
              y: -10, 
              transition: { duration: 0.2 } 
            }}
          >
            <span className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full shadow-lg",
              isPrimary 
                ? "bg-gold text-primary-foreground" 
                : isCustom
                  ? "bg-purple text-primary-foreground"
                  : "bg-purple text-primary-foreground"
            )}>
              {isPrimary ? "Nejoblíbenější" : isCustom ? "Individuální" : "Doporučeno"}
            </span>
          </motion.div>
        )}
        
        {/* Shimmer effect for highlighted cards */}
        {(highlighted || isPrimary) && !shouldReduceAnimations && (
          <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden"
            animate={controls}
            initial={{ backgroundPosition: '200% 0%' }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
              backgroundSize: '200% 100%',
            }}
            exit={{ opacity: 0 }}
          />
        )}
        
        <CardContent className={cn(
          "p-5 flex flex-col h-full",
          (isPrimary || highlighted || isCustom) ? "pt-7" : ""
        )}>
          {/* Card Header */}
          <div className="mb-4">
            <h3 className={cn(
              "text-xl font-bold mb-1.5",
              isPrimary ? "text-gold" : (highlighted || isCustom) ? "text-purple-light" : "text-foreground"
            )}>
              {isPrimary || highlighted || isCustom ? (
                <TextWithGlow 
                  intensity="medium" 
                  color={isPrimary ? "rgba(212, 175, 55, 0.8)" : "rgba(139, 92, 246, 0.8)"}
                >
                  {title}
                </TextWithGlow>
              ) : title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          
          {/* Price - animated on hover with smooth exit */}
          <div className="mb-5">
            <motion.div 
              className="flex items-end"
              whileHover={{ 
                scale: shouldReduceAnimations ? 1 : 1.05,
                transition: { duration: 0.2 }
              }}
              exit={{ 
                scale: 1, 
                transition: { duration: 0.2 } 
              }}
            >
              <motion.span 
                className={cn(
                  "text-3xl font-bold",
                  isPrimary ? "text-gold" : (highlighted || isCustom) ? "text-purple-light" : "text-foreground"
                )}
                initial={{ opacity: 1 }}
                // Counting animation on page load
                animate={shouldReduceAnimations ? {} : { 
                  opacity: [0, 1],
                  transition: { duration: 0.6, delay: 0.3 }
                }}
              >
                {priceDisplay}
              </motion.span>
              {showPriceType && (
                <span className="text-muted-foreground ml-2">
                  Kč {isOneTime ? 'jednorázově' : 'měsíčně'}
                </span>
              )}
            </motion.div>
            {showPriceType && (
              <div className="mt-1 inline-flex items-center">
                <div className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  isOneTime
                    ? "bg-blue-500/20 text-blue-400" 
                    : "bg-green-500/20 text-green-400"
                )}>
                  {isOneTime 
                    ? 'Jednorázová platba' 
                    : 'Měsíční platba'}
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-pointer" />
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
          </div>
          
          {/* Features - with staggered animation and smooth exit */}
          <div className="flex-grow mb-5">
            <h4 className="font-medium text-sm mb-3">Co je zahrnuto:</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start text-sm"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  viewport={{ once: true }}
                  variants={featureVariants}
                >
                  <motion.span
                    whileHover={{ 
                      scale: shouldReduceAnimations ? 1 : 1.2, 
                      rotate: shouldReduceAnimations ? 0 : [0, 10, -10, 0] 
                    }}
                    transition={{ duration: 0.5 }}
                    exit={{ 
                      scale: 1, 
                      rotate: 0,
                      transition: { duration: 0.2 }
                    }}
                    className={cn(
                      "mr-2 mt-0.5 flex-shrink-0 p-1 rounded-full",
                      isPrimary 
                        ? "bg-gold/10" 
                        : (highlighted || isCustom)
                          ? "bg-purple/10" 
                          : "bg-green-400/10"
                    )}
                  >
                    <Check className={cn(
                      "h-3 w-3", 
                      isPrimary ? "text-gold" : (highlighted || isCustom) ? "text-purple" : "text-green-400"
                    )} />
                  </motion.span>
                  <span className="text-foreground/80">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* CTA Button - with enhanced hover effect and smooth exit */}
          <div className="mt-auto">
            <motion.div
              whileHover={{ scale: shouldReduceAnimations ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              exit={{ 
                scale: 1,
                transition: { duration: 0.2 } 
              }}
            >
              <Button 
                className={cn(
                  "w-full relative overflow-hidden", 
                  isPrimary 
                    ? "bg-gold hover:bg-gold-light text-primary-foreground" 
                    : (highlighted || isCustom)
                      ? "bg-purple hover:bg-purple-light text-primary-foreground"
                      : "bg-primary hover:bg-primary/90"
                )}
                onClick={onButtonClick}
              >
                <motion.span 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isPrimary 
                      ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                      : (highlighted || isCustom)
                        ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ 
                    x: '100%', 
                    opacity: 1,
                    transition: { duration: 0.6 }
                  }}
                  exit={{ 
                    opacity: 0,
                    transition: { duration: 0.2 }
                  }}
                />
                {isCustom ? "Nezávazná konzultace" : ctaText}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModernServiceCard;
