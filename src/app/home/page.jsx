import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero.jsx";
import ChoosePath from "@/components/ChoosePath.jsx";
import TrendingProjects from "@/components/TrendingProjects";
import CTASection from "@/components/CTASection.jsx";
import Footer from "@/components/Footer.jsx";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ChoosePath />
      <TrendingProjects />
      <CTASection />
      <Footer />
    </>
  );
}