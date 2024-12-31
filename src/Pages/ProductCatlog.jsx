import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Card2 from "../Components/Card2";
import Footer from "../Components/Footer";
import { useSupabaseContext } from "../SupaBase/Supabase";

function ProductCatlog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { fetchProducts } = useSupabaseContext();

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
      setFilteredProducts(products);
    };

    loadProducts();
  }, [fetchProducts]);

  // Function to handle filtering and sorting
  const handleFilterAndSort = () => {
    let filtered = [...products];

    // Filter by price range
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      filtered = filtered.filter(
        (product) =>
          product.basePrice >= parseFloat(minPrice) &&
          product.basePrice <= parseFloat(maxPrice)
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Sort products
    if (sortBy === "Best selling") {
      filtered = filtered.filter((product) => product.bestSeller);
    } else if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    }

    setFilteredProducts(filtered);
  };

  // Reapply filters and sorting whenever inputs change
  useEffect(() => {
    handleFilterAndSort();
  }, [priceRange, category, sortBy, products]);

  return (
    <div className="flex flex-col min-h-screen font-tanker">
      <Navbar />
      <div className="underline px-4 text-4xl md:text-5xl">
        Best Fashion pick's
      </div>

      {/* Filter and Sort Section */}
      <div className="flex flex-wrap justify-between px-4 py-4 space-y-2 md:space-y-0">
        <label className="flex items-center space-x-2">
          <span>Price:</span>
          <select
            className="border p-2 rounded"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">All</option>
            <option value="0-1000">₹0 - ₹1000</option>
            <option value="1000-3000">₹1000 - ₹2000</option>
            <option value="2000-3000">₹2000 - ₹3000</option>
          </select>
        </label>
        <label className="flex items-center space-x-2">
          <span>Category:</span>
          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Topwear">Topwear</option>
            <option value="Jackets">Jacket</option>
          </select>
        </label>
        <label className="flex items-center space-x-2">
          <span>Sort by:</span>
          <select
            className="border p-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default</option>
            <option value="Best selling">Best selling</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </label>
      </div>

      {/* Product Grid */}
      <div className="flex-grow px-4 grid grid-cols-2 gap-4 mt-[5vh] md:grid-cols-4">
        {!filteredProducts.length ? (
          <div className="inline-block text-2xl text-center text-primaryGrayDark">
            No products found...
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card2
              key={product.id}
              productId={product.id}
              productName={product.productName}
              productImage={product.coverImg}
              productDiscount={product.discount}
              productPrice={product.basePrice}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProductCatlog;
