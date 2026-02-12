import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PetSupply = () => {
  const [products, setProducts] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
  const filteredItems = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-4xl font-black text-[#0a303a] mb-8 uppercase">
          Pets & <span className="text-[#e83128]">Supplies</span>
        </h2>
        <input
          type="text"
          placeholder="search by name..."
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83128] w-full md:w-64 text-gray-400"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-2xl p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover rounded-xl mb-4"
              />
              <span className="text-xs font-bold text-[#e83128] uppercase">
                {item.category}
              </span>
              <h3 className="font-bold text-lg text-[#0a303a]">{item.name}</h3>
              <p className="text-[#e83128] font-black mt-2">
                {item.Price === 0 ? "FREE" : `$${item.Price}`}
              </p>
              <Link
                to={`/details/${item._id}`}
                className="block text-center mt-4 bg-[#0a303a] text-white py-2 rounded-lg text-sm hover:bg-[#e83128] transition-colors"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-gray-400">
            No items found matching "{searchQuery}"
          </h3>
          <p className="text-gray-400">Try a different name or category.</p>
        </div>
      )}
    </div>
  );
};

export default PetSupply;
