import * as React from "react";
import { cn } from "@/lib/utils";

export interface NeuroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asLabel?: boolean;
}

const NeuroButton = React.forwardRef<HTMLButtonElement, NeuroButtonProps>(
  ({ className, asLabel = false, ...props }, ref) => {
    const Component = asLabel ? "span" : "button";
    
    return (
      <Component
        ref={asLabel ? undefined : ref}
        {...(asLabel ? {} : props)}
        className={cn(
          "w-full h-14 px-6 rounded-2xl",
          "bg-white shadow-[6px_6px_16px_rgba(0,0,0,0.08),-6px_-6px_16px_rgba(255,255,255,0.9)]",
          "border border-gray-200 text-gray-800 font-light",
          "hover:shadow-[3px_3px_10px_rgba(0,0,0,0.12),-3px_-3px_10px_rgba(255,255,255,0.9)]",
          "active:translate-y-[1px] transition-all duration-200",
          "inline-flex items-center justify-center",
          asLabel ? "cursor-pointer" : "",
          className
        )}
      />
    );
  }
);

NeuroButton.displayName = "NeuroButton";

export { NeuroButton };
