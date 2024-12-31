import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useMyContext } from "../Context/MyContext";
import { useSupabaseContext } from "../SupaBase/Supabase";

const CartCard = ({ product }) => {
  const { cart, setCart } = useMyContext();
  const { userData, updateCartInSupabase } = useSupabaseContext();

  // Update quantity in cart
  const updateQuantity = (productId, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 }; // Ensure quantity stays positive
      }
      return item;
    });

    setCart(updatedCart);
    updateCartInSupabase(updatedCart);
  };

  // Remove item from cart
  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateCartInSupabase(updatedCart);
  };

  return (
    <div className="bg-custom-gradient max-h-[8rem] rounded-lg shadow-md font-tanker">
      <div className="w-full h-full bg-white/85 rounded-lg">
        <div className="grid grid-cols-2 h-full gap-8 md:gap-0 w-full grid-row-2 md:grid-rows-1 md:grid-cols-4 p-4 rounded-lg bg-black/5">
          <div className="flex row-span-2 w-full h-full md:col-span-2 items-center space-x-4">
            <img
              src={product.productImg}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-black">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.size}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(product.id, -1)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-200"
            >
              -
            </button>
            <span className="px-4 py-2 border bg-white rounded-lg">
              {product.qty}
            </span>
            <button
              onClick={() => updateQuantity(product.id, 1)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-200"
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-bold text-3xl text-black">₹ {product.price}</p>
            <button
              onClick={() => removeItem(product.id)}
              className="text-primaryGrayDark"
            >
              <RiDeleteBin6Fill size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
