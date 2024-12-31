import React, { useEffect, useState, useContext } from "react";
import { useSupabaseContext } from "../SupaBase/Supabase";

const Dashboard = () => {
  const { fetchOrders } = useSupabaseContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    lastMonthOrders: 0,
    lastWeekOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);

        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastWeek = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );

        const lastMonthOrders = data.filter(
          (order) => new Date(order.created_at) >= lastMonth
        ).length;

        const lastWeekOrders = data.filter(
          (order) => new Date(order.created_at) >= lastWeek
        ).length;

        const totalRevenue = data.reduce(
          (sum, order) => sum + parseFloat(order.total || 0),
          0
        );

        setStats({
          lastMonthOrders,
          lastWeekOrders,
          totalRevenue,
        });
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [fetchOrders]);

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
      <main className="flex-1 p-6 text-primaryGrayDark bg-primaryWhite">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Orders Dashboard</h1>
        </header>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-primaryYellow text-black p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">Total Revenue</h2>
            <p className="text-3xl">₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-primaryPink text-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">Orders Last Month</h2>
            <p className="text-3xl">{stats.lastMonthOrders}</p>
          </div>
          <div className="bg-primaryBlue text-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">Orders Last Week</h2>
            <p className="text-3xl">{stats.lastWeekOrders}</p>
          </div>
        </section>

        {/* Orders Table */}
        <div className="gap-4">
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <table className="w-full bg-sky-200 rounded-lg overflow-hidden">
              <thead className="bg-sky-300">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer Email</th>
                  <th className="p-4 text-left">Products</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Placed On</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-sky-200" : "bg-sky-300"
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
                      <span
                        className={`px-2 py-1 rounded-lg ${
                          order.status === "Pending"
                            ? "bg-yellow-500 text-white"
                            : order.status === "Delivered"
                            ? "bg-green-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(order.created_at).toLocaleString()}
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

export default Dashboard;
