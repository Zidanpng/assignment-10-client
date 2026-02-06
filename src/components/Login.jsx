import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { userLogin, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state || "/";
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        toast.success(`Welcome Back,${result.user.displayName || "User"}!`);
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Invalid email or password,PLease try again.");
      });
  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="flex items-center justify-center px-4 bg-gray-50 min-h-screen">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-10 border border-gray-100">
        <h1 className="text-2xl text-center text-[#0a303a] font-bold pb-3">
          Please <span className="text-[#e83128]">Login</span>
        </h1>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-all font-semibold text-gray-700 gap-3"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>
        <div className="divider text-gray-800 text-sm">OR</div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="PASSWORD"
              className="w-full px-5 py-4 rounded-md bg-white border border-gray-300 text-gray-400 focus:ring-2 focus:ring-black focus:text-gray-600 outline-none transition-all placeholder:text-gray-400 font-bold text-xs tracking-widest"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button className="btn btn-neutral mt-2 w-full bg-[#e83128] border-none text-white hover:scale-105 transition-transform">
            Login
          </button>
          <p className="text-center mt-2 text-[#0a303a] font-semibold">
            New to the website? Please{" "}
            <Link to="/register" className="text-red-500 hover:text-red-700">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
