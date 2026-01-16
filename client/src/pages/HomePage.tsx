import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";
import FeaturesSection from "../sections/FeaturesSection";
import HeroSection from "../sections/HeroSection";
import TestimonialSection from "../sections/TestimonialSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      {/* <PricingSection /> */}
      <ContactSection />
      <CTASection />
    </>
  );
}
