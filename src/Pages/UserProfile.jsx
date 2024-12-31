import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useSupabaseContext } from "../SupaBase/Supabase";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const Navigate = useNavigate();
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const {
    userData,
    handleLogout,
    uploadProfileImg,
    updateProfile,
    addAddress,
    deleteAddress,
  } = useSupabaseContext();
  const [profileImg, setProfileImg] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const user = {
    profilePicture: "https://via.placeholder.com/150",
    name: "Wanda Chapman",
    email: "wanda.chapman@gmail.com",
    phoneNumber: "+1 244 282811",
    addressList: ["123 Main St, Los Angeles, CA", "456 Park Ave, New York, NY"],
    orders: [
      {
        reservationId: "HMILJLD908",
        guest: "Adam Laney",
        checkInOut: "1 - 5 Jan. 2022",
        nights: 4,
        amount: "$416",
      },
      {
        reservationId: "HA-KLNJ389",
        guest: "Jesse Ehret",
        checkInOut: "7 - 19 Jan. 2022",
        nights: 12,
        amount: "$459",
      },
      {
        reservationId: "BC-98U23JK",
        guest: "Jen Liddell",
        checkInOut: "23 Jan. - 2 Feb. 2022",
        nights: 9,
        amount: "$444",
      },
    ],
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImg(file);
      setCurrentImg(URL.createObjectURL(file));
    }
  };

  if (!userData) {
    return <Loading />;
  }
  const orders = userData.orders;
  const handleEditProfile = async ({
    userData,
    email,
    phoneNumber,
    profileImg,
  }) => {
    try {
      const profilePic = profileImg
        ? await uploadProfileImg(profileImg)
        : userData.profilePicture;
      await updateProfile(userData.id, email, phoneNumber, profilePic);
      setEditPopupOpen(false); // Close popup after success
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
    }
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const name = document.getElementById("Name").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const addressLine1 = document.getElementById("addressLine1").value;
    const addressLine2 = document.getElementById("addressLine2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zipCode = document.getElementById("zipCode").value;

    const newAddress = {
      name,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    };

    console.log(newAddress);
    addAddress(userData.id, newAddress);
    setPopupOpen(false); // Close popup
  };

  return (
    <div className="w-full min-h-screen font-tanker relative">
      <Navbar />
      <div className="flex-grow bg-gray-100 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl underline font-bold text-center sm:text-left">
              Profile Details
            </h1>
          </div>

          {/* User Info Section */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
            {/* Profile Picture */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-gray-300">
              <img
                src={
                  userData.profileImg
                    ? userData.profileImg
                    : "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* User Details */}
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-semibold">
                {userData.email.split("@")[0]}
              </h2>
              <p className="flex items-center justify-center gap-2 text-gray-600 text-sm sm:text-base mb-2 px-2 py-1 border-2 border-gray-200 bg-gray-100 rounded-md">
                <MdEmail /> {userData.email}
              </p>
              <p className="flex items-center gap-2 justify-center text-gray-600 text-sm sm:text-base py-1 border-2 border-gray-200 bg-gray-100 rounded-md">
                <FaPhoneAlt />
                {userData ? userData.phoneNumber : "N/A"}
              </p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="my-5">
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
              <table
                border="1"
                cellPadding="10"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #ddd",
                  color: "#333",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f4f4f4", color: "#000" }}>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Order ID
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Status
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Total (₹)
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Payment Method
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Placed On
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Shipping Address
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Products
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className="cursor-pointer"
                      onClick={() => {
                        Navigate(`/order/${order.id}`);
                      }}
                      key={order.id}
                      style={{
                        backgroundColor: "#fff",
                        color: "#333",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {order.id}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {order.status}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {order.total}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {order.payment}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {order.address.map((addr, index) => (
                          <div key={index}>
                            <p>{addr.name}</p>
                            <p>{addr.addressLine1}</p>
                            <p>
                              {addr.city}, {addr.state}, {addr.zipCode}
                            </p>
                            <p>Phone: {addr.phoneNumber}</p>
                          </div>
                        ))}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                          {order.product.map((product) => (
                            <li
                              key={product.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "10px",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                }}
                              />
                              <span>
                                {product.name} (x{product.qty})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders found.</p>
            )}
          </div>

          {/* Address List */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-center sm:text-left flex justify-between">
              Saved Addresses{" "}
              <button
                onClick={() => setPopupOpen(true)}
                className="flex items-center justify-center w-6 h-6 bg-primaryBlue text-white rounded-sm"
                title="Edit Address"
              >
                <BiEditAlt size={20} />
              </button>
            </h2>
            <div className="space-y-4">
              {userData.address.length > 0 ? (
                userData.address.map((address, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200"
                  >
                    {/* Address Content */}
                    <div className="text-gray-700 text-sm sm:text-base mb-2 sm:mb-0">
                      <p className="font-medium">
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                      </p>
                      <p>
                        {address.city}, {address.state}, {address.zipCode}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={() => deleteAddress(userData.id, index)}
                        className="flex items-center justify-center w-8 h-8 bg-primaryPink text-white rounded-full"
                        title="Delete Address"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-2xl text-center border-2 border-primaryGrayLight rounded-lg py-3 text-primaryGrayLight">
                  No Address Saved
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => {
                setEditPopupOpen(true);
              }}
              className="px-4 sm:px-6 py-2 bg-white border-2 border-primaryBlue text-primaryBlue hover:bg-primaryBlue rounded-lg hover:text-white w-full sm:w-auto"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 sm:px-6 py-2 bg-white border-2 border-primaryYellow hover:bg-primaryYellow text-black rounded-lg w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setEditPopupOpen(false);
              }}
            >
              <FaTimes size={20} />
            </button>

            {/* Header */}
            <h2 className="text-xl font-semibold text-center mb-4">
              Edit Profile
            </h2>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditProfile({
                  userData,
                  email,
                  phoneNumber,
                  profileImg,
                });
              }}
            >
              {/* Profile Picture */}
              <div className="mb-4 text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={currentImg || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="block mt-2">
                  <span className="text-base rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                    Change Profile Photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </label>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditPopupOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setPopupOpen(false)}
            >
              <FaTimes size={20} />
            </button>

            {/* Header */}
            <h2 className="text-xl font-semibold text-center mb-4">
              Add Address
            </h2>

            {/* Form */}
            <form onSubmit={handleAddAddress}>
              <div className="mb-4">
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone Number"
                  required
                />
              </div>
              {/* Address Line 1 */}
              <div className="mb-4">
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address line 1"
                  required
                />
              </div>

              {/* Address Line 2 */}
              <div className="mb-4">
                <label
                  htmlFor="addressLine2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address line 2"
                />
              </div>

              {/* City */}
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter city"
                  required
                />
              </div>

              {/* State */}
              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter state"
                  required
                />
              </div>

              {/* ZIP Code */}
              <div className="mb-4">
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ZIP code"
                  required
                />
              </div>

              {/* Close Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-primaryBlue rounded-lg hover:bg-gray-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
