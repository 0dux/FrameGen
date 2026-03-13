"use client";

import { SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

export function AiGenerationAnimation() {
  return (
    <motion.div
      initial="idle"
      whileInView="hover"
      viewport={{ once: false, amount: 0.4 }}
      className="h-64 bg-background w-full flex items-center justify-center border-b border-border relative overflow-hidden group-hover:bg-accent/10 transition-colors duration-700"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Text flowing left to right (Generation point: left end) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`text-${i}`}
          className="absolute p-2 bg-card border border-border shadow-sm rounded-md flex flex-col gap-1.5 w-16 z-0"
          style={{ top: `${25 + i * 20}%` }}
          variants={{
            idle: { x: "-500%", opacity: 0, scale: 0.8 },
            hover: {
              x: "500%",
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.5],
              transition: {
                duration: 6,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut",
              },
            },
          }}
        >
          <div className="h-1.5 w-full bg-muted-foreground/40 rounded-full" />
          <div className="h-1.5 w-3/4 bg-muted-foreground/40 rounded-full" />
          <div className="h-1.5 w-1/2 bg-muted-foreground/40 rounded-full" />
        </motion.div>
      ))}

      {/* Images flowing left to right (Generation point: right side of box) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`img-${i}`}
          className="absolute p-1 bg-background border border-border shadow-xl rounded-lg flex items-center justify-center z-0"
          style={{ top: `${25 + i * 20}%`, y: "-50%" }}
          variants={{
            idle: { x: "0%", opacity: 0, scale: 0.5 },
            hover: {
              x: "500%",
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.8],
              transition: {
                duration: 3.4,
                repeat: Infinity,
                delay: i * 1.2 + 0.8, // offset from text
                ease: "easeInOut",
              },
            },
          }}
        >
          <div className="w-14 h-14 rounded-md bg-linear-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-primary/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* Central AI Processing Box */}
      <div className="relative z-10 w-24 h-24 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-out overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Glowing Orbs behind the icon */}
        <motion.div
          className="absolute w-16 h-16 bg-primary/30 rounded-full blur-[20px]"
          variants={{
            idle: { scale: 1, opacity: 0.5 },
            hover: {
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        />

        <HugeiconsIcon
          icon={SparklesIcon}
          className="w-10 h-10 text-primary relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />

        {/* Animated scanning line (Optimized using y transform) */}
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-primary/60 blur-[1px]"
          variants={{
            idle: { top: "-10%", y: "0%" },
            hover: {
              y: ["0%", "12000%", "0%"],
              transition: { duration: 3, repeat: Infinity, ease: "linear" },
            },
          }}
        />
      </div>
    </motion.div>
  );
}
