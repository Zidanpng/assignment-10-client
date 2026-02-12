import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Error from "./Error";

const CategoryProducts = () => {
  const { category } = useParams();
  console.log("Current Category from URL:", category); // Log 1
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/category-filtered-product/${category}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received from Backend:", data); // Log 2
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#e83128]"></span>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#0a303a] uppercase italic">
          Category: <span className="text-[#e83128]">{category}</span>
        </h2>
        <div className="h-1 w-20 bg-[#e83128] mt-2"></div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="card bg-white shadow-xl transition-all border border-gray-100 rounded-3xl overflow-hidden group"
            >
              <figure className="h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-[#0a303a] font-bold">
                  {item.name}
                </h2>
                <div className="flex items-center text-gray-500 text-sm gap-1 mb-4">
                  <IoLocationOutline className="text-[#e83128]" />
                  {item.location}
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-xl font-black text-[#e83128]">
                    {item.Price === 0 ? "FREE" : `$${item.Price}`}
                  </span>
                  <Link
                    to={`/details/${item._id}`}
                    className="btn btn-sm bg-[#0a303a] text-white border-none hover:bg-[#e83128]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Error></Error>
      )}
    </div>
  );
};

export default CategoryProducts;
