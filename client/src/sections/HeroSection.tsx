import {
  CheckIcon,
  ChevronRightIcon,
  ImagePlus,
  VideoIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import TiltedImage from "../components/TiltImage";

export default function HeroSection() {
  const navigate = useNavigate();
  const specialFeatures = [
    "Super simple to use",
    "No design skills needed",
    "Super fast generation",
    "High CTR templates",
  ];

  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="absolute top-30 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]"></div>
      <motion.a
        href="https://prebuiltui.com?utm_source=pixels"
        className="group flex items-center gap-2 rounded-full p-1 pr-3 mt-44 text-pink-100 bg-pink-200/15"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 320,
          damping: 70,
          mass: 1,
        }}
      >
        <span className="bg-pink-800 text-white text-xs px-3.5 py-1 rounded-full">
          NEW
        </span>
        <p className="flex items-center gap-1">
          <span> First thumbnail generation is free for new users</span>
          <ChevronRightIcon
            size={16}
            className="group-hover:translate-x-1     transition duration-300"
          />
        </p>
      </motion.a>
      <motion.h1
        className="text-5xl/18 md:text-6xl/22 font-medium max-w-3xl text-center"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
      >
        AI Thumbnail Generator for your{" "}
        <span className="move-gradient px-3 rounded-xl text-nowrap">
          Videos.
        </span>
      </motion.h1>
      <motion.p
        className="text-base text-center text-slate-200 max-w-lg mt-6"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 320,
          damping: 70,
          mass: 1,
        }}
      >
        Generate high-quality, eye-catching YouTube thumbnails using AI. No
        design skills. No endless revisions. Just results.
      </motion.p>
      <motion.div
        className="flex items-center gap-4 mt-8"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
      >
        <button
          onClick={() => navigate("/generate")}
          className="group flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full px-7 h-11"
        >
          <ImagePlus className="group-hover:scale-105 overflow-hidden transition-all duration-200" />{" "}
          Generate Thumbnail
        </button>
        <button className="flex items-center gap-2 border border-pink-900 hover:bg-pink-950/50 transition rounded-full px-6 h-11">
          <VideoIcon strokeWidth={1} />
          <span>See How It Works</span>
        </button>
      </motion.div>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
        {specialFeatures.map((feature, index) => (
          <motion.p
            className="flex items-center gap-2"
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.3 }}
          >
            <CheckIcon className="size-5 text-pink-600" />
            <span className="text-slate-400">{feature}</span>
          </motion.p>
        ))}
      </div>
      <TiltedImage />
    </div>
  );
}
