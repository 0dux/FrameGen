import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { featuresData } from "../data/features";
import type { IFeature } from "../types";

export default function FeaturesSection() {
  return (
    <div id="features" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1="Features"
        text2="Why use our generator?"
        text3="Built with modern AI technology to help creators move faster."
      />
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16 px-6">
        {featuresData.map((feature: IFeature, index: number) => (
          <motion.div
            key={index}
            className={`${
              index === 1
                ? "p-px rounded-[13px] bg-linear-to-br from-blue-600 to-slate-800"
                : ""
            }`}
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <div className="p-6 rounded-xl space-y-4 border border-slate-800 bg-slate-950 max-w-80 w-full">
              {feature.icon}
              <h3 className="text-base font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 line-clamp-2 pb-4">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-40 relative mx-auto max-w-5xl">
        <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full bg-blue-500/40 blur-3xl"></div>
        <motion.p
          className="text-slate-300 text-lg text-left max-w-3xl"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          This AI-based thumbnail generator helps you turn your video idea into
          a compelling thumbnail in just a few clicks.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
          <motion.div
            className="md:col-span-2"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 70,
              mass: 1,
            }}
          >
            <img
              className="w-full h-auto object-cover rounded-4xl"
              src="/assets/features-showcase-1.png"
              alt="features showcase"
              width={1000}
              height={500}
            />
          </motion.div>
          <motion.div
            className="md:col-span-1"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <img
              src="/assets/features-showcase-2.png"
              alt="features showcase"
              width={1000}
              height={500}
              className="hover:-translate-y-0.5 transition duration-300"
            />
            <h3 className="text-[24px]/7.5 text-slate-300 font-medium mt-6">
              Boost your views with AI-optimized designs{" "}
            </h3>
            <p className="text-slate-300 mt-2">
              Stop guessing and start ranking. Our ai designs are proven to
              capture attention.
            </p>
            <Link
              to="/generate"
              className="group flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 transition"
            >
              Start generating for free
              <ArrowUpRight className="size-5 group-hover:translate-x-0.5 transition duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
