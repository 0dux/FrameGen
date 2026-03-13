"use client";

import { SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

export function CustomStylesAnimation() {
  return (
    <motion.div
      initial="idle"
      whileInView="hover"
      viewport={{ once: false, amount: 0.4 }}
      className="h-56 bg-zinc-50 dark:bg-zinc-950 w-full flex items-center justify-center border-b border-border relative overflow-hidden group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 transition-colors duration-700 perspective-[1000px]"
    >
      {/* Dynamic Background that changes with the active style (Optimized with Opacity) */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30 blur-2xl">
        <motion.div
          className="absolute inset-0 bg-[#8b5cf6]"
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: [1, 0, 0, 0, 1],
              transition: { duration: 12, repeat: Infinity, ease: "linear" },
            },
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[#ec4899]"
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: [0, 1, 0, 0, 0],
              transition: { duration: 12, repeat: Infinity, ease: "linear" },
            },
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[#3b82f6]"
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: [0, 0, 1, 0, 0],
              transition: { duration: 12, repeat: Infinity, ease: "linear" },
            },
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[#10b981]"
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: [0, 0, 0, 1, 0],
              transition: { duration: 12, repeat: Infinity, ease: "linear" },
            },
          }}
        />
      </div>

      {/* Central Element being stylized */}
      <div className="relative z-10 w-28 h-28 transform-3d group-hover:scale-105 transition-transform duration-500">
        <motion.div
          className="absolute inset-0 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20 dark:border-white/10 overflow-hidden"
          variants={{
            idle: { rotateY: 0 },
            hover: {
              rotateY: [0, 180, 360],
              transition: { duration: 12, repeat: Infinity, ease: "linear" },
            },
          }}
          style={{ transformOrigin: "center center" }}
        >
          {/* Optimized Background Color Shifts using Opacity */}
          <motion.div
            className="absolute inset-0 bg-violet-500/40"
            variants={{
              idle: { opacity: 0 },
              hover: {
                opacity: [1, 0, 0, 0, 1],
                transition: { duration: 12, repeat: Infinity, ease: "linear" },
              },
            }}
          />
          <motion.div
            className="absolute inset-0 bg-pink-500/40"
            variants={{
              idle: { opacity: 0 },
              hover: {
                opacity: [0, 1, 0, 0, 0],
                transition: { duration: 12, repeat: Infinity, ease: "linear" },
              },
            }}
          />
          <motion.div
            className="absolute inset-0 bg-blue-500/40"
            variants={{
              idle: { opacity: 0 },
              hover: {
                opacity: [0, 0, 1, 0, 0],
                transition: { duration: 12, repeat: Infinity, ease: "linear" },
              },
            }}
          />
          <motion.div
            className="absolute inset-0 bg-emerald-500/40"
            variants={{
              idle: { opacity: 0 },
              hover: {
                opacity: [0, 0, 0, 1, 0],
                transition: { duration: 12, repeat: Infinity, ease: "linear" },
              },
            }}
          />
          <HugeiconsIcon
            icon={SparklesIcon}
            className="w-10 h-10 text-white drop-shadow-md"
          />
        </motion.div>
      </div>

      {/* Floating "Style" Buttons clicking themselves */}
      {[
        {
          top: "15%",
          left: "15%",
          delay: 0,
          color: "bg-violet-500",
          clickTime: 0,
        },
        {
          top: "25%",
          right: "15%",
          delay: 0.5,
          color: "bg-pink-500",
          clickTime: 3,
        },
        {
          bottom: "20%",
          left: "20%",
          delay: 1,
          color: "bg-blue-500",
          clickTime: 6,
        },
        {
          bottom: "15%",
          right: "20%",
          delay: 1.5,
          color: "bg-emerald-500",
          clickTime: 9,
        },
      ].map((btn, i) => (
        <motion.div
          key={`style-btn-${i}`}
          className="absolute z-20"
          style={{
            top: btn.top,
            left: btn.left,
            right: btn.right,
            bottom: btn.bottom,
          }}
          variants={{
            idle: { y: 0 },
            hover: {
              y: [-5, 5, -5],
              transition: {
                duration: 3,
                repeat: Infinity,
                delay: btn.delay,
                ease: "easeInOut",
              },
            },
          }}
        >
          <motion.div
            className={`w-10 h-10 rounded-full ${btn.color} shadow-lg border-2 border-white dark:border-zinc-800 flex items-center justify-center cursor-pointer`}
            // Simulate a "click" press (Optimized scale only)
            variants={{
              idle: { scale: 1 },
              hover: {
                scale: [1, 0.8, 1],
                transition: {
                  duration: 0.4,
                  repeat: Infinity,
                  repeatDelay: 11.6,
                  delay: btn.clickTime,
                },
              },
            }}
          >
            <div className="w-3 h-3 rounded-full bg-white/50" />
          </motion.div>

          {/* Ping effect when clicked */}
          <motion.div
            className={`absolute inset-0 rounded-full ${btn.color} -z-10`}
            variants={{
              idle: { scale: 1, opacity: 0 },
              hover: {
                scale: [1, 2],
                opacity: [0.8, 0],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 11.2,
                  delay: btn.clickTime,
                },
              },
            }}
          />
        </motion.div>
      ))}

      {/* Connecting lines to center (simulating application) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[
          // btn 1: top: 15%, left: 15% (center: 15% + 20px, 15% + 20px)
          {
            x1: "calc(15% + 20px)",
            y1: "calc(15% + 20px)",
            clickTime: 0,
            color: "stroke-violet-500",
          },
          // btn 2: top: 25%, right: 15% -> left: 85% (center: 85% - 20px, 25% + 20px)
          {
            x1: "calc(85% - 20px)",
            y1: "calc(25% + 20px)",
            clickTime: 3,
            color: "stroke-pink-500",
          },
          // btn 3: bottom: 20%, left: 20% -> top: 80% (center: 20% + 20px, 80% - 20px)
          {
            x1: "calc(20% + 20px)",
            y1: "calc(80% - 20px)",
            clickTime: 6,
            color: "stroke-blue-500",
          },
          // btn 4: bottom: 15%, right: 20% -> top: 85%, left: 80% (center: 80% - 20px, 85% - 20px)
          {
            x1: "calc(80% - 20px)",
            y1: "calc(85% - 20px)",
            clickTime: 9,
            color: "stroke-emerald-500",
          },
        ].map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2="50%"
            y2="50%"
            className={`${line.color} dark:opacity-80`}
            strokeWidth="2"
            strokeDasharray="4 4"
            variants={{
              idle: { pathLength: 0, opacity: 0 },
              hover: {
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 10.5,
                  delay: line.clickTime,
                },
              },
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
