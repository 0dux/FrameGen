"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Palette = {
  id: string;
  colors: [string, string, string];
};

const PALETTES: Palette[] = [
  { id: "coral-aqua", colors: ["#ff6b6b", "#51c4d3", "#7bdff2"] },
  { id: "sunset-pop", colors: ["#ff8a3d", "#ff3d57", "#9f3d7f"] },
  { id: "ocean-mint", colors: ["#1d7ddc", "#15b2d3", "#95d9f3"] },
  { id: "forest-sage", colors: ["#3d7a57", "#6bb38d", "#9be0b2"] },
  { id: "violet-bloom", colors: ["#6f2dbd", "#8d3fd4", "#c77dff"] },
  { id: "graphite-fog", colors: ["#252a34", "#5a6472", "#c7d0dd"] },
  { id: "neon-play", colors: ["#ff00e5", "#00e5ff", "#ffe600"] },
  { id: "blush-linen", colors: ["#ffb5a7", "#fcd5ce", "#f8edeb"] },
];

const SLOT_COUNT = 5;
const AUTO_ROTATE_MS = 2600;

function mod(index: number, length: number) {
  return ((index % length) + length) % length;
}

function getShortestOffset(index: number, activeIndex: number, length: number) {
  const raw = index - activeIndex;
  const wrapped = raw > length / 2 ? raw - length : raw < -length / 2 ? raw + length : raw;

  return wrapped;
}

function getStageBackground(
  colors: [string, string, string],
  isDark: boolean,
) {
  const baseGradient = isDark
    ? "linear-gradient(135deg, #090a0d 0%, #10141b 55%, #090a0d 100%)"
    : "linear-gradient(135deg, #fff8f4 0%, #f7f9fc 48%, #eef4fb 100%)";
  const mixedGradient = isDark
    ? `linear-gradient(140deg, ${colors[0]}14 0%, transparent 24%, ${colors[1]}16 52%, transparent 74%, ${colors[2]}14 100%)`
    : `linear-gradient(140deg, ${colors[0]}1f 0%, transparent 26%, ${colors[1]}22 52%, transparent 74%, ${colors[2]}1c 100%)`;

  return `
    radial-gradient(circle at 18% 22%, ${colors[0]}${isDark ? "42" : "30"} 0%, transparent 30%),
    radial-gradient(circle at 82% 24%, ${colors[1]}${isDark ? "36" : "2b"} 0%, transparent 28%),
    radial-gradient(circle at 50% 82%, ${colors[2]}${isDark ? "28" : "22"} 0%, transparent 34%),
    ${mixedGradient},
    ${baseGradient}
  `;
}

export function ColorPalettesAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePalette = PALETTES[activeIndex];
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => mod(current + 1, PALETTES.length));
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative h-56 w-full overflow-hidden border-b border-border bg-[#f8f7f4] dark:bg-[#0c0e12]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePalette.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          style={{ background: getStageBackground(activePalette.colors, isDark) }}
        />
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 opacity-85"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `
            linear-gradient(120deg, ${activePalette.colors[0]}${isDark ? "12" : "18"} 0%, ${activePalette.colors[1]}${isDark ? "18" : "22"} 48%, ${activePalette.colors[2]}${isDark ? "12" : "18"} 100%),
            linear-gradient(300deg, transparent 10%, ${activePalette.colors[2]}${isDark ? "10" : "14"} 40%, ${activePalette.colors[0]}${isDark ? "12" : "18"} 72%, transparent 100%)
          `,
          backgroundSize: "180% 180%, 160% 160%",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, rgba(255,255,255,0.10), transparent 42%)"
            : "radial-gradient(circle at center, rgba(255,255,255,0.52), transparent 44%)",
        }}
      />

      <div className="relative flex h-full items-center justify-center">
        <div className="relative h-24 w-full max-w-lg">
          {PALETTES.map((palette, index) => {
            const offset = getShortestOffset(index, activeIndex, PALETTES.length);
            const hidden = Math.abs(offset) > Math.floor(SLOT_COUNT / 2);
            const isActive = offset === 0;

            return (
              <motion.button
                key={palette.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="absolute left-1/2 top-1/2 h-12 w-19.5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-black/10 shadow-[0_10px_24px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:border-white/15 dark:shadow-none dark:focus-visible:ring-white/70"
                initial={false}
                animate={{
                  x: offset * 88,
                  scale: isActive ? 1.16 : Math.abs(offset) === 1 ? 0.96 : 0.82,
                  opacity: hidden ? 0 : isActive ? 1 : Math.abs(offset) === 1 ? 0.72 : 0.34,
                  rotateZ: isActive ? 0 : offset * -4,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                style={{ zIndex: 20 - Math.abs(offset) }}
                aria-label={`Switch to palette ${index + 1}`}
                aria-pressed={isActive}
              >
                <span className="absolute inset-0.5 overflow-hidden rounded-[14px]">
                  <span className="flex h-full w-full">
                    {palette.colors.map((color) => (
                      <span
                        key={`${palette.id}-${color}`}
                        className="h-full flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_52%,rgba(0,0,0,0.14))]" />
                </span>

                {isActive ? (
                  <motion.span
                    layoutId="palette-highlight"
                    className="absolute inset-0 rounded-2xl border border-black/20 shadow-[0_10px_30px_rgba(15,23,42,0.16)] dark:border-white/65 dark:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                  />
                ) : null}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
