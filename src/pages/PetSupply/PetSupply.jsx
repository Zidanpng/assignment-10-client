import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PetSupply = () => {
  const [products, setProducts] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Pet", "Accessory", "Pet Food", "Care Product"];

  useEffect(() => {
    setLoading(true);
    const url =
      activeCat === "All"
        ? "http://localhost:5000/all-listings"
        : `http://localhost:5000/category-filtered-product/${activeCat}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [activeCat]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-black text-[#0a303a] mb-8 uppercase">
        Pet <span className="text-[#e83128]">Supplies</span>
      </h2>

      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2 rounded-full font-bold transition ${activeCat === cat ? "bg-[#e83128] text-white" : "bg-gray-100 text-[#0a303a] hover:bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center py-20">Loading Supplies...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((products) => (
            <div
              key={products.id}
              className="border rounded-2xl p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={products.image}
                alt={products.name}
                className="h-48 w-full object-cover rounded-xl mb-4"
              />
              <span className="text-xs font-bold text-[#e83128] uppercase">
                {products.category}
              </span>
              <h3 className="font-bold text-lg text-[#0a303a]">
                {products.name}
              </h3>
              <p className="text-[#0a303a] font-black mt-2">
                ${products.price}
              </p>
              <Link
                to={`/details/${products._id}`}
                className="block text-center mt-4 bg-[#0a303a] text-white py-2 rounded-lg text-sm hover:bg-[#e83128] transition-colors"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetSupply;
