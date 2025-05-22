
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
    indicatorColor?: string;
    height?: string;
  }
>(({ className, value, indicatorClassName, indicatorColor, height = "h-3", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative w-full overflow-hidden rounded-md bg-black/50 border border-white/10`,
      height,
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 rounded-md transition-all",
        indicatorClassName
      )}
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        background: indicatorColor || "linear-gradient(to right, var(--gold) 0%, var(--gold-light) 100%)" 
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
