
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { LucideIcon } from 'lucide-react';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm rounded-xl border border-white/10 h-full hover:shadow-lg hover:border-gold/20 transition-all">
        <CardContent className="pt-6 h-full flex flex-col">
          <div className="mb-4 bg-muted/80 w-12 h-12 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-gold" />
          </div>
          <h4 className="text-lg font-medium mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
          <div className="flex items-center mt-auto">
            <p className="font-medium text-gold">{price}</p>
            <span className="text-xs text-muted-foreground ml-1">{priceType}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompactServiceCard;
