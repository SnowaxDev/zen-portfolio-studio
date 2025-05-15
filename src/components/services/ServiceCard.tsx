
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';
import TextWithGlow from '../TextWithGlow';

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
  const controls = useAnimation();

  const shimmerEffect = async () => {
    await controls.start({
      background: ['linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)'],
      backgroundSize: '200% 100%',
      backgroundPosition: ['-100%', '200%'],
      transition: { duration: 1.5, ease: "easeInOut" }
    });
  };

  React.useEffect(() => {
    if (isPopular) {
      const timer = setInterval(shimmerEffect, 3000);
      return () => clearInterval(timer);
    }
  }, [isPopular]);

  // Animation variants for card elements
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -8, transition: { duration: 0.3 } }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.3 + i * 0.1,
        duration: 0.5 
      } 
    })
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      variants={cardVariants}
      className="h-full"
    >
      <Card className={cn(
        "overflow-hidden border h-full relative",
        isPopular ? "border-gold/30 bg-gradient-to-b from-card to-black/70" : "border-white/10 bg-card/50",
        className
      )}>
        {isPopular && (
          <motion.div 
            className="absolute -top-3 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TextWithGlow 
              intensity="strong" 
              className="bg-gold text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
            >
              Nejoblíbenější
            </TextWithGlow>
          </motion.div>
        )}
        
        <motion.div
          animate={controls}
          className="absolute inset-0 z-0 pointer-events-none"
        />
        
        <CardContent className={cn(
          "p-6 z-10 relative flex flex-col h-full",
          isPopular ? "pt-8" : "pt-6"
        )}>
          <div className="mb-6">
            <motion.h3 
              className={cn(
                "text-xl font-bold mb-2",
                isPopular ? "text-gold" : "text-foreground"
              )}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isPopular ? (
                <TextWithGlow intensity="medium" color="rgba(212, 175, 55, 0.8)">
                  {title}
                </TextWithGlow>
              ) : title}
            </motion.h3>
            <motion.p 
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <div className="flex items-baseline">
                <motion.span 
                  className={cn(
                    "text-3xl md:text-4xl font-bold",
                    isPopular ? "text-gold" : "text-foreground"
                  )}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isPopular ? (
                    <TextWithGlow intensity="medium">
                      {price.toLocaleString()}
                    </TextWithGlow>
                  ) : price.toLocaleString()}
                </motion.span>
                <motion.span 
                  className="text-muted-foreground ml-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Kč {billingType === 'oneTime' ? 'jednorázově' : 'měsíčně'}
                </motion.span>
              </div>
              <motion.div 
                className="mt-1 inline-flex items-center"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className={`px-2 py-0.5 text-xs rounded-full ${
                  billingType === 'oneTime' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {billingType === 'oneTime' 
                    ? 'Jednorázová platba' 
                    : 'Měsíční platba'}
                </div>
                
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
              </motion.div>
            </div>
          </div>
          
          <div className="flex-grow">
            <motion.h4 
              className="font-medium mb-3 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Co je zahrnuto:
            </motion.h4>
            <ul className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-sm"
                  custom={index}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Check className={cn(
                    "h-4 w-4 mr-2 flex-shrink-0", 
                    isPopular ? "text-gold" : "text-green-400"
                  )} />
                  <span className="text-foreground/80">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="mt-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + features.length * 0.05 }}
            >
              <Button 
                className={cn("w-full", 
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
