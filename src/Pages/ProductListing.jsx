import React, { useState } from "react";
import { TbCloudUpload } from "react-icons/tb";
import { useSupabaseContext } from "../SupaBase/Supabase";
const ProductListing = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [basePrice, setBasePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [bestSeller, setBestSeller] = useState(false);

  const { uploadImage, addProduct } = useSupabaseContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload cover image
    const coverImgUrl = await uploadImage(coverImg);
    console.log(coverImg);

    // Prepare product data
    const productData = {
      productName: productName,
      description,
      availableSizes: availableSizes,
      basePrice: parseFloat(basePrice),
      discount: parseFloat(discount),
      category,
      coverImg: coverImgUrl,
      bestSeller,
    };

    // Add product to database
    const result = await addProduct(productData);
    console.log(result);
    if (result.success) {
      alert("Product added successfully!");
      // Reset form
      setProductName("");
      setDescription("");
      setAvailableSizes([]);
      setBasePrice("");
      setDiscount("");
      setCategory("");
      setCoverImg(null);
      setBestSeller(false);
    } else {
      alert(`Failed to add product: ${result.error}`);
    }
  };

  const handleSizeSelection = (size) => {
    setAvailableSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="w-full font-tanker min-h-screen flex">
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
      <div className="p-6 w-full bg-gray-100 overflow-y-auto min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                General Information
              </h2>
              <div className="mb-4">
                <label className="block font-medium mb-2">Name Product</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">
                  Description Product
                </label>
                <textarea
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Size</label>
                <div className="flex gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleSizeSelection(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        availableSizes.includes(size)
                          ? "bg-primaryBlue text-black"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing and Category Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Pricing And Stock</h2>
              <div className="mb-4">
                <label className="block font-medium mb-2">Base Pricing</label>
                <input
                  type="number"
                  placeholder="Enter base price"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Discount</label>
                <input
                  type="number"
                  placeholder="Enter discount percentage"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <h2 className="text-xl font-semibold mb-4">Category</h2>
              <div className="flex gap-2">
                {["Bottomwear", "Topwear", "Jackets"].map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => handleCategorySelection(cat)}
                    className={`px-4 py-2 border rounded-lg ${
                      category === cat
                        ? "bg-primaryYellow text-black"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="text-base flex items-center gap-10 mt-4 mb-2">
                <h2>Best Seller</h2>
                <input
                  onClick={() => {
                    setBestSeller((perv) => !perv);
                  }}
                  type="checkbox"
                  className="text-3xl"
                />
              </div>
            </div>
          </div>

          {/* Upload Image Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <label
              htmlFor="file-upload"
              className="border-dashed border-2 border-gray-300 p-6 flex flex-col items-center cursor-pointer"
            >
              <TbCloudUpload className="text-4xl text-gray-500 mb-2" />
              <span className="text-gray-500">
                Click to upload or drag and drop
              </span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => setCoverImg(e.target.files[0])}
                accept="image/*"
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-primaryPink text-white font-semibold rounded-lg"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductListing;
