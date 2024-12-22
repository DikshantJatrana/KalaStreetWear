import React, { useState } from "react";
import CartCard from "../Components/CartCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Cart = () => {
  return (
    <div className="w-full min-h-screen font-tanker">
      <Navbar />
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-4xl font-bold text-black mb-4 underline font-tanker">
          Cart
        </h1>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 grid gap-3">
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
          </div>
          <aside className="bg-primaryWhite max-h-[45vh] rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <span>Items (2):</span>
                <span className="text-black">$354.32</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping & handling:</span>
                <span className="text-black">$3.99</span>
              </li>
              <li className="flex justify-between">
                <span>Before tax:</span>
                <span className="text-black">$358.31</span>
              </li>
              <li className="flex justify-between">
                <span>Tax collected:</span>
                <span className="text-black">$24.80</span>
              </li>
            </ul>
            <div className="mt-4 text-lg font-bold flex justify-between">
              <span>Order total:</span>
              <span className="text-black">$383.11</span>
            </div>
            <button className="w-full mt-6 bg-black text-white rounded-lg px-6 py-3 hover:bg-primaryGrayDark">
              Place Order
            </button>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
