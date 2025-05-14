
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const endX = useRef(0);
  const endY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      endX.current = e.clientX - 16;
      endY.current = e.clientY - 16;
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    const handleMouseLeave = () => {
      setHidden(true);
      cursorX.set(-100);
      cursorY.set(-100);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverStart = () => {
      setLinkHovered(true);
      setIsHovering(true);
    };
    
    const handleLinkHoverEnd = () => {
      setLinkHovered(false);
      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add event listeners for links, buttons and any interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverStart);
      el.addEventListener("mouseleave", handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
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
      <motion.div
        className="fixed top-0 left-0 z-[999] rounded-full pointer-events-none hidden md:block"
        style={{
          height: clicked ? 20 : linkHovered ? 40 : 32,
          width: clicked ? 20 : linkHovered ? 40 : 32,
          backgroundColor: "transparent",
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 1.2 : 1,
          borderWidth: clicked ? "2px" : "1.5px",
          borderColor: clicked || linkHovered ? "hsl(var(--accent))" : "hsl(var(--primary))",
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-primary" />
          {isHovering && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary opacity-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      </motion.div>
      
      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 z-[998] rounded-full bg-accent w-2 h-2 pointer-events-none hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "50%",
          translateY: "50%",
          opacity: hidden ? 0 : 0.6,
        }}
      />
    </>
  );
};

export default AnimatedCursor;
