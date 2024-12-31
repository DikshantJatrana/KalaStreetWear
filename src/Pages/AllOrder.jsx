import React, { useEffect, useState } from "react";
import { useSupabaseContext } from "../SupaBase/Supabase";
import { AiFillEdit } from "react-icons/ai";

const AllOrder = () => {
  const { fetchOrders, updateOrderStatus } = useSupabaseContext();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [fetchOrders]);

  const handleFilterChange = (value) => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );

    let filtered = [...orders];
    if (value === "lastMonth") {
      filtered = orders.filter(
        (order) => new Date(order.created_at) >= lastMonth
      );
    } else if (value === "lastWeek") {
      filtered = orders.filter(
        (order) => new Date(order.created_at) >= lastWeek
      );
    } else if (value === "lowToHigh") {
      filtered.sort((a, b) => a.total - b.total);
    } else if (value === "highToLow") {
      filtered.sort((a, b) => b.total - a.total);
    }

    setFilter(value);
    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } catch {
      alert("Failed to update order status.");
    } finally {
      setEditingOrderId(null);
    }
  };

  return (
    <div className="flex font-tanker min-h-screen bg-primaryGrayLight text-gray-300">
      {/* Sidebar */}
      <aside className="min-w-64 bg-primaryGrayDark flex flex-col text-gray-200">
        <div className="p-4 text-3xl font-bold gap-2 cursor-pointer">
          <span className="text-primaryPink">Kala</span>
          <span className="text-white">Street</span>
          <span className="text-primaryBlue">Wear</span>
        </div>
        <nav className="flex-1 space-y-4 p-4">
          <a
            href="/admin/dashboard"
            className="flex items-center p-2 hover:bg-primaryPink rounded-lg transition"
          >
            <span className="ml-2">Dashboard</span>
          </a>
          <a
            href="/admin/all-products"
            className="flex items-center p-2 hover:bg-primaryPink rounded-lg transition"
          >
            <span className="ml-2">Products</span>
          </a>
          <a
            href="/admin/orders"
            className="flex items-center p-2 hover:bg-primaryPink rounded-lg transition"
          >
            <span className="ml-2">Orders</span>
          </a>
          <a
            href="/admin/add-product"
            className="flex items-center p-2 hover:bg-primaryPink rounded-lg transition"
          >
            <span className="ml-2">Add Products</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 text-primaryGrayDark bg-white">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Orders Dashboard</h1>
          <select
            className="p-2 border rounded-lg"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastWeek">Last Week</option>
            <option value="lowToHigh">Order Amount: Low to High</option>
            <option value="highToLow">Order Amount: High to Low</option>
          </select>
        </header>

        <div className="gap-4">
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <table className="w-full bg-gray-100 rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer Email</th>
                  <th className="p-4 text-left">Products</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Placed On</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.user.email}</td>
                    <td className="p-4">
                      <ul className="list-none">
                        {order.product.map((product, idx) => (
                          <li key={idx}>
                            {product.name} (x{product.qty})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4">₹{order.total}</td>
                    <td className="p-4">{order.payment}</td>
                    <td className="p-4">
                      {editingOrderId === order.id ? (
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className="border rounded-lg p-2"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      ) : (
                        <span>{order.status}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          setEditingOrderId(
                            editingOrderId === order.id ? null : order.id
                          )
                        }
                        className="text-primaryBlue hover:text-primaryPink"
                      >
                        <AiFillEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllOrder;
