import React, { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";

function Navbar() {
  const NavMenu = useRef();
  const handleNavOpen = () => {
    gsap.to(NavMenu.current, {
      right: "0%",
      duration: 0.8,
      ease: "power2.inOut",
    });
  };
  const handleNavClose = () => {
    gsap.to(NavMenu.current, {
      right: "-100%",
      duration: 0.8,
      ease: "power2.inOut",
    });
  };
  return (
    <>
      <div className="w-full px-4 py-8">
        <div className="w-full h-[63px] md:h-20 rounded-xl bg-custom-gradient p-1">
          <div className="w-full h-[100%] rounded-lg bg-white px-2 md:px-6 flex items-center justify-between">
            <div className="h-[95%] aspect-video flex items-center justify-center">
              <img src="/Img/NewLogo.png" alt="Logo" className="" />
            </div>
            <ul className="md:flex font-tanker hidden md:items-center md:text-[1.7rem]">
              <li className="mr-8 cursor-pointer">
                H<span className="text-primaryPink  ">O</span>ME
              </li>
              <li className="mr-8 cursor-pointer">
                S<span className="text-primaryPink ">H</span>OP
              </li>
              <li className="cursor-pointer">
                A<span className="text-primaryPink ">B</span>OUT US
              </li>
            </ul>
            <span
              onClick={handleNavOpen}
              className="text-3xl md:hidden p-2 cursor-pointer rounded-full hover:bg-primaryWhite"
            >
              <GiHamburgerMenu />
            </span>
            <div className="hidden md:flex md:item-center md:gap-7">
              <span className="text-3xl cursor-pointer p-2 rounded-full hover:bg-primaryWhite duration-75 transition-all ease-in-out">
                <FaShoppingBag />
              </span>
              <span className="text-3xl cursor-pointer p-2 rounded-full hover:bg-primaryWhite duration-75 transition-all ease-in-out">
                <FaCircleUser />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={NavMenu}
        className="w-full h-screen md:hidden fixed z-[999] top-0 -right-[100%] bg-primaryGrayDark"
      >
        <span
          onClick={handleNavClose}
          className="absolute text-white text-4xl p-2 rounded-full top-4 right-6 hover:bg-primaryGrayLight transition-all duration-200 ease-in"
        >
          <IoClose />
        </span>
        <ul className="py-10 px-8 font-tanker text-white text-5xl">
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            HOME
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            SHOP
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            ABOUT US
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            PROFILE
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            CART
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            ORDER
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
