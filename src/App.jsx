import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { MyContextProvider } from "./Context/MyContext";
import SignUp from "./Pages/SignUp";
import ProductCatlog from "./Pages/ProductCatlog";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Address from "./Pages/Address";
import Dashboard from "./Pages/Dashboard";
import ProductListing from "./Pages/ProductListing";
import DashboardProduct from "./Pages/DashboardProduct";
import UserProfile from "./Pages/UserProfile";
import Loading from "./Components/Loading";
import AdminRoute from "./Components/AdminRoute";
import OrderSummary from "./Pages/OrderSummary";
import AllOrder from "./Pages/AllOrder";
import UserRouter from "./Components/UserRouter";

function App() {
  return (
    <MyContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/sign-up"
          element={
            <SignUp
              title={"Sign Up"}
              opps={"Log In"}
              sentence={"Already have an account?"}
            />
          }
        />
        <Route
          path="/Log-in"
          element={
            <SignUp
              title={"Log In"}
              opps={"Sign Up"}
              sentence={"New User create an account?"}
            />
          }
        />
        <Route path="/shop" element={<ProductCatlog />} />

        <Route
          path="/shop/details/:productId"
          element={
            <UserRouter>
              <ProductDetail />
            </UserRouter>
          }
        />
        <Route
          path="/profile"
          element={
            <UserRouter>
              <UserProfile />
            </UserRouter>
          }
        />
        <Route path="/loading" element={<Loading />} />
        <Route
          path="/cart"
          element={
            <UserRouter>
              <Cart />
            </UserRouter>
          }
        />
        <Route
          path="/address"
          element={
            <UserRouter>
              <Address />
            </UserRouter>
          }
        />
        <Route
          path="/order/:orderId"
          element={
            <UserRouter>
              <OrderSummary />
            </UserRouter>
          }
        />
        {/*protected routed on for amin*/}
        <Route path="admin" element={<AdminRoute />}>
          <Route path="add-product" element={<ProductListing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-products" element={<DashboardProduct />} />
          <Route path="orders" element={<AllOrder />} />
        </Route>
      </Routes>
    </MyContextProvider>
  );
}

export default App;
