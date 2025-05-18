
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ModernCompactServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  priceType: string;
  className?: string;
  highlight?: boolean;
  detailsPath?: string; // New prop to link to a details page
}

const ModernCompactServiceCard: React.FC<ModernCompactServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  price,
  priceType,
  className = '',
  highlight = false,
  detailsPath = '#',
}) => {
  const navigate = useNavigate();
  
  // Handle click to navigate to detailed page
  const handleClick = () => {
    if (detailsPath && detailsPath !== '#') {
      navigate(detailsPath);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <motion.div 
        className="h-full relative"
        whileHover={{ 
          y: -5, 
          transition: { duration: 0.15 },
          boxShadow: highlight 
            ? "0 15px 30px -10px rgba(234, 179, 8, 0.3)" 
            : "0 15px 25px -10px rgba(0, 0, 0, 0.4)"
        }}
      >
        <Card className={cn(
          "h-full overflow-hidden transition-all duration-300 border-2 z-10 relative",
          highlight 
            ? "border-yellow-500/40 hover:border-yellow-500/80 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black/90" 
            : "border-zinc-800 hover:border-zinc-700 bg-gradient-to-b from-zinc-900 to-black/80",
          className
        )}>
          <CardContent className="p-5 h-full flex flex-col">
            <div className="flex items-center space-x-4 mb-3">
              <motion.div 
                className={cn(
                  "p-2 rounded-lg", 
                  highlight ? "bg-yellow-500/20" : "bg-zinc-800"
                )}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.3 } }}
              >
                <Icon className={cn(
                  "h-5 w-5", 
                  highlight ? "text-yellow-500" : "text-yellow-100/80"
                )} />
              </motion.div>
              <h3 className={cn(
                "font-bold", 
                highlight ? "text-yellow-500" : "text-yellow-100"
              )}>
                {title}
              </h3>
            </div>
            
            <p className="text-sm text-zinc-400 mb-4">{description}</p>
            
            <div className="mt-auto">
              <div className="flex items-baseline">
                <span className={cn(
                  "text-lg font-bold", 
                  highlight ? "text-yellow-500" : "text-yellow-100"
                )}>
                  {price}
                </span>
                <span className="text-xs text-zinc-400 ml-1">
                  {priceType}
                </span>
              </div>
              
              <motion.button
                className={cn(
                  "mt-3 w-full py-1.5 text-sm rounded-md transition-colors flex items-center justify-center space-x-1",
                  highlight 
                    ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/30" 
                    : "bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                )}
                whileHover={{ 
                  scale: 1.03, 
                  transition: { duration: 0.15 } 
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
              >
                <span>Více informací</span>
                <motion.span
                  initial={{ x: -5, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </motion.button>
            </div>
          </CardContent>
        </Card>
        
        {/* Animated background glow on hover */}
        <motion.div 
          className={cn(
            "absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity",
            highlight ? "bg-yellow-500/30" : "bg-blue-500/20"
          )}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ModernCompactServiceCard;
