import { CallToAction } from "@/app/landing/sections/CallToAction";
import { Features } from "@/app/landing/sections/Features";
import { Hero } from "@/app/landing/sections/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}
