import BackgroundEffects from "../components/homePage/BackgroundEffects";
import CTA from "../components/homePage/CTA";
import Features from "../components/homePage/Features";
import Hero from "../components/homePage/Hero";
import HowItWorks from "../components/homePage/HowItWorks";
import Navbar from "../components/homePage/Navbar";
import Stats from "../components/homePage/Stats";

function Home() {
  return (
    <>
      <div className="relative min-h-screen bg-[#050816] text-white overflow-x-hidden">
        <BackgroundEffects />
        <Navbar />
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <CTA />
      </div>
    </>
  );
}

export default Home;
