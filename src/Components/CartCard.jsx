import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

const CartCard = ({ product }) => {
  return (
    <div className="bg-custom-gradient rounded-lg shadow-md font-tanker">
      <div className="bg-white/85 rounded-lg">
        <div className="grid grid-cols-2 gap-8 md:gap-0 grid-row-2 md:grid-rows-1 md:grid-cols-4 p-4 rounded-lg bg-black/5">
          <div className="flex row-span-2 md:col-span-2 items-center space-x-4">
            <img
              src="/public/Img/hot1.webp"
              alt="hot1"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-black">
                BASIC OLIVE Heavyweight T-shirt
              </h3>
              <p className="text-sm text-gray-600">L</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-200">
              -
            </button>
            <span className="px-4 py-2 border bg-white rounded-lg">1</span>
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-200">
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-bold text-3xl text-black">₹ 899.00</p>
            <button className="text-primaryGrayDark">
              <RiDeleteBin6Fill size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
