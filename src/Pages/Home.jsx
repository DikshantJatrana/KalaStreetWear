import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Clip from "../Components/Clip";
import Featured from "../Components/Featured";
import Style from "../Components/Style";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <Hero />
      <Clip />
      <Featured title={"Featured Products"} />
      <Style />
      <Featured title={"Hot Pick's"} containerClass={"mt-[70vh]"} />
      <Footer />
    </div>
  );
}

export default Home;
