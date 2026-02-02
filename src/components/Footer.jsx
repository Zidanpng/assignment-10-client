import React from "react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import logo from "../assets/Paw-mart-2.png";
import { AiFillYoutube } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Footer = () => {
  return (
    <div>
      <footer className="footer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-[#f5f0ea] text-gray-600 px-4 sm:8 md:px14 lg:px-20 py-10 font-medium">
        <aside>
          <img src={logo} alt="" className="h-8 w-35" />
          <h3 className="font-semibold">
            <p className="py-4">
              Paw Mart connects local pet owners and buyers for adoption and pet
              care products.
            </p>
            <div className="footer-contact flex gap-3 items-center">
              <span className="text-2xl text-white bg-[#e83128] rounded-full p-2">
                <TfiHeadphoneAlt />
              </span>
              <div className="content">
                <h4 className="title">
                  <a href="tel:0987654321">747-800-9880</a>
                </h4>
                <span className="text-[#e83128]">Call Now</span>
              </div>
            </div>
          </h3>
        </aside>
        <nav>
          <h6 className="text-black text-xl font-semibold">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="text-black text-xl font-semibold">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="text-black text-xl font-semibold">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
          <div className="flex gap-4 items-center py-2">
            <a>
              <div className="text-xl hover:text-red-600">
                <FaXTwitter />
              </div>
            </a>
            <a>
              <div className="text-2xl hover:text-red-600">
                <AiFillYoutube />
              </div>
            </a>

            <a className="text-xl hover:text-red-600">
              <FaFacebookF />
            </a>
          </div>
        </nav>
      </footer>
      <aside className="bg-[#0a303a]">
        <p className="text-gray-300 px-20 py-4">
          Copyright © {new Date().getFullYear()} - All right reserved by PAW
          MART.CO Industries Ltd
        </p>
      </aside>
    </div>
  );
};

export default Footer;
