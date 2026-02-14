import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const MyList = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(
        `https://assignment-10-server-woad-six.vercel.app/my-listings/${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setListings(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure",
      text: "THis listing will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e83128",
      cancelButtonColor: "#0a303a",
      confirmButtonText: "Yes,delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-server-woad-six.vercel.app/listing/${id}`,
          {
            method: "DELETE",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Listing deleted");
              setListings((prev) => prev.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black text-[#0a303a] mb-8 uppercase">
        MY <span className="text-[#e83128]">Listings</span>
      </h1>
      {listings.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No listings found.{" "}
          <Link
            to="/addList"
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Add List?
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#e83128] font-semibold text-white px-3 py-1 rounded-full text-[10px] uppercase">
                  {item.type}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-[#0a303a] font-black text-lg">
                  {item.name}
                </h3>
                <p className="text-[#e83128] font-black text-xl">
                  {item.Price === 0 || item.price === 0
                    ? "FREE"
                    : `$${item.Price || item.price}`}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Link
                    to={`/update/${item._id}`}
                    className="flex items-center gap-2 text-[#0a303a] hover:scale-105 transition-transform"
                  >
                    <FaEdit />
                    <span className="text-sm font-bold">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-2 text-[#e83128] hover:scale-105 transition-transform"
                  >
                    <FaTrash />
                    <span className="text-sm font-bold">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
