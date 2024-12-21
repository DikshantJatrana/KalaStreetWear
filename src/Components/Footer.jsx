import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="w-full h-[50vh] mt-[10vh] bg-white">
      <div className="w-full h-[1vh] mb-[1vh] bg-primaryYellow"></div>
      <div className="w-full h-[1vh] mb-[1vh] bg-primaryPink"></div>
      <div className="w-full h-[1vh] mb-[1vh] bg-primaryBlue"></div>
      <div className="w-full h-[44vh] bg-primaryGrayDark font-tanker flex flex-col items-center">
        <div className="text-2xl mt-[7vh] md:text-3xl">
          <input type="text" className="outline-none py-2 px-2 rounded-l-lg" />
          <button className="bg-primaryYellow text-black py-2 px-5 rounded-r-lg">
            Sign Up
          </button>
        </div>
        <div className="text-primaryWhite text-3xl md:text-4xl w-full mt-[7vh] flex items-center justify-between">
          <div className="md:w-[20vw] w-[5vh] h-[1vh] bg-white"></div>
          <FaFacebookSquare />
          <FaSquareInstagram />
          <FaLinkedin />
          <AiFillTikTok />
          <FaSquareXTwitter />
          <FaYoutube />
          <div className="md:w-[20vw] w-[5vh] h-[1vh] bg-white"></div>
        </div>
        <span className="text-white text-[11px] md:text-xl mt-[7vh] text-center md:mt-[3vh] md:leading-10">
          © 2024, KALA STREET <br /> Refund policy | Privacy policy | Terms of
          service | Shipping policy | Contact information
        </span>
      </div>
    </div>
  );
}

export default Footer;
