import AboutProjectsParallaxGroup from "@/components/AboutProjectsParallaxGroup";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import type { CSSProperties } from "react";

const deferredSectionStyle: CSSProperties = {
  contentVisibility: "auto",
  containIntrinsicSize: "900px",
};

export default function HomeDeferredSections() {
  return (
    <>
      <div style={deferredSectionStyle}>
        <AboutProjectsParallaxGroup />
      </div>
      <div style={deferredSectionStyle}>
        <ServicesSection maxItems={12} />
      </div>
      <div style={deferredSectionStyle}>
        <ProcessSection />
      </div>
      <div style={deferredSectionStyle}>
        <TestimonialsSection />
      </div>
    </>
  );
}
