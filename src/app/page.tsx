import Hero from "@/components/Hero";
import AboutProjectsParallaxGroup from "@/components/AboutProjectsParallaxGroup";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutProjectsParallaxGroup />
      <ServicesSection maxItems={12} />
      <ProcessSection />
      <TestimonialsSection />
    </main>
  );
}
