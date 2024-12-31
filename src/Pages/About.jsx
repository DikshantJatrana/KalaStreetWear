import React from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const About = () => {
  const Navigate = useNavigate();
  return (
    <div className="bg-primaryGrayDark min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primaryBlue mb-4">
            About KalaStreetWear
          </h1>
          <p className="text-primaryGrayLight text-lg">
            Embrace the spirit of India with style and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-primaryPink mb-4">
              Our Vision
            </h2>
            <p className="text-primaryGrayLight mb-6 leading-relaxed">
              KalaStreetWear is more than just a clothing brand; it is a
              movement that celebrates individuality, culture, and modern
              fashion. Based in India, we bring you designs that blend
              traditional artistry with contemporary aesthetics.
            </p>
            <h2 className="text-3xl font-semibold text-primaryYellow mb-4">
              Why Choose Us?
            </h2>
            <p className="text-primaryGrayLight leading-relaxed">
              At KalaStreetWear, we use high-quality materials and sustainable
              practices to deliver premium streetwear. Each piece is designed to
              make a bold statement while ensuring comfort and durability.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="/public/Img/young-attractive-pinkhaired-woman-bright-fuchsia-hoodie-looks-into-camera-poses-with-smile-isolated-background.jpg"
              alt="KalaStreetWear Clothing"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-primaryBlue mb-4">
            Join the KalaStreetWear Community
          </h2>
          <p className="text-primaryGrayLight mb-6">
            Follow us on our journey as we redefine streetwear in India and
            beyond. Be bold, be creative, and always stay true to your roots.
          </p>
          <button
            onClick={() => {
              Navigate("/shop");
            }}
            className="bg-primaryPink text-primaryWhite px-6 py-3 font-semibold rounded-md hover:bg-primaryBlue transition-all"
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
