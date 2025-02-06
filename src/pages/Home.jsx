import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/hero/Hero";
import Services from "../components/Services/Services";
import Banner from "../components/Banner/Banner";

const Home = () => {
  return (
    <div>
      
      <Hero />
      <Services />
      <Banner/>
    </div>
  );
};

export default Home;
