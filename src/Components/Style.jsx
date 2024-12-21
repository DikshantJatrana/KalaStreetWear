import React from "react";

function Style() {
  return (
    <div className="w-full h-[60vh] md:grid md:grid-cols-2 my-[7vh]">
      <div className="w-full h-full bg-primaryBlue leading-[1rem] font-tanker flex flex-col items-center justify-center">
        <h1 className="text-6xl leading-[5rem]">Steal these</h1>
        <h1 className="text-9xl text-white leading-[5rem] special">Style</h1>
      </div>
      <div className="w-full h-full relative">
        <img
          className="w-[40vh] hidden md:inline absolute top-[2.5%] right-[15%] border-[3px] border-primaryYellow"
          src="/public/Img/pexels-cottonbro-5037540.jpg"
        />
        <img
          className="w-[40vh] absolute bottom-[2.5%] right-1/2 translate-x-1/2 md:translate-x-0 md:right-[5%] border-[3px] border-primaryBlue"
          src="/public/Img/pexels-mohammad-ubaid-584981963-17582336.jpg"
        />
        <img
          className="w-[28vh] absolute -top-[25%] left-1/2 -translate-x-1/2 md:-translate-x-0 md:-left-[20%] md:top-1/2 md:-translate-y-1/2 border-[3px] border-primaryPink"
          src="/public/Img/pexels-yulianaphoto-9656920.jpg"
        />
      </div>
    </div>
  );
}

export default Style;
