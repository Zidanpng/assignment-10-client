import React from "react";
import logo from "../assets/Paw-mart-2.png";
import { Link, NavLink } from "react-router-dom";
import { IoPaw } from "react-icons/io5";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-[#f5f0ea] rounded-box z-1 mt-3 w-52 p-2 shadow text-gray-800"
            >
              <li>
                <a className="bg-[#e83128]">Home</a>
              </li>
              <li>
                <a>Pets & Supplies</a>
              </li>
              <li>
                <a>Add Listing</a>
              </li>
              <li>
                <a>My Listings</a>
              </li>
              <li>
                <a>My Orders</a>
              </li>
            </ul>
          </div>
          <a className="text-xl">
            <img src={logo} alt="" className="h-6 md:h-8 w-35" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className="bg-[#e83128]">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/petSupply">Pets & Supplies</NavLink>
            </li>
            <li>
              <NavLink to="/addList">Add Listing</NavLink>
            </li>
            <li>
              <NavLink to="/myList">My Listings</NavLink>
            </li>
            <li>
              <NavLink to="/myOrder">My Orders</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2">
            <Link
              //   to="/login"
              className="btn btn-sm md:btn-md text-white bg-gradient-to-br from-[#e83128] to-red-400 hover:scale-105 transition-transform border-none"
            >
              LOG IN
            </Link>
            <Link
              //   to="/register"
              className="btn btn-sm md:btn-md  text-white bg-gradient-to-br from-[#e83128] to-red-400 hover:scale-105 transition-transform border-none"
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
