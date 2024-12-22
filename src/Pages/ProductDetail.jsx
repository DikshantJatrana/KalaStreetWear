import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaStar } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import Card2 from "../Components/Card2";

function ProductDetail() {
  return (
    <div className="flex flex-col w-full min-h-screen font-tanker">
      <Navbar />
      <div className="grid md:grid-cols-2 px-8 gap-8">
        <div className="flex justify-center">
          <img
            src="/public/Img/hot1.webp"
            className="rounded-xl w-full md:w-[80%] h-[60vh] md:h-[70vh]"
          />
        </div>
        <div className="flex justify-center">
          <div className="w-[90%] h-[70vh]">
            <h1 className="text-2xl md:text-4xl">
              BASIC OLIVE Heavyweight T-shirt
            </h1>
            <div className="text-lg md:text-2xl flex gap-1 mt-[1.5vh] items-center">
              <span className="text-primaryYellow">
                <FaStar />
              </span>
              <span className="text-primaryYellow">
                <FaStar />
              </span>
              <span className="text-primaryYellow">
                <FaStar />
              </span>
              <span className="text-primaryYellow">
                <FaStar />
              </span>
              <span className="text-primaryGrayLight">
                <FaStar />
              </span>
              <span className="text-primaryGrayLight">42 Review</span>
            </div>
            <div className="mt-[5vh] text-5xl md:text-6xl">₹ 899.00</div>
            <div className="mt-[5vh] underline text-lg md:text-2xl">Size</div>
            <div className="flex gap-3 text-2xl md:text-4xl mt-[3vh] flex-wrap">
              <button className="border-[3px] px-8 py-1 rounded-lg border-primaryGrayLight text-primaryGrayLight">
                s
              </button>
              <button className="border-[3px] px-8 py-1 rounded-lg border-primaryGrayLight text-primaryGrayLight">
                m
              </button>
              <button className="border-[3px] px-8 py-1 rounded-lg border-primaryGrayLight text-primaryGrayLight">
                l
              </button>
              <button className="border-[3px] px-8 py-1 rounded-lg border-primaryGrayLight text-primaryGrayLight">
                xl
              </button>
            </div>
            <button className="text-3xl mt-[6.5vh] text-white flex items-center justify-center gap-4 md:text-4xl w-full py-2 bg-black rounded-lg">
              <span>
                <MdOutlineShoppingBag />
              </span>{" "}
              Add To cart
            </button>
            <h1 className="text-base md:text-xl mt-[2vh] flex gap-2 items-center">
              <span className="text-xl md:text-3xl">
                <TbTruckDelivery />
              </span>{" "}
              free delivery on order over ₹ 1500.00
            </h1>
          </div>
        </div>
      </div>
      <div className="px-4 w-full font-tanker mt-[7vh]">
        <h1 className="text-3xl md:text-4xl underline">
          Some Great Suggestions
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-[4vh] gap-4">
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
