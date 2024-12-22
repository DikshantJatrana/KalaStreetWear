import React from "react";
import Navbar from "../Components/Navbar";
import Card2 from "../Components/Card2";
import Footer from "../Components/Footer";

function ProductCatlog() {
  return (
    <div className="flex flex-col min-h-screen font-tanker">
      <Navbar />
      <div className="underline px-4 text-4xl md:text-5xl">
        Best Fashion pick's
      </div>
      <div className="flex-grow px-4 grid grid-cols-2 gap-4 mt-[5vh] md:grid-cols-4">
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
      </div>
      <Footer />
    </div>
  );
}

export default ProductCatlog;
