import React, { useEffect, useState } from "react";

const PetSupply = () => {
  const [products, setProducts] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Pet", "Accessory", "Pet Food", "Care Products"];

  useEffect(() => {
    const url =
      activeCat === "All"
        ? "http://localhost:5000/all-listings"
        : `http://localhost:5000/category-filtered-product/${activeCat}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const onlyProducts = data.filter((item) => item.category !== "Pet");
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
    </div>
  );
};

export default PetSupply;
