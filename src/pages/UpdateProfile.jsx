import React, { useContext } from "react";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    updateUserProfile({ displayName: name, photoURL: photo })
      .then(() => {
        toast.success("Profile Updated");
        navigate("/profile");
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="card bg-white p-8 shadow-xl w-96"
      >
        <h1 className="text-2xl text-center text-[#0a303a] font-bold pb-3">
          Update <span className="text-[#e83128]">Profile</span>
        </h1>
        <div>
          <label className="label font-medium text-gray-800 mb-1">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName}
            required
            className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="label font-medium text-gray-800 mb-1">Photo</label>
          <input
            type="text"
            name="photo"
            defaultValue={user?.photoURL}
            required
            className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
            placeholder="Enter Photo"
          />
        </div>
        <button className="btn bg-red-600 text-white hover:scale-105 transition-transform border-none mt-4">
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
