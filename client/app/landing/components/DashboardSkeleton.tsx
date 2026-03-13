"use client";

import { motion } from "framer-motion";

export function DashboardSkeleton() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto aspect-video mt-8 rounded-xl border border-border bg-card shadow-2xl relative z-10 overflow-hidden flex flex-col origin-center will-change-transform"
    >
      {/* Top Bar Skeleton */}
      <div className="h-14 border-b border-border flex items-center px-4 justify-between bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-accent" />
          <div className="h-4 w-32 bg-accent rounded" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24 h-6 rounded bg-accent" />
          <div className="w-8 h-8 rounded-full bg-accent" />
          <div className="w-20 h-8 rounded bg-accent" />
        </div>
      </div>
      {/* Main Area Skeleton */}
      <div className="flex-1 flex p-4 gap-4">
        {/* Left Menu */}
        <div className="w-16 flex flex-col gap-4 border-r border-border pr-4">
          <div className="w-10 h-10 rounded bg-accent" />
          <div className="w-10 h-10 rounded bg-accent" />
          <div className="w-10 h-10 rounded bg-accent" />
        </div>
        {/* Content Area */}
        <div className="flex-1 rounded-lg border border-border bg-background/50 p-8 flex flex-col">
          <div className="w-32 h-6 bg-accent rounded mb-8" />
          <div className="h-4 w-3/4 bg-accent rounded mb-4" />
          <div className="h-4 w-1/2 bg-accent rounded" />
        </div>
        {/* Right Panel */}
        <div className="w-64 rounded-lg border border-border bg-background/50 p-4">
          <div className="w-full h-8 bg-accent rounded mb-4" />
          <div className="w-full h-24 bg-accent rounded mb-4" />
          <div className="w-full h-8 bg-accent rounded" />
        </div>
      </div>
    </motion.div>
  );
}
