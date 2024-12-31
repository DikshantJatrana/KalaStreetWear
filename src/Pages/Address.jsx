import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useSupabaseContext } from "../SupaBase/Supabase";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../Context/MyContext";

const Address = () => {
  const { userData, addAddress, createOrder } = useSupabaseContext();
  const Navigate = useNavigate();
  const { cart } = useMyContext();
  console.log(userData);
  const [selectedAddress, setSelectedAddress] = useState(null);

  if (!userData) {
    return (
      <div className="font-tanker text-primaryGrayDark text-center">
        Loading...
      </div>
    );
  }
  const handleAddAddress = (e) => {
    e.preventDefault();
    const name = document.getElementById("Name").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const addressLine1 = document.getElementById("addressLine1").value;
    const addressLine2 = document.getElementById("addressLine2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zipCode = document.getElementById("zipCode").value;

    const newAddress = {
      name,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    };

    console.log(newAddress);
    addAddress(userData.id, newAddress);
    alert("address added");
  };

  const handleSelectAddress = (index) => {
    setSelectedAddress(userData?.address[index]);
  };

  console.log(selectedAddress);

  const handlePlaceOrder = async () => {
    // Check if an address is selected
    if (!selectedAddress) {
      alert("Please select an address to proceed!");
      return;
    }

    // Calculate total items, subtotal, shipping, tax, and final total
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    const shipping = subtotal > 0 ? 50 : 0; // Flat shipping fee
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + shipping + tax; // Final total

    // Prepare the order data
    const newOrder = {
      total, // Total amount
      status: "Pending", // Initial status of the order
      user: userData, // Logged-in user data (not just ID)
      product: cart.map((item) => ({
        id: item.id,
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.productImg, // Include product image
      })), // Cart items with relevant fields
      address: [selectedAddress],
      payment: "COD", // Payment method (static for now, can be dynamic)
    };

    try {
      // Call createOrder to create an order in the database
      const orderData = await createOrder(newOrder);

      console.log("Order created successfully:", orderData);

      // Navigate to the order summary or success page
      Navigate(`/order/${orderData.id}`, { state: { orderData } });
    } catch (err) {
      // Handle any errors during order creation
      console.error("Error placing order:", err);
      alert("Order placement failed. Please try again.");
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="w-full font-tanker min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-4xl font-bold text-black mb-6 underline font-tanker">
          Add Address & Order Summary
        </h1>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Address Section */}
          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-black mb-4">
                Shipping Address
              </h2>
              <div className="space-y-4 p-2">
                {userData.address.length > 0 ? (
                  userData.address.map((address, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border rounded-lg p-4"
                    >
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="address"
                          className="h-5 w-5 text-black"
                          onChange={() => handleSelectAddress(index)}
                        />
                        <span className="text-sm">
                          <span className="font-medium text-black">
                            {address.name}
                          </span>{" "}
                          ({address.phoneNumber}), {address.addressLine1},{" "}
                          {address.city}, {address.state}, {address.zipCode}
                        </span>
                      </label>
                    </div>
                  ))
                ) : (
                  <div>No address found. Add a new address below.</div>
                )}
              </div>
              <form
                onSubmit={handleAddAddress}
                className="border-2 border-primaryGrayLight rounded-xl px-4 py-6"
              >
                <div className="mb-4">
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                {/* Address Line 1 */}
                <div className="mb-4">
                  <label
                    htmlFor="addressLine1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter address line 1"
                    required
                  />
                </div>

                {/* Address Line 2 */}
                <div className="mb-4">
                  <label
                    htmlFor="addressLine2"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter address line 2"
                  />
                </div>

                {/* City */}
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter city"
                    required
                  />
                </div>

                {/* State */}
                <div className="mb-4">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter state"
                    required
                  />
                </div>

                {/* ZIP Code */}
                <div className="mb-4">
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter ZIP code"
                    required
                  />
                </div>

                {/* Close Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-primaryBlue rounded-lg hover:bg-gray-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="bg-primaryWhite max-h-[45vh] rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <span>Items ({totalItems}):</span>
                <span className="text-black">₹{subtotal.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping & handling:</span>
                <span className="text-black">₹{shipping.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Tax (18%):</span>
                <span className="text-black">₹{tax.toFixed(2)}</span>
              </li>
            </ul>
            <div className="mt-4 text-lg font-bold flex justify-between">
              <span>Order total:</span>
              <span className="text-black">₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-black text-white rounded-lg px-6 py-3 hover:bg-black/90"
              disabled={!selectedAddress}
            >
              Place Order
            </button>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Address;
