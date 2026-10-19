import BannerSection from "@/components/homepage/banner/banner";
import FeaturesSection from "@/components/homepage/features/features";
import HowItWorksSection from "@/components/homepage/how-it-works/howItWorks";
import ChatbotWidgetDemo from "@/components/homepage/chatbot-widget-demo/chatbotWidgetDemo";

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