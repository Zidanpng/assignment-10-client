import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase/Firebase.config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { googleSignIn } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Logged in With Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must have at least one lowercase letter");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          toast.success("Registration Successful!");
          navigate("/");
        });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex items-center justify-center px-2 bg-gray-50 min-h-screen">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-6 border border-gray-100">
        <h1 className="text-2xl text-center text-[#0a303a] font-bold pb-3">
          Please <span className="text-[#e83128]">Register</span>
        </h1>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-all font-semibold text-gray-700 gap-3"
        >
          <FcGoogle />
          Continue with Google
        </button>
        <div className="divider text-gray-800 text-sm">OR</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              type="name"
              name="name"
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              placeholder="name"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="photo"
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              placeholder="Photo URL"
              required
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
            />
          </div>
          <div className="relative">
            {" "}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-3.5 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="btn btn-neutral mt-2 w-full bg-[#e83128] border-none text-white hover:scale-105 transition-transform">
            Register
          </button>
          <p className="text-center mt-2 text-[#0a303a] font-semibold">
            Already have an account? Please{" "}
            <Link to="/login" className="text-red-500 hover:text-red-700">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
