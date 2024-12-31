import React from "react";
import { Navigate } from "react-router-dom";
import { useSupabaseContext } from "../SupaBase/Supabase"; // Import authentication context

const UserRouter = ({ children }) => {
  const { user, userData } = useSupabaseContext(); // Check if user is logged in

  // If not logged in, redirect to login
  if (!userData) {
    return <Navigate to="/log-in" />;
  }

  // If logged in, render the requested route
  return children;
};

export default UserRouter;
