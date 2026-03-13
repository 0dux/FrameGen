"use client";

import { motion } from "framer-motion";

export function ColorPalettesAnimation() {
  return (
    <motion.div
      initial="idle"
      whileInView="hover"
      viewport={{ once: false, amount: 0.4 }}
      className="h-56 bg-zinc-50 dark:bg-zinc-900 w-full flex items-center justify-center border-b border-border relative overflow-hidden group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 transition-colors duration-700 perspective-[1000px]"
    >
      {/* Dynamic Theme Environment (Optimized using Opacity) */}
      <div className="absolute inset-0 opacity-20 dark:opacity-40">
        <motion.div
          className="absolute inset-0 bg-linear-to-tr from-[#f43f5e] to-[#f59e0b]"
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: [1, 0, 0, 0, 1],
              transition: { duration: 10, repeat: Infinity, ease: "linear" },
            },
          }}
        />
        <motion.div
          className="absolute inset-0 bg-linear-to-tr from-[#3b82f6] to-[#10b981]"
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: [0, 1, 0, 0, 0],
              transition: { duration: 10, repeat: Infinity, ease: "linear" },
            },
          }}
        />
        <motion.div
          className="absolute inset-0 bg-linear-to-tr from-[#8b5cf6] to-[#ec4899]"
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: [0, 0, 1, 0, 0],
              transition: { duration: 10, repeat: Infinity, ease: "linear" },
            },
          }}
        />
        <motion.div
          className="absolute inset-0 bg-linear-to-tr from-[#f43f5e] to-[#f59e0b]"
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: [0, 0, 0, 1, 0],
              transition: { duration: 10, repeat: Infinity, ease: "linear" },
            },
          }}
        />
      </div>
      <div className="relative w-full h-full flex items-center justify-center transform-style-3d gap-4 z-10">
        {/* Floating Color Plates that shift colors */}
        {[
          {
            delay: 0,
            yOffset: -5,
            colors: ["#f43f5e", "#3b82f6", "#8b5cf6", "#f43f5e"],
          },
          {
            delay: -3.33,
            yOffset: 10,
            colors: ["#f59e0b", "#10b981", "#ec4899", "#f59e0b"],
          },
          {
            delay: -6.66,
            yOffset: -5,
            colors: ["#ef4444", "#06b6d4", "#d946ef", "#ef4444"],
          },
        ].map((plate, i) => (
          <motion.div
            key={`plate-${i}`}
            className="w-16 h-28 rounded-2xl shadow-xl border border-black/5 dark:border-white/10 relative overflow-hidden"
            variants={{
              idle: { y: plate.yOffset },
              hover: {
                y: [plate.yOffset, plate.yOffset - 10, plate.yOffset],
                scale: 1.1,
                transition: {
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.abs(plate.delay),
                  },
                },
              },
            }}
          >
            {/* The color block that transitions (Optimized block using opacity layers) */}
            <div className="absolute inset-0">
              {plate.colors.map((color, idx) => {
                const isLast = idx === plate.colors.length - 1;
                if (isLast) return null; // We only need 3 discrete transition stages for 4 items because the 4th is the same as 1st

                const opacityFrames =
                  idx === 0
                    ? [1, 0, 0, 1]
                    : idx === 1
                      ? [0, 1, 0, 0]
                      : [0, 0, 1, 0];

                return (
                  <motion.div
                    key={idx}
                    className="absolute inset-0"
                    style={{ backgroundColor: color }}
                    variants={{
                      idle: { opacity: idx === 0 ? 1 : 0 },
                      hover: {
                        opacity: opacityFrames,
                        transition: {
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      },
                    }}
                  />
                );
              })}
            </div>
            {/* Glass Overlay for sheen */}
            <div className="absolute inset-0 bg-linear-to-b from-white/60 to-transparent opacity-50 dark:from-white/40" />
            {/* Base structure at bottom */}
            <div className="absolute bottom-2 left-2 right-2 h-6 bg-white/40 dark:bg-white/20 backdrop-blur-md rounded-lg" />
            <div className="absolute bottom-10 left-2 right-2 h-2 bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-full" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
