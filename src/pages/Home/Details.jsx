import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoArrowBack, IoLocationOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/details/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  const handleOrder = () => {
    const orderData = {
      productId: item._id,
      productName: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      email: "example@example.com",
      status: "Pending",
      date: new Date(),
    };
    fetch("http://loaclhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertId) {
          alert(isPet ? "Adoption request sent" : "Added to orders!");
        }
      });
  };

  if (!item) {
    return <div className="text-center py-20">Loading...</div>;
  }
  const isPet = item.category === "Pet";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 mt-2"
    >
      <div className="max-w-4xl mx-auto p-6 mt-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#e83128] font font-bold py-4 mb-6"
        >
          <IoArrowBack />
          Go Back
        </button>
        <div className="flex flex-col md:flex-row gap-5 bg-white shadow-xl rounded-4xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-lg h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="bg-[#fceaea] text-[#e83128] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {item.category}
              </span>
              <h1 className="text-4xl font-black text-[#0a303a]">
                {item.name}
              </h1>
              <div className="flex items-center text-gray-400 font-bold">
                <IoLocationOutline className="text-[#e83128] mr-1 text-xl" />
                {item.location || "Global Shipping"}
              </div>
              <p className="text-[#e83128] font-black text-3xl">
                {typeof item.price === "number" ? `$${item.price}` : item.price}
              </p>
              <div className="py-3 border-t border-gray-100 mt-6">
                <p className="text-[#0a303a] font-black uppercase text-sm tracking-widest">
                  Description
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                {item.description}
              </p>
            </div>
            <button
              onClick={handleOrder}
              className="bg-[#0a303a] hover:bg-[#e83128] text-white font-bold py-3 px-6 rounded-lg duration-300 text-sm"
            >
              {isPet ? "Adopt Now" : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Details;
