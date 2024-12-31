import { createContext, useContext, useState, useEffect } from "react";
import { useSupabaseContext } from "../SupaBase/Supabase"; // Access Supabase context for user data

const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export const MyContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userData, setUserData, updateCartInSupabase } = useSupabaseContext(); // Added `setUserData` and `updateCartInSupabase`

  // Add to cart function
  const addToCart = (product, size) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = [...prev];
        updatedCart[existingItemIndex].qty += 1;
      } else {
        updatedCart = [
          ...prev,
          {
            id: product.id,
            name: product.productName,
            productImg: product.coverImg,
            price: product.basePrice,
            qty: 1,
            size: size,
          },
        ];
      }

      // Sync both Supabase and userData
      updateCartInSupabase(updatedCart);
      setUserData((prevData) => ({ ...prevData, carts: updatedCart }));

      return updatedCart;
    });
  };

  // Fetch cart from Supabase on load
  useEffect(() => {
    if (userData?.carts) {
      setCart(userData.carts);
    }
  }, [userData]);

  return (
    <MyContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </MyContext.Provider>
  );
};
