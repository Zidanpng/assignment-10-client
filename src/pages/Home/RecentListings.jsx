import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/recent-listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-dots loading-lg text-[#e83128]"></span>
      </div>
    );
  }
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0a303a] uppercase tracking-tight">
            Recent <span className="text-[#e83128]">Listing</span>
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Checkout the latest additions to our pet family
          </p>
        </div>
        <Link
          to="/petSupply"
          className="flex items-center gap-2 text-[#e83128] font-bold hover:gap-4 transition-all uppercase text-sm"
        >
          View All Products
          <FaArrowRight />
        </Link>
      </div>
      {/* list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <div className="bg-[#e83128] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  {item.type}
                </div>
              </div>
            </div>
            {/* content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#0a303a]  group-hover:text-[#e83128] transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center text-gray-400 text-xs font-medium">
                  <IoLocationOutline className="text-[#e83128] mr-1" />
                  {item.location ? item.location.split(",")[0] : "Global"}{" "}
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 font-bold uppercase">
                    Price
                  </span>
                  <span className="text-xl font-black text-[#e83128]">
                    {item.Price === 0 ? "FREE" : `$${item.Price}`}
                  </span>
                </div>
                <Link
                  to={`/details/${item._id}`}
                  className="bg-white hover:bg-[#e83128] text-[#0a303a] hover:text-white font-bold py-3 px-6 rounded-2xl duration-300 text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
