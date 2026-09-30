import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  message?: string;
  className?: string;
}

export function PageLoader({ message = "Loading...", className }: PageLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[400px] gap-4", className)}>
      <Loader2 className="h-12 w-12 animate-spin text-[#f5c451]" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
