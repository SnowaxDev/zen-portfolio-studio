
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

function Skeleton({
  className,
  shimmer = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-muted", 
        shimmer ? "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent" : "animate-pulse", 
        className
      )}
      {...props}
    />
  );
}

// Advanced loading skeleton component with animations
function ContentSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 w-full"
    >
      <Skeleton className="h-8 w-3/4 mx-auto" shimmer />
      <Skeleton className="h-4 w-1/2 mx-auto" shimmer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-6 rounded-xl border border-border/20">
            <Skeleton className="h-10 w-10 rounded-full" shimmer />
            <Skeleton className="h-6 w-1/2" shimmer />
            <Skeleton className="h-4 w-full" shimmer />
            <Skeleton className="h-4 w-full" shimmer />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((j) => (
                <Skeleton key={j} className="h-3 w-full" shimmer />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export { Skeleton, ContentSkeleton };
