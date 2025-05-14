
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('click', handleClick);

    // Add event listeners for links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('click', handleClick);

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1.5px solid var(--primary)",
      boxShadow: "0 0 15px rgba(var(--primary), 0.3)"
    },
    link: {
      x: position.x - 20,
      y: position.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(var(--primary), 0.15)",
      boxShadow: "0 0 20px rgba(var(--primary), 0.4)"
    },
    clicked: {
      x: position.x - 10,
      y: position.y - 10,
      height: 20,
      width: 20,
      backgroundColor: "rgba(var(--primary), 0.3)",
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none hidden md:block"
      variants={cursorVariants}
      animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

export default AnimatedCursor;
