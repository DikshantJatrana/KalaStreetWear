import React, { useState, useEffect } from "react";
import { useSupabaseContext } from "../SupaBase/Supabase";
import Card2 from "../Components/Card2";

function DashboardProduct() {
  const [products, setProducts] = useState([]);
  const { fetchProducts } = useSupabaseContext();

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    loadProducts();
  }, [fetchProducts]);

  console.log(products);

  return (
    <div className="w-full min-h-screen relative font-tanker flex">
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
      <div className="flex-grow px-4 grid gap-4 mt-[5vh] grid-cols-3 rounded-xl">
        {!products.length ? (
          <div className="inline-block text-2xl text-center text-primaryGrayDark">
            No product added till Know
          </div>
        ) : (
          products.map((product) => (
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
    </div>
  );
}

export default DashboardProduct;
