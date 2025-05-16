
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { LucideIcon } from 'lucide-react';
import TextWithGlow from '../TextWithGlow';

interface CompactServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  priceType: string;
  className?: string; // Added className prop as optional
}

const CompactServiceCard: React.FC<CompactServiceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  price, 
  priceType,
  className = '' // Default to empty string
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for 3D tilting effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse position into rotation
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    // Set motion values proportionally
    x.set(mouseX * 0.5);
    y.set(mouseY * 0.5);
  };
  
  const handleMouseLeave = () => {
    // Reset motion values smoothly on mouse leave
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    hover: { 
      y: -8, 
      boxShadow: "0 15px 35px -15px rgba(212, 175, 55, 0.25)",
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const iconContainerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.2,
        duration: 0.4,
        type: "spring"
      }
    },
    hover: { 
      rotate: [0, -10, 10, -5, 0],
      scale: 1.1,
      backgroundColor: "rgba(212, 175, 55, 0.1)",
      transition: { duration: 0.5 }
    }
  };
  
  // Shimmer animation for card border on hover
  const shimmerVariants = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    animate: {
      x: "100%",
      opacity: isHovered ? 0.3 : 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      variants={cardVariants}
      className={`h-full ${className}`} // Added className here
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
        className="h-full"
      >
        <Card className="bg-card/50 backdrop-blur-sm rounded-xl border border-white/10 h-full hover:border-gold/30 transition-all overflow-hidden relative">
          {/* Shimmer effect overlay */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Highlight glow on card corners */}
          {isHovered && (
            <>
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-gold/20 to-transparent rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-gold/20 to-transparent rounded-br-xl" />
            </>
          )}
          
          <CardContent className="pt-6 h-full flex flex-col">
            <motion.div 
              className="mb-4 bg-muted/80 w-14 h-14 rounded-lg flex items-center justify-center"
              variants={iconContainerVariants}
            >
              <motion.div
                animate={isHovered ? {
                  scale: [1, 1.15, 1],
                  transition: { duration: 1, repeat: Infinity }
                } : {}}
              >
                <Icon className="h-7 w-7 text-gold" />
              </motion.div>
            </motion.div>
            
            <motion.h4 
              className="text-xl font-medium mb-2"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TextWithGlow 
                intensity="light" 
                color="rgba(212, 175, 55, 0.6)"
                pulsate={false}
                hover={true}
              >
                {title}
              </TextWithGlow>
            </motion.h4>
            
            <motion.p 
              className="text-sm text-muted-foreground mb-4 flex-grow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {description}
            </motion.p>
            
            <motion.div 
              className="flex items-center mt-auto pt-4 border-t border-white/5"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-medium text-gold">
                <TextWithGlow 
                  intensity={isHovered ? "medium" : "light"}
                  color="rgba(212, 175, 55, 0.4)"
                  pulsate={isHovered}
                >
                  {price}
                </TextWithGlow>
              </p>
              <span className="text-xs text-muted-foreground ml-1">{priceType}</span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CompactServiceCard;
