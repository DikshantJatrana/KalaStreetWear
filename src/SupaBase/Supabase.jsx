import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";

const SupabaseContext = createContext();
export const useSupabaseContext = () => useContext(SupabaseContext);

const supabaseUrl = "https://vhkrwxujvnuqowzurnwd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoa3J3eHVqdm51cW93enVybndkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNDUyMzAsImV4cCI6MjA1MDYyMTIzMH0.HRkrW-KW1NwMRE-ovp2hnZVwnZzLcjfgH5MvX5du5is";
const supabase = createClient(supabaseUrl, supabaseKey);

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Authenticated user
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [loading, setLoading] = useState(false); // make sure that there is no problem in fetching data
  const Navigate = useNavigate();
  const location = useLocation();

  async function signUpUser(email, password) {
    try {
      // Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error("Error signing up user:", authError.message);
        return null;
      }

      console.log("User signed up successfully:", authData);

      // Automatically insert user into KalaUsers table
      const { user } = authData; // Get the authenticated user

      if (user) {
        const { id, email } = user;

        // Insert the user into the KalaUsers table
        const { data, error } = await supabase.from("KalaUsers").insert([
          {
            id, // Auth ID
            email, // User email
            address: [], // Initialize empty address
            carts: [], // Initialize empty carts
            orders: [], // Initialize empty orders
            phoneNumber: null, // To be updated later
            profileImg: null, // To be updated later
          },
        ]);

        if (error) {
          console.error(
            "Error inserting user into KalaUsers table:",
            error.message
          );
          return null;
        }

        console.log("User created in KalaUsers table successfully:", data);
        return data;
      }
    } catch (err) {
      console.error("Unexpected error during sign up:", err);
    }
  }

  const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error during login:", error.message);
      return null;
    }

    return data;
  };

  const checkAuthStatus = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: userDetails, error } = await supabase
        .from("KalaUsers")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) {
        setUserData(userDetails);
        localStorage.setItem("userData", JSON.stringify(userDetails));
      } else {
        console.error("Error fetching user data:", error);
      }
    } else {
      setUserData(null);
      localStorage.removeItem("userData");
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();

    const subscription = supabase.auth.onAuthStateChange(() => {
      checkAuthStatus();
    });

    return () => subscription.data?.unsubscribe();
  }, []);
  // Sign out function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("userData"); // Clear stored data
    window.location.reload(); // Ensure app resets
  };

  const fetchUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("KalaUsers")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user data:", error.message);
        return null;
      }

      return data; // Ensure this contains the role field
    } catch (err) {
      console.error("Unexpected error in fetchUserData:", err);
      return null;
    }
  };

  const uploadProfileImg = async (file) => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("KalaUserImg")
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from("KalaUserImg")
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading profile image:", error.message);
      throw error;
    }
  };

  // Function to update user profile
  const updateProfile = async (userId, email, phoneNumber, profileImg) => {
    try {
      const updates = {
        email,
        phoneNumber,
        profileImg,
      };

      const { error } = await supabase
        .from("KalaUsers")
        .update(updates)
        .eq("id", userId);

      if (error) {
        throw error;
      }
      checkAuthStatus();
      return true;
    } catch (error) {
      console.error("Error updating profile:", error.message);
      throw error;
    }
  };

  //function to add address in user profile
  const addAddress = async (userID, newAddress) => {
    try {
      const { data: userData, error: fetchError } = await supabase
        .from("KalaUsers")
        .select("address")
        .eq("id", userID)
        .single();

      if (fetchError) {
        console.error("Error fetching addresses:", fetchError.message);
        return;
      }

      const updatedAddresses = userData.address
        ? [...userData.address, newAddress]
        : [newAddress];

      const { error: updateError } = await supabase
        .from("KalaUsers")
        .update({ address: updatedAddresses })
        .eq("id", userID);

      if (updateError) {
        console.error("Error adding address:", updateError.message);
        return;
      }

      checkAuthStatus();
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  //function to  Delete Address from user
  const deleteAddress = async (userID, index) => {
    try {
      const { data: userData, error: fetchError } = await supabase
        .from("KalaUsers")
        .select("address")
        .eq("id", userID)
        .single();

      if (fetchError) {
        console.error("Error fetching addresses:", fetchError.message);
        return;
      }

      const updatedAddresses = userData.address.filter((_, i) => i !== index);

      const { error: updateError } = await supabase
        .from("KalaUsers")
        .update({ address: updatedAddresses })
        .eq("id", userID);

      if (updateError) {
        console.error("Error deleting address:", updateError.message);
        return;
      }

      checkAuthStatus();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  //uploading Product Images
  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("kalaUpload")
      .upload(fileName, file);

    if (error) {
      console.error("Image upload failed:", error.message);
      return null;
    }
    const { data: publicUrlData } = supabase.storage
      .from("kalaUpload")
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl || null;
  };

  //adding product to database
  const addProduct = async (product) => {
    const { data, error } = await supabase
      .from("KalaProducts")
      .insert([product]);

    if (error) {
      console.error("Failed to add product:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  };

  //fetching all Product
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("KalaProducts").select("*");

    if (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }

    return data;
  };

  //fetching Product bu Id
  const fetchProductById = async (id) => {
    const { data, error } = await supabase
      .from("KalaProducts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product by ID:", error.message);
      return null;
    }

    return data;
  };

  const updateCartInSupabase = async (updatedCart) => {
    if (userData?.id) {
      try {
        const { error } = await supabase
          .from("KalaUsers")
          .update({ carts: updatedCart })
          .eq("id", userData.id);

        if (error) throw error;

        // Update local userData
        const updatedUserData = { ...userData, carts: updatedCart };
        setUserData(updatedUserData);
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      } catch (err) {
        console.error("Error updating cart in Supabase:", err.message);
      }
    }
  };

  const createOrder = async ({
    total,
    status,
    user,
    product,
    address,
    payment,
  }) => {
    try {
      // Format the product as JSON objects with an image field
      const formattedProduct = product.map((item) => ({
        id: item.id,
        qty: item.qty,
        price: item.price,
        name: item.name,
        image: item.image, // Include the product image
      }));

      // Format the user details as JSON
      const formattedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
      };

      // Insert the order into Supabase
      const { data: orderData, error: orderError } = await supabase
        .from("KalaOrders")
        .insert([
          {
            total,
            status,
            user: formattedUser, // JSONB column for user
            product: formattedProduct, // JSONB column for products
            address, // JSONB column for address
            payment, // Text column for payment
          },
        ])
        .select();

      if (orderError) throw orderError;

      const newOrder = orderData[0]; // Get the created order

      // Retrieve the current user's data to update the orders field
      const { data: userData, error: userError } = await supabase
        .from("KalaUsers")
        .select("orders")
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      // Add the new order to the existing orders array
      const updatedOrders = userData.orders
        ? [...userData.orders, newOrder]
        : [newOrder];

      // Update the user's orders field in the database
      const { data: updatedUser, error: updateError } = await supabase
        .from("KalaUsers")
        .update({ orders: updatedOrders })
        .eq("id", user.id)
        .select();

      if (updateError) throw updateError;

      // Successfully updated the user's orders
      console.log("User orders updated successfully:", updatedUser);
      return newOrder; // Return the created order
    } catch (err) {
      console.error("Error creating order:", err.message);
      throw err;
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("KalaOrders").select("*");

      if (error) throw error;
      console.log("Fetched orders:", data);
      return data;
    } catch (err) {
      console.error("Error fetching orders:", err.message);
      throw err;
    }
  };

  // Function to fetch an order by ID
  const fetchOrderById = async (orderId) => {
    try {
      const { data, error } = await supabase
        .from("KalaOrders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) throw error;
      console.log("Fetched order by ID:", data);
      return data;
    } catch (err) {
      console.error("Error fetching order by ID:", err.message);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    const { error } = await supabase
      .from("KalaOrders")
      .update({ status })
      .eq("id", orderId);
    if (error) throw error;
  };

  return (
    <SupabaseContext.Provider
      value={{
        loading,
        signUpUser,
        loginUser,
        user,
        userData,
        setUserData,
        updateCartInSupabase,
        handleLogout,
        fetchUserData,
        uploadProfileImg,
        updateProfile,
        addAddress,
        deleteAddress,
        uploadImage,
        fetchProductById,
        fetchProducts,
        addProduct,
        createOrder,
        fetchOrders,
        fetchOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
