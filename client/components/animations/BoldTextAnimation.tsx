"use client";

import { motion } from "framer-motion";

export function BoldTextAnimation() {
  return (
    <motion.div
      initial="idle"
      whileInView="hover"
      viewport={{ once: false, amount: 0.4 }}
      className="h-64 bg-zinc-50 dark:bg-zinc-950 w-full flex items-center justify-center border-b border-border relative overflow-hidden group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 transition-colors duration-700"
    >
      <div className="absolute inset-0 bg-linear-to-tl from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      {/* High-End Typography Layering */}
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.span
          className="absolute text-[120px] font-serif font-bold text-foreground/5 dark:text-white/5 leading-none select-none"
          variants={{
            idle: { x: -32, y: 16 },
            hover: {
              x: -48,
              y: 16,
              transition: { duration: 0.7, ease: "easeOut" },
            },
          }}
        >
          A
        </motion.span>
        <motion.span
          className="absolute text-[100px] font-sans font-black text-foreground/10 dark:text-white/10 leading-none select-none"
          variants={{
            idle: { x: 48, y: -24 },
            hover: {
              x: 64,
              y: -24,
              transition: { duration: 0.7, ease: "easeOut" },
            },
          }}
        >
          g
        </motion.span>
        <div className="relative z-10 px-6 py-3 border border-border/50 dark:border-white/20 bg-background/80 dark:bg-black/60 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden group-hover:border-primary/50 transition-colors duration-700">
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-foreground/10 dark:via-white/10 to-transparent"
            variants={{
              idle: { x: "-100%" },
              hover: {
                x: ["-100%", "100%"],
                transition: { duration: 2, repeat: Infinity, ease: "linear" },
              },
            }}
          />
          <span className="text-xl font-bold tracking-tight text-foreground dark:text-white flex items-center">
            B
            <span className="text-primary tracking-tighter mix-blend-multiply dark:mix-blend-screen">
              o
            </span>
            ld
            <span className="ml-1 w-1.5 h-6 bg-primary animate-pulse inline-block" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
