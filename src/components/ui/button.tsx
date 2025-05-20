
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { useMobileAnimationSettings } from "@/hooks/use-mobile-animation-settings"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 md:h-10 md:px-4 md:py-2",
        sm: "h-9 rounded-md px-3 md:h-9 md:px-3",
        lg: "h-11 rounded-md px-8 md:h-11 md:px-8",
        icon: "h-11 w-11 md:h-10 md:w-10", // Increased size for mobile tap targets
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const { shouldReduceAnimations, animationIntensity } = useMobileAnimationSettings();
    const Comp = asChild ? Slot : "button"
    
    // Mobile optimization: Use regular button with tap feedback for touch
    if (shouldReduceAnimations) {
      return (
        <Comp
          className={cn(
            buttonVariants({ variant, size, className }),
            "active:scale-95 transition-all duration-200",  // Enhanced tap feedback
            "touch-manipulation" // Improve touch responsiveness
          )}
          ref={ref}
          {...props}
        />
      );
    }
    
    // For desktop, enhance the motion effects with subtle animations
    return (
      <motion.div
        whileHover={{ 
          scale: 1.015,
          y: -1,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          duration: 0.2,
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        className="inline-block"
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {/* Subtle shimmer effect on hover */}
          <motion.span
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ opacity: 0, x: '-100%' }}
            whileHover={{ opacity: 1, x: '100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          {props.children}
        </Comp>
      </motion.div>
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
