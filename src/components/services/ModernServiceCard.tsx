
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
  price: number;
  isOneTime?: boolean;
  features: string[];
  isPrimary?: boolean;
  className?: string;
  highlighted?: boolean;
  ctaText?: string;
  onButtonClick?: () => void;
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
  onButtonClick
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
    if (highlighted && !shouldReduceAnimations) {
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
  }, [highlighted, controls, shouldReduceAnimations, getAnimationDuration]);

  // Enhanced card appearance with staggered animations
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
    }
  };

  // Features animation stagger effect
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
    })
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={shouldReduceAnimations ? {} : "hover"}
      className="h-full"
    >
      <Card className={cn(
        "h-full overflow-hidden border relative transition-all duration-300",
        isPrimary 
          ? "border-gold/30 bg-gradient-to-b from-card to-black/80 hover:border-gold/70" 
          : highlighted
            ? "border-purple/30 bg-gradient-to-b from-card to-black/90 hover:border-purple/60"
            : "border-white/10 bg-card/50 hover:border-white/30",
        className
      )}>
        {/* Badge for primary/highlighted cards */}
        {(isPrimary || highlighted) && (
          <motion.div 
            className="absolute -top-3 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: getAnimationDelay(0.2), duration: getAnimationDuration(0.5) }}
          >
            <span className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full shadow-lg",
              isPrimary ? "bg-gold text-primary-foreground" : "bg-purple text-primary-foreground"
            )}>
              {isPrimary ? "Nejoblíbenější" : "Doporučeno"}
            </span>
          </motion.div>
        )}
        
        {/* Shimmer effect for highlighted cards */}
        {highlighted && !shouldReduceAnimations && (
          <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden"
            animate={controls}
            initial={{ backgroundPosition: '200% 0%' }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
              backgroundSize: '200% 100%',
            }}
          />
        )}
        
        <CardContent className={cn(
          "p-5 flex flex-col h-full",
          (isPrimary || highlighted) ? "pt-7" : ""
        )}>
          {/* Card Header */}
          <div className="mb-4">
            <h3 className={cn(
              "text-xl font-bold mb-1.5",
              isPrimary ? "text-gold" : highlighted ? "text-purple-light" : "text-foreground"
            )}>
              {isPrimary || highlighted ? (
                <TextWithGlow intensity="medium" color={isPrimary ? "rgba(212, 175, 55, 0.8)" : "rgba(139, 92, 246, 0.8)"}>
                  {title}
                </TextWithGlow>
              ) : title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          
          {/* Price - animated on hover */}
          <div className="mb-5">
            <motion.div 
              className="flex items-end"
              whileHover={{ 
                scale: shouldReduceAnimations ? 1 : 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.span 
                className={cn(
                  "text-3xl font-bold",
                  isPrimary ? "text-gold" : highlighted ? "text-purple-light" : "text-foreground"
                )}
                initial={{ opacity: 1 }}
                // Counting animation on page load
                animate={shouldReduceAnimations ? {} : { 
                  opacity: [0, 1],
                  transition: { duration: 0.6, delay: 0.3 }
                }}
              >
                {price.toLocaleString()}
              </motion.span>
              <span className="text-muted-foreground ml-2">
                Kč {isOneTime ? 'jednorázově' : 'měsíčně'}
              </span>
            </motion.div>
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
          </div>
          
          {/* Features - with staggered animation */}
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
                  viewport={{ once: true }}
                  variants={featureVariants}
                >
                  <motion.span
                    whileHover={{ 
                      scale: shouldReduceAnimations ? 1 : 1.2, 
                      rotate: shouldReduceAnimations ? 0 : [0, 10, -10, 0] 
                    }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "mr-2 mt-0.5 flex-shrink-0 p-1 rounded-full",
                      isPrimary 
                        ? "bg-gold/10" 
                        : highlighted 
                          ? "bg-purple/10" 
                          : "bg-green-400/10"
                    )}
                  >
                    <Check className={cn(
                      "h-3 w-3", 
                      isPrimary ? "text-gold" : highlighted ? "text-purple" : "text-green-400"
                    )} />
                  </motion.span>
                  <span className="text-foreground/80">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* CTA Button - with enhanced hover effect */}
          <div className="mt-auto">
            <motion.div
              whileHover={{ scale: shouldReduceAnimations ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                className={cn(
                  "w-full relative overflow-hidden", 
                  isPrimary 
                    ? "bg-gold hover:bg-gold-light text-primary-foreground" 
                    : highlighted
                      ? "bg-purple hover:bg-purple-light text-primary-foreground"
                      : "bg-primary hover:bg-primary/90"
                )}
                onClick={onButtonClick}
              >
                {ctaText}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModernServiceCard;
