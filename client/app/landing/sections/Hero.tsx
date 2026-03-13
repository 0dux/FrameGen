"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { Particles } from "@/components/ui/particles";
import {
  ArrowRight01Icon,
  PlayCircleIcon,
  SparklesIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContainerTextFlip } from "../../../components/ui/container-text-flip";
import { marqueeThumbnails } from "@/app/assets/assets";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Hero() {
  const router = useRouter();
  const words = ["YouTube", "Instagram", "TikTok"];
  const shouldReduceMotion = useReducedMotion();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = mounted && currentTheme === "dark";

  const scrollToVideo = () => {
    const videoElement = document.getElementById("cta-video");
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 relative overflow-hidden">
      {/* Particles Background (Dark Mode Only) */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        {isDark && (
          <Particles
            className="absolute inset-0 w-full h-full"
            quantity={150}
            ease={80}
            color="#ffffff"
            refresh
          />
        )}
      </div>

      {/* Light Mode Background Layer (now just relies on default theme background) */}
      {!isDark && (
        <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-50 bg-background" />
      )}

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        className="flex flex-col items-center z-10 w-full"
      >
        <motion.div
          variants={itemVariants}
          whileHover="hover"
          className="cursor-pointer"
        >
          <Badge
            variant="secondary"
            className="mb-8 py-3 px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-full text-sm font-medium gap-2"
          >
            <HugeiconsIcon
              icon={SparklesIcon}
              className="w-4 h-4 text-primary"
            />
            <AnimatedGradientText speed={2}>
              Get your first thumbnail on us
            </AnimatedGradientText>
            <motion.span
              variants={{
                initial: { x: 0 },
                hover: { x: 5 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="w-4 h-4 text-primary"
              />
            </motion.span>
          </Badge>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight pb-1 mb-6 max-w-3xl bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent"
        >
          The Smart Way to Make Thumbnails for your{" "}
          <ContainerTextFlip words={words} /> videos
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
        >
          Stop struggling with complex design tools. Frame Gen uses advanced AI
          to generate irresistible, scroll-stopping thumbnails in seconds.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full justify-center"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{
              type: "spring",
              duration: 0.3,
            }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={() => router.push("/generate")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base w-full sm:w-auto gap-2"
            >
              Generate Your First Thumbnail
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <MovingBorderButton
              onClick={scrollToVideo}
              borderRadius="1.75rem"
              containerClassName="h-12 w-full sm:w-auto"
              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground px-8 text-base gap-2"
              duration={3000}
            >
              Watch video
              <HugeiconsIcon icon={PlayCircleIcon} className="w-4 h-4" />
            </MovingBorderButton>
          </motion.div>
        </motion.div>
        {/* Feature Checkmarks below buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-24 w-full flex-wrap"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <HugeiconsIcon icon={Tick01Icon} className="w-5 h-5 text-primary" />
            Super simple to use
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <HugeiconsIcon icon={Tick01Icon} className="w-5 h-5 text-primary" />
            No design skills needed
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <HugeiconsIcon icon={Tick01Icon} className="w-5 h-5 text-primary" />
            Super fast generation
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <HugeiconsIcon icon={Tick01Icon} className="w-5 h-5 text-primary" />
            High CTR templates
          </div>
        </motion.div>
      </motion.div>

      {/* Full-width, borderless marquee */}
      <motion.div
        initial={
          shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="w-full relative z-10"
      >
        <div className="relative flex h-80 md:h-96 w-full flex-col items-center justify-center overflow-hidden bg-background">
          <Marquee pauseOnHover className="[--duration:30s]">
            {marqueeThumbnails.map((src, idx) => (
              <div
                key={idx}
                className="group/item relative h-56 md:h-72 w-80 md:w-112.5 overflow-hidden rounded-xl border border-border bg-muted/20"
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx}`}
                  fill
                  priority={idx < 3}
                  className="object-cover transition-transform duration-300 group-hover/item:scale-105"
                  sizes="(max-width: 768px) 320px, 450px"
                />
              </div>
            ))}
          </Marquee>

          {/* Gradient Overlays for smooth entry/exit */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
        </div>
      </motion.div>
    </main>
  );
}
