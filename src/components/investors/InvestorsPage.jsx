import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InvestorsHero from "./InvestorsHero";
import InvestorsStats from "./InvestorsStats";
import InvestorsFeatures from "./InvestorsFeatures";
import InvestmentOpportunities from "./InvestmentOpportunities";

export default function InvestorsPage() {
  return (
    <>
      <Navbar />
      <InvestorsHero />
      <InvestorsStats />
      <InvestorsFeatures />
      <InvestmentOpportunities />
      <Footer />
    </>
  );
}
