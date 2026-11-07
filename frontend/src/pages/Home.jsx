import Hero from "../components/home/Hero";
import FeaturedDoctors from "../components/home/FeaturedDoctors";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Services from "../components/home/Services";
import HowItWorks from "../components/home/HowItWorks";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedDoctors />
      <WhyChooseUs />
      <Services />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;