import React, { useContext, useEffect, useState } from "react";
import { IoArrowBack, IoLocationOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const Details = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetch(`http://localhost:5000/details/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const orderData = {
      productId: item._id,
      productName: item.name,
      image: item.image,
      category: item.category,
      status: "Pending",
      buyerName: user?.displayName,
      email: user?.email,
      quantity: isPet ? 1 : parseInt(form.quantity.value),
      price: item.price,
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      additionalNotes: form.notes.value,
    };
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success(isPet ? "Adoption request sent" : "Added to orders!");
          closeModal();
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err);
      });
  };

  if (!item) {
    return <div className="text-center py-20">Loading...</div>;
  }
  const isPet = item.category === "Pet";
  return (
    <div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto p-6 mt-2"
    >
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
            <h1 className="text-4xl font-black text-[#0a303a]">{item.name}</h1>
            <div className="flex items-center text-gray-400 font-bold">
              <IoLocationOutline className="text-[#e83128] mr-1 text-xl" />
              {item.location || "Global Shipping"}
            </div>
            <p className="text-[#e83128] font-black text-3xl">
              {item.Price === 0 ? "FREE" : `$${item.Price}`}
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
            onClick={openModal}
            className="bg-[#0a303a] hover:bg-[#e83128] text-white font-bold py-3 px-6 rounded-lg duration-300 text-sm"
          >
            {isPet ? "Adopt Now" : "Order Now"}
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-black text-[#0a303a] mb-6 uppercase">
                  Order <span className="text-[#e83128]"> Form</span>
                </h2>
                <form onSubmit={handleOrder} className="space-y-4 text-left">
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
                  />
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
                  />
                  <input
                    type="text"
                    value={item.name}
                    readOnly
                    className="input input-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
                  />

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-xs font-bold text-gray-400 ml-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        defaultValue={1}
                        readOnly={isPet}
                        className="input input-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-xs font-bold text-gray-400 ml-1">
                        Price
                      </label>
                      <input
                        type="text"
                        value={`$${item.price}`}
                        readOnly
                        className="input input-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    required
                    className="input input-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
                  />
                  <input
                    type="date"
                    name="date"
                    required
                    className="input input-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="input input-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
                  />
                  <textarea
                    name="notes"
                    placeholder="Additional Notes"
                    className="textarea textarea-bordered w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
                  ></textarea>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="submit"
                      className="flex-1 btn btn-sm md:btn-md text-white font-bold bg-gradient-to-br from-[#e83128] to-red-400 hover:scale-105 transition-transform border-none"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 font-bold btn btn-sm md:btn-md hover:scale-105 transition-transform border-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
