import React from "react";

function Card1() {
  return (
    <div className="bg-white w-full h-[37vh] rounded-xl md:h-[51vh] font-tanker px-2 pt-2 pb-1 items-center">
      <img src="/Img/hot1.webp" alt="photo" className="rounded-lg mb-1" />
      <h1 className="text-sm md:text-xl">BASIC OLIVE Heavyweight T-shirt</h1>
      <div className="flex items-center">
        <p className="text-base mr-2 md:text-lg">$ 749.00</p>
        <p className="text-sm md:text-base line-through text-primaryGrayLight">
          $ 899.00
        </p>
      </div>
    </div>
  );
}

export default Card1;
