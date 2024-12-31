import { Navigate, Outlet } from "react-router-dom";
import { useSupabaseContext } from "../SupaBase/Supabase"; // Adjust path as needed
import Loading from "./Loading";

const AdminRoute = () => {
  const { userData, loading } = useSupabaseContext();
  console.log(userData);
  // Check if the user is logged in and has the Admin role
  if (loading) {
    return <Loading />; // Replace with a spinner or loading screen
  }
  if (userData?.role === "Admin") {
    return <Outlet />; // Allow access to nested routes
  } else {
    return <Navigate to="/" replace />; // Redirect to Home or another page
  }
};

export default AdminRoute;
