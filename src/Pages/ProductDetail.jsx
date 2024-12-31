import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaStar } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import Card2 from "../Components/Card2";
import { useParams } from "react-router-dom";
import { useSupabaseContext } from "../SupaBase/Supabase";
import { useMyContext } from "../Context/MyContext"; // Import context

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const { fetchProductById, fetchProducts } = useSupabaseContext();
  const { addToCart, cart } = useMyContext(); // Access addToCart function from context

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const productData = await fetchProductById(params.productId);
      setProduct(productData);
      setLoading(false);
    };

    const loadSuggestions = async () => {
      const allProducts = await fetchProducts();
      const randomSuggestions = allProducts
        .filter((p) => p.id !== params.productId) // Exclude current product
        .sort(() => 0.5 - Math.random()) // Shuffle products
        .slice(0, 4); // Select 4 random products
      setSuggestions(randomSuggestions);
    };

    loadProduct();
    loadSuggestions();
  }, [params.productId, fetchProductById, fetchProducts]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    addToCart(product, selectedSize);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen font-tanker">
      <Navbar />
      <div className="grid md:grid-cols-2 px-8 gap-8">
        <div className="flex justify-center">
          <img
            src={product.coverImg}
            className="rounded-xl w-full md:w-[80%] h-[60vh] md:h-[70vh]"
          />
        </div>
        <div className="flex justify-center">
          <div className="w-[90%] h-[70vh]">
            <h1 className="text-2xl md:text-4xl">{product.productName}</h1>
            <div className="text-lg md:text-2xl flex gap-1 mt-[1.5vh] items-center">
              <span className="text-primaryYellow">
                <FaStar />
              </span>
              <span className="text-primaryYellow">
                <FaStar />
              </span>
              <span className="text-primaryYellow">
                <FaStar />
              </span>
              <span className="text-primaryYellow">
                <FaStar />
              </span>
              <span className="text-primaryGrayLight">
                <FaStar />
              </span>
              <span className="text-primaryGrayLight">42 Review</span>
            </div>
            <div className="mt-[5vh] text-5xl md:text-6xl">
              ₹{product.basePrice}
            </div>
            <div className="mt-[5vh] underline text-lg md:text-2xl">Size</div>
            <div className="flex gap-3 text-2xl md:text-4xl mt-[3vh] flex-wrap">
              {product.availableSizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border-[3px] px-8 py-1 rounded-lg ${
                    selectedSize === size
                      ? "border-black text-black"
                      : "border-primaryGrayLight text-primaryGrayLight"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddToCart}
              className="text-3xl mt-[6.5vh] text-white flex items-center justify-center gap-4 md:text-4xl w-full py-2 bg-black rounded-lg"
            >
              <span>
                <MdOutlineShoppingBag />
              </span>{" "}
              Add To cart
            </button>
            <h1 className="text-base md:text-xl mt-[2vh] flex gap-2 items-center">
              <span className="text-xl md:text-3xl">
                <TbTruckDelivery />
              </span>{" "}
              free delivery on order over ₹ 1500.00
            </h1>
          </div>
        </div>
      </div>
      <div className="px-4 w-full font-tanker mt-[7vh]">
        <h1 className="text-3xl md:text-4xl underline">
          Some Great Suggestions
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-[4vh] gap-4">
          {suggestions.map((suggestion) => (
            <Card2
              key={suggestion.id}
              productId={suggestion.id}
              productName={suggestion.productName}
              productPrice={suggestion.basePrice}
              productDiscount={suggestion.discount}
              productImage={suggestion.coverImg}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
