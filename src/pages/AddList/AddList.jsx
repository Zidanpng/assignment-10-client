import { use, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";

const AddList = () => {
  const { user } = use(AuthContext);
  const [category, setCategory] = useState("Pet");
  const [price, setPrice] = useState(0);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "Pet") {
      setPrice(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      name: form.name.value,
      category: category,
      type: form.type.value,
      image: form.image.value,
      price: parseFloat(price),
      location: form.location.value,
      description: form.description.value,
      date: form.date.value,
      email: user?.email,
    };

    fetch("http://localhost:5000/add-listing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Successfully Listed!");
          form.reset();
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center px-2 bg-gray-50 min-h-screen py-8">
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-xl p-8 border border-gray-100">
        <h1 className="text-2xl text-center text-[#0a303a] font-bold pb-3">
          Add New <span className="text-[#e83128]">Listing</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              placeholder="Enter name"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={handleCategoryChange}
              required
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Pet">Pet</option>
              <option value="Accessory">Accessory</option>
              <option value="Pet Food">Pet Food</option>
              <option value="Care Product">Care Product</option>
            </select>
          </div>
          {/* {type dropdown} */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">Type</label>
            <input
              type="text"
              name="type"
              required
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              placeholder="Enter Type"
            />
          </div>

          {/* image URL */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* price */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={category === "Pet"}
              required
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              placeholder="Enter Price"
            />
            {category === "Pet" && (
              <p className="text-xs text-green-600 mt-1">
                Pets are listed for free adoption.
              </p>
            )}
          </div>

          {/* location */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              placeholder="Enter location"
            />
          </div>

          {/* date */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">Date</label>
            <input
              type="date"
              name="date"
              required
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
            />
          </div>
          {/* email */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              name="email"
              required
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="label font-medium text-gray-800 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="3"
              className="textarea h-20 w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              placeholder="Enter description"
            ></textarea>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-neutral mt-2 w-full bg-[#e83128] border-none text-white hover:scale-105 transition-transform"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddList;
