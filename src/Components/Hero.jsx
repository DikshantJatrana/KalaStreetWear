import React, { useEffect, useRef } from "react";
import gsap from "gsap";
function Hero() {
  const ImgRef = useRef();
  const NewImgRef = useRef();

  useEffect(() => {
    const img1 = new Image();
    img1.src = "/Img/pexels-cottonbro-5037540.jpg";
    const img2 = new Image();
    img2.src =
      "/Img/young-attractive-pinkhaired-woman-bright-fuchsia-hoodie-looks-into-camera-poses-with-smile-isolated-background.jpg";
    const img3 = new Image();
    img3.src = "/Img/pexels-mohammad-ubaid-584981963-17582336.jpg";
  }, []);

  const handleArtEnter = (ImgUrl) => {
    gsap.to(NewImgRef.current, {
      backgroundImage: `url(${ImgUrl})`,
      opacity: 1,
      scale: 1,
      ease: "power1.inOut",
    });
  };

  const handleArtLeave = () => {
    gsap.to(NewImgRef.current, {
      backgroundImage: `url("/Img/pexels-cottonbro-5319298.jpg)`,
      scale: 0.95,
      opacity: 0,
      ease: "power1.inOut",
    });
  };
  return (
    <div className="w-full px-4 h-[80vh] mb-[10vh]">
      <div
        ref={ImgRef}
        className="w-full relative h-[100%] rounded-xl  bg-center bg-cover bg-[url('/Img/pexels-cottonbro-5319298.jpg')]"
      >
        <div className="w-full z-20 h-[100%] bg-black/50 rounded-xl relative text-white text-center pt-[5vh] md:pt-[13vh] font-tanker">
          <h3 className="text-5xl py-[1px] md:py-1 md:text-6xl">
            Wear your{" "}
            <span
              onMouseEnter={() => {
                handleArtEnter("/Img/pexels-cottonbro-5037540.jpg");
              }}
              onMouseLeave={handleArtLeave}
              className="text-6xl md:text-7xl cursor-pointer text-primaryPink"
            >
              art
            </span>
          </h3>
          <h3 className="text-3xl py-[1px] md:py-1 md:text-6xl">
            Express{" "}
            <span
              onMouseLeave={handleArtLeave}
              onMouseEnter={() => {
                handleArtEnter(
                  "/Img/pexels-mohammad-ubaid-584981963-17582336.jpg"
                );
              }}
              className="text-4xl md:text-7xl cursor-pointer text-primaryYellow"
            >
              your culture
            </span>
          </h3>
          <h3 className="text-5xl py-[1px] md:py-1 md:text-6xl">
            Step into the street{" "}
          </h3>
          <h3 className="text-6xl py-[1px] md:py-1 md:text-8xl text-primaryBlue">
            <span
              onMouseLeave={handleArtLeave}
              onMouseEnter={() => {
                handleArtEnter(
                  "/Img/young-attractive-pinkhaired-woman-bright-fuchsia-hoodie-looks-into-camera-poses-with-smile-isolated-background.jpg"
                );
              }}
              className="cursor-pointer"
            >
              with Kala
            </span>
          </h3>
        </div>
        <div
          ref={NewImgRef}
          className="absolute top-0 left-0 rounded-xl w-full h-full bg-cover bg-center bg-[url('/Img/pexels-cottonbro-5037540.jpg')] opacity-0 scale-95"
        ></div>
      </div>
    </div>
  );
}

export default Hero;
