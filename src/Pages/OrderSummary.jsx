import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import Navbar from "../Components/Navbar";
import { useSupabaseContext } from "../SupaBase/Supabase"; // Import the fetch function
import { useParams } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const params = useParams();
  const orderId = params.orderId;
  const { fetchOrderById } = useSupabaseContext();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        if (orderId) {
          const fetchedOrder = await fetchOrderById(orderId); // Fetch order by ID
          setOrderData(fetchedOrder); // Update the state with the fetched data
        } else {
          console.error("Order ID not provided!");
        }
      } catch (error) {
        console.error("Error fetching order data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getOrderData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Order not found!
      </div>
    );
  }

  const { id, status, user, product, address, total } = orderData;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center font-tanker">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
          {/* Order Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold">Order Detail</h1>
              <p className="text-gray-500">
                Order ID: <span className="font-medium">#{id}</span>
              </p>
            </div>
            <span
              className={`px-4 py-2 font-medium rounded-full text-sm ${
                status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <IoLocationSharp className="text-xl text-black mr-2" />
                <p className="text-sm text-gray-600">
                  <strong>Recipient:</strong> {address[0].name}
                </p>
              </div>
              <div className="flex items-center">
                <IoLocationSharp className="text-xl text-black mr-2" />
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong>
                  {address[0].addressLine2}, {address[0].city},{" "}
                  {address[0].state}, - {address[0].zipCode}
                </p>
              </div>
              <div className="flex items-center">
                <IoLocationSharp className="text-xl text-black mr-2" />
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {address[0].phoneNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-3">Items</h3>
            <div className="space-y-4">
              {product.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between space-x-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  {/* Product Details */}
                  <div className="flex flex-col">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.qty}
                    </p>
                  </div>
                  {/* Price */}
                  <p className="font-medium">
                    ₹{item.price} x {item.qty}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
            <p className="text-sm text-gray-600">
              <strong>Total:</strong> ₹{total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
