"use client";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon01Icon, Sun02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 500,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = mounted && currentTheme === "dark";

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y),
    );

    const applyTheme = () => {
      setTheme(isDark ? "light" : "dark");
    };

    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });

    const ready = transition?.ready;
    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
    }
  }, [isDark, duration, setTheme]);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("relative w-9 h-9 rounded-full", className)}
        disabled
      >
        <span className="sr-only">Toggle theme placeholder</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn("relative overflow-hidden rounded-full w-9 h-9", className)}
      {...props}
    >
      <HugeiconsIcon
        icon={isDark ? Sun02Icon : Moon01Icon}
        className="h-[1.2rem] w-[1.2rem] transition-colors"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
