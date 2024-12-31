import React from "react";
import { useNavigate } from "react-router-dom";

function Card1({
  productName,
  productImage,
  productPrice,
  productDiscount,
  productId,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => navigate(`/shop/details/${productId}`)}
      className="bg-white w-full rounded-xl h-full flex cursor-pointer flex-col items-center py-2"
    >
      <div className="w-[95%] h-[85%]">
        <img
          src={productImage}
          alt={productName}
          className="rounded-lg w-full h-full"
        />
      </div>
      <div className="w-[92%]">
        <h1 className="text-sm w-full truncate overflow-hidden whitespace-nowrap md:text-xl">
          {productName}
        </h1>
        <div className="flex items-center">
          <p className="text-base mr-2 md:text-lg">₹{productPrice}</p>
          <p className="text-sm md:text-base line-through text-primaryGrayLight">
            ₹{productDiscount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card1;
