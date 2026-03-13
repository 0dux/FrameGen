"use client";

import { Github01Icon, Linkedin01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { FlickeringGrid } from "./ui/flickering-grid";

export function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
      {/* Outer rounded card area */}
      <div className="bg-card border border-border rounded-[1rem] p-8 md:p-12 flex flex-col relative overflow-hidden min-h-[50vh]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <FlickeringGrid />
        </div>

        {/* Main Content Center */}
        <div className="z-10 relative flex-1 flex items-center justify-center w-full my-12">
          <h2 className="text-[16vw] xl:text-[232px] font-bold tracking-normal text-foreground/90 select-none text-center leading-none whitespace-nowrap">
            Frame Gen
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="z-10 relative flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-border w-full mt-auto">
          <p className="text-base sm:text-lg text-muted-foreground font-medium tracking-wide">
            made with &lt;3 by Daksh Yadav
          </p>

          <div className="flex items-center gap-4">
            {/* Github Icon Button */}
            <Link
              href="https://github.com/0dux"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-12 h-12 border border-border bg-transparent hover:bg-white/5 hover:border-white/40 flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-foreground"
            >
              <HugeiconsIcon icon={Github01Icon} className="w-6 h-6" />
            </Link>

            {/* LinkedIn Icon Button */}
            <Link
              href="https://linkedin.com/in/dakshyadav0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 border border-border bg-transparent hover:bg-white/5 hover:border-white/40 flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-foreground"
            >
              <HugeiconsIcon icon={Linkedin01Icon} className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
