import Header from "../../components/landing/Header";
import Features from "../../components/landing/Features";
import Hero from "../../components/landing/Hero";
import CallToAction from "../../components/landing/CallToAction";
import DashboardPreview from "../../components/landing/DashboardPreview";
import HowItWorks from "../../components/landing/HowItWorks";
import Footer from "../../components/landing/Footer";

import "../../components/landing/css/Landing.css";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <CallToAction />
      <Footer />
    </>
  );
};

export default LandingPage;
