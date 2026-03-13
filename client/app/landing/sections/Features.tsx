"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, Variants } from "framer-motion";
import { AiGenerationAnimation } from "../../../components/animations/AiGenerationAnimation";
import { BoldTextAnimation } from "../../../components/animations/BoldTextAnimation";
import { ColorPalettesAnimation } from "../../../components/animations/ColorPalettesAnimation";
import { CommunityInspirationAnimation } from "../../../components/animations/CommunityInspirationAnimation";
import { CustomStylesAnimation } from "../../../components/animations/CustomStylesAnimation";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Features() {
  return (
    <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 },
          },
        }}
        className="flex flex-col items-center text-center mb-16 max-w-3xl"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Badge
            variant="secondary"
            className="mb-6 py-1.5 px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-full text-sm font-medium gap-2"
          >
            <HugeiconsIcon
              icon={SparklesIcon}
              className="w-4 h-4 text-primary"
            />
            Features
          </Badge>
        </motion.div>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground"
        >
          Everything you need. Zero design degree required.
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-lg text-muted-foreground"
        >
          Powerful features designed to turn casual scrollers into loyal
          viewers. Let the AI do the heavy lifting while you take all the
          creative credit.
        </motion.p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full">
        {/* Top Row: 2 Cards */}
        {/* Card 1 */}
        <motion.div
          className="col-span-1 md:col-span-3 h-full"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full bg-card border-border overflow-hidden flex flex-col group pt-0 gap-0">
            <AiGenerationAnimation />
            <CardHeader>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                AI-Powered Generation
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base mt-2">
                Powered by Nano Banana Pro. Just type what you want, and watch
                our AI turn your ideas into eye-popping thumbnails faster than
                you can say &quot;click here.&quot;
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="col-span-1 md:col-span-3 h-full"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full bg-card border-border overflow-hidden flex flex-col group pt-0 gap-0">
            <BoldTextAnimation />
            <CardHeader>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                Bold, Custom Text Titles
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base mt-2">
                Drop the mic, and the text. Add striking, customizable titles
                right onto your generated thumbnails so your audience knows
                exactly what to expect.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Bottom Row: 3 Cards */}
        {/* Card 3 */}
        <motion.div
          className="col-span-1 md:col-span-2 h-full"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full bg-card border-border overflow-hidden flex flex-col group pt-0 gap-0">
            <ColorPalettesAnimation />
            <CardHeader>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                Preset Color Palettes
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base mt-2">
                Color outside the lines. Match your brand&apos;s exact vibe
                effortlessly with our curated, high-converting preset color
                themes.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          className="col-span-1 md:col-span-2 h-full"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full bg-card border-border overflow-hidden flex flex-col group pt-0 gap-0">
            <CustomStylesAnimation />
            <CardHeader>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                Custom Visual Styles
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base mt-2">
                From photorealistic masterpieces to pure neon flair. Choose a
                generation style that perfectly matches your channel&apos;s
                personality.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Card 5 */}
        <motion.div
          className="col-span-1 md:col-span-2 h-full"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full bg-card border-border overflow-hidden flex flex-col group pt-0 gap-0">
            <CommunityInspirationAnimation />
            <CardHeader>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                Community Inspiration
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base mt-2">
                Writer&apos;s block? Browse our community gallery to see
                what&apos;s actually working and borrow top-tier prompts from
                the best creators.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
