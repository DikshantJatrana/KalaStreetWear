import React from "react";
import Navbar from "../Components/Navbar";

const Address = () => {
  return (
    <div className="w-full relative min-h-screen">
      <Navbar />
      <div className="bg-white text-primaryGrayDark px-4 py-6 font-tanker ">
        <a
          href="/cart"
          className="text-primaryGrayDark hover:underline text-sm/loose"
        >
          &lt; Back to cart
        </a>

        <div className="max-w-6xl mx-auto mt-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-black mb-4">
                Shipping Address
              </h2>
              <div className="space-y-4">
                {["Whitney Blessing"].map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-primaryGrayLight rounded-lg p-4"
                  >
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="address"
                        className="h-5 w-5 text-black focus:ring-black"
                      />
                      <span className="text-sm">
                        <span className="font-medium text-black">{name}</span>{" "}
                        144 Cavendish Avenue, Indianapolis, IN 46280
                      </span>
                    </label>
                    <button className="text-sm text-primaryGrayLight hover:underline">
                      Edit Instructions
                    </button>
                  </div>
                ))}
                <div className="border-2 border-black rounded-lg p-4">
                  <label className="flex items-center space-x-3 mb-4">
                    <input
                      type="radio"
                      name="address"
                      className="h-5 w-5 text-black focus:ring-black"
                      defaultChecked
                    />
                    <span className="text-black font-medium">
                      Add New Address
                    </span>
                  </label>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full border border-primaryGrayLight rounded-lg px-4 py-2"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full border border-primaryGrayLight rounded-lg px-4 py-2"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="w-full border border-primaryGrayLight rounded-lg px-4 py-2"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Number"
                        className="w-full border border-primaryGrayLight rounded-lg px-4 py-2"
                      />
                      <select className="w-full border border-primaryGrayLight rounded-lg px-4 py-2 text-primaryGrayDark">
                        <option>State</option>
                        <option>Indiana</option>
                        <option>California</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Zip"
                        className="w-full border border-primaryGrayLight rounded-lg px-4 py-2"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="text-sm text-primaryGrayLight hover:underline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 text-sm bg-black text-white rounded-lg hover:bg-primaryGrayDark"
                      >
                        Use This Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
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
    </div>
  );
};

export default Address;
