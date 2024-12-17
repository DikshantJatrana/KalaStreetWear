import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";

function Home() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;
