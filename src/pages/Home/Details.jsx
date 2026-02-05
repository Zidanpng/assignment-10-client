import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/details/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);
  if (!item) return <div className="text-center py-20">Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-xl rounded-3xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="md:w-1/2 h-96 object-cover"
        />
        <div className="p-8 space-y-3">
          <h1 className="text-4xl font-black text-[#0a303a]">{item.name}</h1>
          <p className="text-[#e83128] font-bold text-2xl">
            {typeof item.price === "number" ? `$${item.price}` : item.price}
          </p>
          <p className="font-semibold">{item.location}</p>
          <p className="text-black font-semibold">About {item.name}</p>
          <p className="text-gray-600">{item.description}</p>
          <button className="btn bg-[#e83128] text-white w-full border-none mt-2">
            Adopt Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
