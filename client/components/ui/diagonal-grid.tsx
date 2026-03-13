import { cn } from "@/lib/utils";
import * as React from "react";

export interface DiagonalGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DiagonalGrid({ className, ...props }: DiagonalGridProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[-1] pointer-events-none dark:hidden",
        className,
      )}
      style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
          repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
        backgroundSize: "40px 40px",
      }}
      {...props}
    />
  );
}
