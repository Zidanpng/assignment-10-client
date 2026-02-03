import React from "react";
import { FaCogs, FaMedkit } from "react-icons/fa";
import { FaBone, FaDog, FaRegHandPointRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Pets", icon: <FaDog />, route: "Pets" },
    { name: "Pet Food", icon: <FaBone />, route: "Pet Food" },
    { name: "Accessories", icon: <FaCogs />, route: "Accessories" },
    { name: "Care Products", icon: <FaMedkit />, route: "Care Products" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="flex flex-col md:flex-row  shadow-2xl bg-[#e83128] rounded-xl overflow-hidden relative">
        <div className="bg-[#0a303a] text-white flex items-center justify-center p-8 md:w-1/4 lg:[clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%)]">
          <p className="flex items-center gap-3 text-sm sm:text-base font-bold tracking-wide uppercase">
            Browse Categories{" "}
            <span className="hidden md:block text-lg">
              <FaRegHandPointRight />
            </span>
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 bg-[#e83128]">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() =>
                navigate(`/category-filtered-product/${cat.route}`)
              }
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-white border-t sm:border-t-0   sm:border-l border-white/20 hover:bg-red-700 transition-all duration-300 py-6 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="font-bold uppercase text-xs sm:text-sm tracking-tighter sm:tracking-normal">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
