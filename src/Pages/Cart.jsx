import React from "react";
import CartCard from "../Components/CartCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useMyContext } from "../Context/MyContext";
import { useSupabaseContext } from "../SupaBase/Supabase";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const Navigate = useNavigate();
  const { cart } = useMyContext();
  const { userData } = useSupabaseContext();

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shipping = subtotal > 0 ? 50 : 0; // Flat shipping rate of 50 if there are items
  const tax = subtotal * 0.18; // 18% tax on subtotal
  const total = subtotal + shipping + tax;

  return (
    <div className="w-full min-h-screen font-tanker">
      <Navbar />
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-4xl font-bold text-black mb-4 underline font-tanker">
          Cart
        </h1>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 grid gap-3">
            {cart.length > 0 ? (
              cart.map((item) => <CartCard key={item.id} product={item} />)
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
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
              onClick={() => {
                Navigate("/address");
              }}
              className="w-full mt-6 bg-black text-white rounded-lg px-6 py-3 hover:bg-black/90"
              disabled={cart.length === 0}
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

export default Cart;
