import React from "react";

function Card2() {
  return (
    <div className="bg-custom-gradient w-full h-[42vh] rounded-xl md:h-[53vh] cursor-pointer font-tanker items-center shadow-lg">
      <div className="w-full h-full bg-white/85">
        <div className="bg-black/5 w-full rounded-xl h-full px-2 pt-2 pb-1">
          <img src="/Img/hot1.webp" alt="photo" className="rounded-lg mb-1" />
          <h1 className="text-sm md:text-xl">
            BASIC OLIVE Heavyweight T-shirt
          </h1>
          <div className="flex items-center">
            <p className="text-base mr-2 md:text-lg">$ 749.00</p>
            <p className="text-sm md:text-base line-through text-primaryGrayLight">
              $ 899.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card2;
