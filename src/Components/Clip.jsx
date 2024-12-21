import React from "react";

function Clip() {
  return (
    <div className="w-full h-[32vh] md:h-[45vh] shadow-2xl bg-primaryYellow relative">
      <img
        src="/public/Img/pexels-photo-4711733.webp"
        alt="photo-1"
        className="polygon1 h-[35vh] md:h-[52vh] absolute top-2 left-5 md:left-1/2 md:-translate-x-1/2"
      />
      <img
        src="/public/Img/pexels-shvets-production-7194418.jpg"
        alt="photo-2"
        className="triangle1 hidden md:inline md:h-[57vh] absolute top-1"
      />
      <img
        className="triangle2 h-[32vh] md:h-[45vh] absolute bottom-10 right-4"
        src="/public/Img/pexels-alican-helik-362148343-18075374.jpg"
        alt="photo-3"
      />
      <div className="triangle3 bg-primaryBlue aspect-square h-[15vh] md:h-[20vh] absolute top-[4vh] left-1/2 md:left-2/3"></div>
      <div className="triangle4 bg-primaryPink aspect-square h-[12vh] absolute bottom-0 left-[32%]"></div>
    </div>
  );
}

export default Clip;
