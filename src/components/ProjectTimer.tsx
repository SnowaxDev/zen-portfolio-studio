
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProjectTimerProps {
  launchDate: string | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ProjectTimer: React.FC<ProjectTimerProps> = ({ launchDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    if (!launchDate) return;
    
    const calculateTimeLeft = () => {
      const difference = +new Date(launchDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [launchDate]);
  
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center gap-2">
        <TimeBlock label="Dny" value={timeLeft.days} />
        <span className="text-gold/80 text-2xl font-thin">:</span>
        <TimeBlock label="Hodiny" value={timeLeft.hours} />
        <span className="text-gold/80 text-2xl font-thin">:</span>
        <TimeBlock label="Minuty" value={timeLeft.minutes} />
        <span className="text-gold/80 text-2xl font-thin">:</span>
        <TimeBlock label="Sekundy" value={timeLeft.seconds} />
      </div>
    </motion.div>
  );
};

const TimeBlock: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.05 }}
    >
      <motion.span 
        className="flex items-center justify-center bg-black/50 border border-gold/20 backdrop-blur-md rounded-lg px-3 py-2 w-16 h-16 text-center relative overflow-hidden"
        key={value} // This makes the component re-render when the value changes
      >
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="absolute text-2xl font-bold text-gradient"
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
        
        {/* Subtle pulsing background */}
        <motion.div
          className="absolute inset-0 bg-gold/10"
          animate={{ 
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "mirror" 
          }}
        />
        
        {/* Bottom highlight */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </motion.span>
    </motion.div>
    <span className="text-xs text-foreground/60 mt-2">{label}</span>
  </motion.div>
);

export default ProjectTimer;
