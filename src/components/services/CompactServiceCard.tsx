
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { LucideIcon } from 'lucide-react';
import TextWithGlow from '../TextWithGlow';

interface CompactServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  priceType: string;
  index?: number;
}

const CompactServiceCard: React.FC<CompactServiceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  price, 
  priceType,
  index = 0 
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }
    },
    hover: { 
      y: -8, 
      boxShadow: "0 15px 35px -15px rgba(212, 175, 55, 0.3)",
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const iconContainerVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        delay: 0.2 + index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 150
      }
    },
    hover: { 
      rotate: [0, -10, 10, -5, 0],
      scale: 1.15,
      backgroundColor: "rgba(212, 175, 55, 0.15)",
      transition: { duration: 0.5 }
    }
  };

  const shimmerVariants = {
    initial: {
      backgroundPosition: "-100% 0",
    },
    animate: {
      backgroundPosition: ["-100% 0", "200% 0", "-100% 0"],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: "linear",
        delay: index * 0.3,
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
      className="h-full"
    >
      <Card className="bg-card/30 backdrop-blur-sm rounded-xl border border-white/10 h-full hover:border-gold/40 transition-all overflow-hidden">
        <CardContent className="pt-6 h-full flex flex-col">
          <motion.div 
            className="mb-4 bg-muted/80 w-14 h-14 rounded-lg flex items-center justify-center relative overflow-hidden"
            variants={iconContainerVariants}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
            <Icon className="h-7 w-7 text-gold relative z-10" />
          </motion.div>
          
          <motion.h4 
            className="text-xl font-medium mb-2"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <TextWithGlow 
              intensity="light" 
              color="rgba(212, 175, 55, 0.7)"
              pulsate={false}
            >
              {title}
            </TextWithGlow>
          </motion.h4>
          
          <motion.p 
            className="text-sm text-muted-foreground mb-4 flex-grow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="flex items-center mt-auto pt-4 border-t border-white/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 h-px bg-gradient-to-r from-purple/10 via-gold/30 to-purple/10"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
            <p className="font-medium text-gold">
              <TextWithGlow 
                intensity="light" 
                color="rgba(212, 175, 55, 0.5)"
                pulsate={false}
              >
                {price}
              </TextWithGlow>
            </p>
            <span className="text-xs text-muted-foreground ml-1">{priceType}</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompactServiceCard;
