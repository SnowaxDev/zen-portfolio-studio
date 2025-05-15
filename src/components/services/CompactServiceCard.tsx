
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
}

const CompactServiceCard: React.FC<CompactServiceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  price, 
  priceType 
}) => {
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
      y: -5, 
      boxShadow: "0 10px 30px -10px rgba(212, 175, 55, 0.2)",
      transition: { 
        duration: 0.3,
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
      variants={cardVariants}
    >
      <Card className="bg-card/50 backdrop-blur-sm rounded-xl border border-white/10 h-full hover:border-gold/20 transition-all">
        <CardContent className="pt-6 h-full flex flex-col">
          <motion.div 
            className="mb-4 bg-muted/80 w-12 h-12 rounded-lg flex items-center justify-center"
            variants={iconContainerVariants}
          >
            <Icon className="h-6 w-6 text-gold" />
          </motion.div>
          
          <motion.h4 
            className="text-lg font-medium mb-2"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TextWithGlow 
              intensity="light" 
              color="rgba(212, 175, 55, 0.5)"
              pulsate={false}
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
            className="flex items-center mt-auto"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-medium text-gold">
              <TextWithGlow 
                intensity="light" 
                color="rgba(212, 175, 55, 0.4)"
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
