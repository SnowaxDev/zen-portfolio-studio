
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

const AnimatedCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isActive, setIsActive] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const handleMouseLeave = () => {
      setHidden(true);
      cursorX.set(-100);
      cursorY.set(-100);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.onclick !== null ||
        target.classList.contains('clickable') ||
        target.role === 'button' ||
        (target.parentElement && target.parentElement.onclick !== null);
      
      setIsPointer(isClickable);
    };
    
    const handleElementLeave = () => {
      setIsPointer(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseout", handleElementLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseout", handleElementLeave);
    };
  }, [cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 z-[999] rounded-full pointer-events-none hidden md:flex items-center justify-center"
        style={{
          height: isPointer ? 36 : 32,
          width: isPointer ? 36 : 32,
          backgroundColor: "transparent",
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          scale: isActive ? 0.8 : 1,
          borderWidth: isActive ? "2px" : "1.5px",
          borderColor: isPointer ? "hsl(var(--accent))" : "hsl(var(--primary))",
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="relative w-full h-full rounded-full border border-current">
          {isPointer && (
            <MousePointer2 
              size={14} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent"
            />
          )}
        </div>
      </motion.div>
      
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[998] rounded-full w-2 h-2 pointer-events-none hidden md:block bg-current"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "50%",
          translateY: "50%",
          opacity: hidden ? 0 : 0.6,
          color: isPointer ? "hsl(var(--accent))" : "hsl(var(--primary))",
        }}
      />
    </>
  );
};

export default AnimatedCursor;
