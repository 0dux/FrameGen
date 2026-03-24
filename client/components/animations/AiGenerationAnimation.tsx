"use client";

import { SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const CYCLE = 4.2;

export function AiGenerationAnimation() {
  return (
    <div className="relative flex h-72 w-full items-center justify-center overflow-hidden border-b border-border bg-[linear-gradient(180deg,rgba(99,102,241,0.04),transparent_60%)] dark:bg-[linear-gradient(180deg,rgba(99,102,241,0.08),transparent_60%)]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_50%)]" />

      <div className="relative w-full max-w-5xl px-6">
        <div className="relative mx-auto h-40 max-w-4xl">
          {/* Left: Prompt Source */}
          <div className="absolute left-[8%] top-1/2 z-20 -translate-y-1/2">
            <PromptSource />
          </div>

          {/* Middle: AI Core */}
          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <AiCore />
          </div>

          {/* Right: Output Preview */}
          <div className="absolute right-[8%] top-1/2 z-20 -translate-y-1/2">
            <OutputPreview />
          </div>

          {/* Flow Skeleton Shards */}
          <div className="absolute left-[32%] right-[54%] top-1/2 z-10 -translate-y-1/2">
            {[...Array(3)].map((_, index) => (
              <SkeletonShard key={index} delay={index * 0.8} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PromptSource() {
  return (
    <motion.div
      className="w-32 rounded-2xl border border-black/8 bg-white/90 p-3 shadow-lg dark:border-white/10 dark:bg-white/10 dark:shadow-none"
      animate={{
        scale: [1, 1.02, 1],
        boxShadow: [
          "0 4px 6px rgba(0,0,0,0.05)",
          "0 10px 15px rgba(99,102,241,0.1)",
          "0 4px 6px rgba(0,0,0,0.05)",
        ],
      }}
      transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.1, 0.4] }}
    >
      <div className="mb-2 h-2.5 w-16 rounded-full bg-primary/40" />
      <div className="space-y-2">
        <div className="h-2 rounded-full bg-foreground/5 dark:bg-white/5" />
        <div className="h-2 w-11/12 rounded-full bg-foreground/5 dark:bg-white/5" />
        <div className="h-2 w-3/4 rounded-full bg-foreground/5 dark:bg-white/5" />
      </div>
    </motion.div>
  );
}

function SkeletonShard({ delay }: { delay: number }) {
  const width = [12, 22, 16][Math.floor(delay / 0.8) % 3];

  return (
    <motion.div
      className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[1px]"
      style={{ width: width, height: "6px" }}
      initial={{ x: "-10%", opacity: 0, scale: 0.8 }}
      animate={{
        x: ["0%", "85%", "100%"],
        opacity: [0, 0.8, 1, 0],
        scale: [0.8, 1.1, 1, 0.6],
      }}
      transition={{
        duration: CYCLE,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        times: [0, 0.35, 0.4, 0.45],
      }}
    />
  );
}

function AiCore() {
  return (
    <motion.div
      className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] border border-black/8 bg-white/90 shadow-xl dark:border-white/10 dark:bg-white/10"
      animate={{
        scale: [1, 1, 1.15, 1],
        rotate: [0, 0, 5, 0],
      }}
      transition={{
        duration: CYCLE,
        repeat: Infinity,
        times: [0, 0.4, 0.55, 0.7],
      }}
    >
      {/* Magnetic Aura */}
      <motion.div
        className="absolute -inset-3 rounded-[2.5rem] border border-primary/20 bg-primary/5"
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: CYCLE,
          repeat: Infinity,
          times: [0, 0.55, 1],
        }}
      />

      {/* Sparkles Core */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.2, 1],
          filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
        }}
        transition={{
          duration: CYCLE,
          repeat: Infinity,
          times: [0, 0.55, 1],
        }}
      >
        <HugeiconsIcon icon={SparklesIcon} className="h-10 w-10 text-primary" />
      </motion.div>

      {/* Processing Glow */}
      <motion.div
        className="absolute inset-0 rounded-[2rem] bg-primary/20 blur-xl"
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{
          duration: CYCLE,
          repeat: Infinity,
          times: [0.45, 0.55, 0.65],
        }}
      />
    </motion.div>
  );
}

function OutputPreview() {
  return (
    <div className="relative h-28 w-36 overflow-hidden rounded-3xl bg-white/90 p-2 shadow-2xl dark:bg-white/5 dark:shadow-none">
      {/* Dynamic Glow background */}
      <div className="absolute inset-0 bg-primary/5 blur-2xl" />

      {/* Content wrapper with reveal */}
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-indigo-500 via-sky-400 to-emerald-400 shadow-inner"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{
          clipPath: [
            "inset(0 100% 0 0)",
            "inset(0 100% 0 0)",
            "inset(0 0% 0 0)",
            "inset(0 0% 0 0)",
            "inset(0 0% 0 100%)",
          ],
        }}
        transition={{
          duration: CYCLE,
          repeat: Infinity,
          times: [0, 0.7, 0.85, 0.95, 1],
        }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

        {/* Placeholder Content - More abstract to avoid "box" feelings */}
        <div className="flex h-full w-full items-center justify-center">
          <svg
            viewBox="0 0 64 64"
            className="h-14 w-14 text-white/90"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Mountain-like abstract shapes */}
            <path d="M12 48L28 24L38 36L46 28L54 42" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        />
      </motion.div>

      {/* Hidden baseline for structure */}
      <div className="absolute inset-2 -z-10 rounded-2xl bg-foreground/3 dark:bg-white/3" />
    </div>
  );
}
