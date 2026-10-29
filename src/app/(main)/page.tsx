import type { Metadata } from "next";

import BannerSection from "@/components/homepage/banner/banner";
import FeaturesSection from "@/components/homepage/features/features";
import HowItWorksSection from "@/components/homepage/how-it-works/howItWorks";
import ChatbotWidgetDemo from "@/components/homepage/chatbot-widget-demo/chatbotWidgetDemo";

export const metadata: Metadata = {
  description:
    "Build interactive forms and chatbot widgets with SmartForm. Create forms, customize conversational experiences, publish public links, and manage submissions from one dashboard.",
};

export default function Home() {
  return (
    <div>
      <BannerSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ChatbotWidgetDemo />
    </div>
  );
}