
import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Před",
  afterLabel = "Po"
}) => {
  const [position, setPosition] = useState(50); // Start at the middle (50%)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Handle mouse/touch events
  const handleMove = (clientX: number) => {
    if (containerRef.current && isDragging.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(percentage);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="w-full h-full" ref={containerRef}>
      <div className="h-full w-full rounded-lg overflow-hidden relative">
        {/* After Image (Full size in background) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={afterImage} 
            alt="After redesign" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium">
            {afterLabel}
          </div>
        </div>
        
        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden h-full" 
          style={{ width: `${position}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Before redesign" 
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ 
              width: `${100 / (position/100)}%`, 
              height: '100%',
              maxWidth: 'none'
            }}
          />
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium">
            {beforeLabel}
          </div>
        </div>
        
        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 group hover:scale-y-125 transition-transform"
          style={{ left: `${position}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 bg-white border-2 border-white rounded-full flex justify-center items-center group-hover:scale-110 transition-transform">
            <div className="flex">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-0.5">
                <path d="M7 1L1 6L7 11" stroke="#000" strokeWidth="1.5" />
              </svg>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-0.5">
                <path d="M1 1L7 6L1 11" stroke="#000" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
