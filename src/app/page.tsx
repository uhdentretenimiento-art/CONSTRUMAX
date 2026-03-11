import Hero from "@/components/Hero";
import AboutUsSection from "@/components/AboutUsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutUsSection />
      <ProjectsSection />
      <ServicesSection maxItems={12} />
      <ProcessSection />
      <TestimonialsSection />
    </main>
  );
}
