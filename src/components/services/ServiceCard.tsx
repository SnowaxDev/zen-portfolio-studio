
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';
import { useMobileUtils } from '@/hooks/use-mobile-utils';

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  billingType: 'oneTime' | 'subscription';
  features: string[];
  className?: string;
  isPopular?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  billingType,
  features,
  className,
  isPopular = false
}) => {
  const { isMobile } = useMobileUtils();

  // Animation variants
  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { delay: 0.3 + i * 0.1, duration: 0.5 } 
    })
  };

  // Dynamic padding based on screen size
  const cardPadding = isMobile ? "p-4" : "p-6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: isMobile ? 0 : -5 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className={cn(
        "overflow-hidden border h-full relative transition-all duration-300",
        isPopular 
          ? "border-gold/30 bg-gradient-to-b from-card to-black/70 hover:border-gold/50" 
          : "border-white/10 bg-card/50 hover:border-white/30",
        className
      )}>
        {/* Popular tag */}
        {isPopular && (
          <div className="absolute -top-3 right-4">
            <div className="bg-gold text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              Nejoblíbenější
            </div>
          </div>
        )}
        
        <CardContent className={cn(
          `${cardPadding} z-10 relative flex flex-col h-full`,
          isPopular ? "pt-6" : ""
        )}>
          {/* Card header */}
          <div className="mb-4 md:mb-6">
            <h3 className={cn(
              "text-lg md:text-xl font-bold mb-1 md:mb-2",
              isPopular ? "text-gold" : "text-foreground"
            )}>
              {title}
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              {description}
            </p>
          </div>
          
          {/* Price display */}
          <div className="mb-4 md:mb-6">
            <div className="flex items-baseline">
              <span className="text-2xl md:text-3xl font-bold text-foreground">
                {price.toLocaleString()}
              </span>
              <span className="text-muted-foreground ml-2 text-xs md:text-sm">
                Kč {billingType === 'oneTime' ? 'jednorázově' : 'měsíčně'}
              </span>
            </div>
            <div className="mt-1 inline-flex items-center">
              <div className={`px-2 py-0.5 text-xs rounded-full ${
                billingType === 'oneTime' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-green-500/20 text-green-400'
              }`}>
                {billingType === 'oneTime' 
                  ? 'Jednorázová platba' 
                  : 'Měsíční platba'}
              </div>
              
              {!isMobile && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {billingType === 'oneTime' 
                          ? 'Jednorázová platba za kompletní dodání služby' 
                          : 'Opakovaná měsíční platba za průběžné poskytování služby'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          
          {/* Features list */}
          <div className="flex-grow mb-6">
            <h4 className="font-medium text-xs md:text-sm mb-2 md:mb-3">
              Co je zahrnuto:
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-xs md:text-sm"
                  custom={index}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Check className={cn(
                    "w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0", 
                    isPopular ? "text-gold" : "text-green-400"
                  )} />
                  <span className="text-foreground/80">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Order button */}
          <div className="mt-auto">
            <motion.div
              whileHover={{ scale: isMobile ? 1.01 : 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                className={cn(
                  "w-full", 
                  isPopular 
                    ? "bg-gold hover:bg-gold-light text-primary-foreground" 
                    : "bg-primary hover:bg-primary/90"
                )}
              >
                Objednat
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
