
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
  
  return (
    <div className="h-full relative">
      {/* Popular or custom badge */}
      {(isPrimary || isCustom) && (
        <div className="absolute top-0 inset-x-0 flex justify-center -mt-3 z-10">
          <span className={cn(
            "px-3 py-1 text-xs font-semibold rounded-full shadow-lg",
            isPrimary 
              ? "bg-yellow-500 text-black" 
              : "bg-purple-500 text-white"
          )}>
            {isPrimary ? "Nejoblíbenější" : "Individuální"}
          </span>
        </div>
      )}

      <div className={cn(
        "h-full rounded-2xl border-2 p-6 flex flex-col relative overflow-hidden",
        isPrimary 
          ? "bg-zinc-900 border-yellow-500/50" 
          : isCustom
            ? "bg-zinc-900 border-purple-500/50" 
            : "bg-zinc-900 border-zinc-800"
      )}>
        <div className="flex flex-col h-full">
          {/* Card Content */}
          <div className={cn(
            "flex flex-col h-full",
            (isPrimary || isCustom) ? "pt-3" : ""
          )}>
            {/* Title */}
            <h3 className={cn(
              "text-xl font-bold mb-2",
              isPrimary ? "text-yellow-500" : isCustom ? "text-purple-400" : "text-white"
            )}>
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-zinc-400 mb-5">
              {description}
            </p>
            
            {/* Price */}
            <div className="mb-5">
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
            </div>
            
            {/* Features */}
            <div className="flex-grow mb-5">
              <h4 className="font-medium text-sm mb-3 text-zinc-300">
                Co je zahrnuto:
              </h4>
              
              <ul className="space-y-2.5">
                {features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start text-sm"
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
                  </li>
                ))}
              </ul>
            </div>
            
            {/* CTA Button */}
            <div className="mt-auto">
              <Button 
                className={cn(
                  "w-full", 
                  isPrimary 
                    ? "bg-yellow-500 hover:bg-yellow-400 text-black" 
                    : isCustom
                      ? "bg-purple-500 hover:bg-purple-400 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white"
                )}
                onClick={onButtonClick}
              >
                {isCustom ? "Nezávazná konzultace" : ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
