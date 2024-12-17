import React, { useRef } from "react";
import gsap from "gsap";
function Hero() {
  const ImgRef = useRef();
  const handleArtEnter = () => {
    gsap.to(ImgRef.current, {
      backgroundImage: "/public/Img/pexels-cottonbro-5037540.jpg",
      duration: 0.7,
      ease: "power1.inOut",
    });
  };
  return (
    <div className="w-full px-4 h-[80vh]">
      <div
        ref={ImgRef}
        className="w-full h-[100%] rounded-xl  bg-center bg-cover bg-[url('/Img/pexels-cottonbro-5319298.jpg')]"
      >
        <div className="w-full h-[100%] bg-black/70 rounded-xl relative text-white text-center pt-[5vh] md:pt-[13vh] font-tanker">
          <h3 className="text-5xl md:text-6xl">
            Wear your{" "}
            <span
              onMouseEnter={handleArtEnter}
              className="text-6xl md:text-7xl cursor-pointer text-primaryPink"
            >
              art
            </span>
          </h3>
          <h3 className="text-3xl md:text-6xl">
            Express{" "}
            <span className="text-4xl md:text-7xl cursor-pointer text-primaryYellow">
              your culture
            </span>
          </h3>
          <h3 className="text-4xl md:text-6xl">Step into the street </h3>
          <h3 className="text-6xl md:text-8xl text-primaryBlue">
            <span className="cursor-pointer">with Kala</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Hero;
