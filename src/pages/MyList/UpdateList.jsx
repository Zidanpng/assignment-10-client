import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://assignment-10-server-woad-six.vercel.app/details/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      category: form.category.value,
      type: form.type.value,
      image: form.image.value,
      price: parseFloat(form.price.value),
      location: form.location.value,
      description: form.description.value,
    };

    fetch(
      `https://assignment-10-server-woad-six.vercel.app/update-listing/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          toast.success("Listing Updated!");
          navigate("/myList");
        }
      });
  };
  return (
    <div>
      <h2 className="text-2xl text-center font-semibold mb-6">
        Update <span className="text-black">Product</span>
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={product?.name}
            className="w-full px-5 py-3 rounded-md bg-gray-50 border border-gray-200 text-sm font-semibold outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Category + Price Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              defaultValue={product?.category}
              className="w-full px-5 py-3 rounded-md bg-gray-50 border border-gray-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              defaultValue={product?.price}
              className="w-full px-5 py-3 rounded-md bg-gray-50 border border-gray-200 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Type
          </label>
          <input
            type="text"
            name="type"
            defaultValue={product?.type}
            className="w-full px-5 py-3 rounded-md bg-gray-50 border border-gray-200 text-sm"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            defaultValue={product?.image}
            className="w-full px-5 py-3 rounded-md bg-gray-50 border border-gray-200 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={product?.description}
            className="w-full px-5 py-3 rounded-md bg-gray-50 border border-gray-200 text-sm h-24 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md font-semibold mt-2 hover:opacity-90 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateList;
