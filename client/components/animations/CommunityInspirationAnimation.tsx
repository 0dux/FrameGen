"use client";

import { motion } from "framer-motion";

export function CommunityInspirationAnimation() {
  return (
    <motion.div
      initial="idle"
      whileInView="hover"
      viewport={{ once: false, amount: 0.4 }}
      className="h-56 bg-zinc-50 dark:bg-zinc-950 w-full flex items-center justify-center border-b border-border relative overflow-hidden group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 transition-colors duration-700"
    >
      {/* Fade Overlays for scrolling effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-20 group-hover:from-zinc-100 dark:group-hover:from-zinc-900 transition-colors duration-700" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-20 group-hover:from-zinc-100 dark:group-hover:from-zinc-900 transition-colors duration-700" />

      {/* Scrolling Gallery Container */}
      <div className="relative w-[200%] h-full flex flex-col justify-center gap-4 group-hover:rotate-[-5deg] transition-transform duration-700">
        {/* Row 1: Scrolling Left to Right */}
        <motion.div
          className="flex gap-4 px-4 will-change-transform"
          variants={{
            idle: { x: "-25%" }, // set to middle so we see content when idle
            hover: {
              x: ["-50%", "0%"],
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={`row1-${item}`}
              className="relative shrink-0 w-32 h-20 rounded-md border border-border/50 bg-background/50 overflow-hidden shadow-sm flex flex-col justify-between p-1.5"
            >
              <div
                className={`absolute inset-0 opacity-20 dark:opacity-40 bg-linear-to-br ${["from-rose-500 to-orange-400", "from-blue-500 to-cyan-400", "from-violet-500 to-fuchsia-500", "from-emerald-500 to-teal-400"][item % 4]}`}
              />

              {/* Mock Image Area */}
              <div className="w-full h-10 rounded-sm bg-black/5 dark:bg-white/10" />

              {/* Mock Text/Profile Area */}
              <div className="flex items-center justify-between w-full z-10">
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/20" />
                  <div className="flex flex-col gap-0.5">
                    <div className="w-10 h-1 bg-black/10 dark:bg-white/20 rounded-full" />
                    <div className="w-6 h-1 bg-black/10 dark:bg-white/20 rounded-full" />
                  </div>
                </div>
                <div className="w-4 h-3 bg-primary/20 rounded-sm" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2: Scrolling Right to Left */}
        <motion.div
          className="flex gap-4 px-4 will-change-transform"
          variants={{
            idle: { x: "-25%" }, // set to middle
            hover: {
              x: ["0%", "-50%"],
              transition: {
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              },
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={`row2-${item}`}
              className="relative shrink-0 w-28 h-20 rounded-md border border-border/50 bg-background/50 overflow-hidden shadow-sm flex flex-col justify-between p-1.5"
            >
              <div
                className={`absolute inset-0 opacity-20 dark:opacity-40 bg-linear-to-tr ${["from-indigo-500 to-purple-500", "from-green-500 to-lime-400", "from-red-500 to-rose-400", "from-amber-500 to-yellow-400"][item % 4]}`}
              />

              {/* Mock Image Area */}
              <div className="w-full h-10 rounded-sm bg-black/5 dark:bg-white/10" />

              {/* Mock Text/Profile Area */}
              <div className="flex items-center justify-between w-full z-10">
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/20" />
                  <div className="flex flex-col gap-0.5">
                    <div className="w-8 h-1 bg-black/10 dark:bg-white/20 rounded-full" />
                    <div className="w-5 h-1 bg-black/10 dark:bg-white/20 rounded-full" />
                  </div>
                </div>
                <div className="w-4 h-3 bg-primary/20 rounded-sm" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
