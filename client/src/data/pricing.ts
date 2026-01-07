import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
  {
    name: "Basic",
    price: 29,
    period: "month",
    features: [
      "50 AI Thumbnails/mo",
      "Basic Templates",
      "Standard Resolution",
      "No Watermark",
      "Email Support",
    ],
    mostPopular: false,
  },
  {
    name: "Pro",
    price: 79,
    period: "month",
    features: [
      "Unlimited Thumbnails",
      "Premium Templates",
      "4k Resolution",
      "A/B Testing Tools",
      "Priority Support",
      "Custom Fonts",
      "Brand Kit Analysis",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    period: "month",
    features: [
      "All Features of PRO",
      "API Access",
      "Team Collaboration",
      "Custom Branding",
      "Dedicated Acount Manager",
    ],
    mostPopular: false,
  },
];
