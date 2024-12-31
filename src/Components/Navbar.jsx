import React, { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";
import { useSupabaseContext } from "../SupaBase/Supabase";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../Context/MyContext";

function Navbar() {
  const NavMenu = useRef();
  const Navigate = useNavigate();
  const { cart, setCart } = useMyContext();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);

  const { user, userData, handleLogout, updateCartInSupabase } =
    useSupabaseContext();

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

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleCart = () => setCartVisible(!isCartVisible);

  const handleClearCart = () => {
    setCart([]); // Clear local cart
    updateCartInSupabase([]); // Update cart in Supabase and userData
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <div className="w-full px-4 py-8 font-tanker">
        <div className="w-full h-[63px] md:h-20 rounded-xl bg-custom-gradient p-1">
          <div className="w-full h-[100%] rounded-lg bg-white px-2 md:px-6 flex items-center justify-between">
            <div className="h-[95%] aspect-video flex items-center justify-center">
              <img src="/Img/NewLogo.png" alt="Logo" className="" />
            </div>
            <ul className="md:flex hidden md:items-center md:text-[1.7rem]">
              <li className="mr-8 cursor-pointer">
                <a href="/">HOME</a>
              </li>
              <li className="mr-8 cursor-pointer">
                <a href="/shop">SHOP</a>
              </li>
              <li className="cursor-pointer">
                <a href="/about">ABOUT US</a>
              </li>
            </ul>
            <span
              onClick={handleNavOpen}
              className="text-3xl md:hidden p-2 cursor-pointer rounded-full hover:bg-primaryWhite"
            >
              <GiHamburgerMenu />
            </span>
            <div className="hidden md:flex md:item-center md:gap-7 relative">
              <span
                onClick={toggleCart}
                className="text-3xl cursor-pointer p-2 rounded-full hover:bg-primaryWhite duration-75 transition-all ease-in-out relative"
              >
                <FaShoppingBag />
                {totalItems > 0 && (
                  <span className="absolute top-6 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </span>

              {userData ? (
                <span
                  onClick={toggleDropdown}
                  className="text-3xl cursor-pointer p-2 rounded-full hover:bg-primaryWhite duration-75 transition-all ease-in-out"
                >
                  <FaCircleUser />
                </span>
              ) : (
                <button
                  onClick={() => {
                    Navigate("/Log-in");
                  }}
                  className="px-4 rounded-xl bg-black text-white hover:bg-black/90"
                >
                  Log In
                </button>
              )}
              {userData ? (
                <div className="relative">
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-300">
                        <p className="text-sm font-semibold text-gray-800">
                          {userData.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {userData.email}
                        </p>
                      </div>
                      <ul className="py-2">
                        <li
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => Navigate("/profile")}
                        >
                          Profile
                        </li>
                        <li
                          className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Card */}
      {isCartVisible && (
        <div className="absolute top-28 font-tanker right-4 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800">Your Cart</h3>
          </div>
          {cart.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-gray-300"
                >
                  <img
                    src={item.productImg}
                    alt={item.name}
                    className="w-12 h-12 mr-2 rounded object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">₹{item.price}</p>
                  </div>
                  <p className="text-sm text-gray-600">x{item.qty}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Your cart is empty.
            </div>
          )}
          <div className="p-4 flex justify-between items-center">
            <button
              onClick={handleClearCart}
              className="text-sm text-red-600 hover:underline"
            >
              Clear Cart
            </button>
            <button
              onClick={() => Navigate("/cart")}
              className="px-4 py-2 bg-black text-white rounded hover:bg-black/90"
            >
              Go to Cart
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
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
            <a href="/">HOME</a>
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            <a href="/shop">SHOP</a>
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            <a href="/about">ABOUT US</a>
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            <a href="/profile">PROFILE</a>
          </li>
          <li className="py-6 border-b border-primaryGrayLight cursor-pointer">
            <a href="/cart">CART</a>
          </li>
          <li
            onClick={handleLogout}
            className="py-6 border-b border-primaryGrayLight cursor-pointer"
          >
            LOGOUT
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
