
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface PhilosophyItemProps {
  text: string;
}

const PhilosophyItem: React.FC<PhilosophyItemProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-3 mb-2.5">
      <motion.div 
        className="text-gold bg-gold/5 p-1 rounded-md flex items-center justify-center mt-0.5 h-6 w-6"
        whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--gold) / 0.2)" }}
      >
        <CheckCircle size={16} />
      </motion.div>
      <span className="text-foreground/90">{text}</span>
    </div>
  );
};

export default PhilosophyItem;
