import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Footer = () => {

    const menus = ["Home", "Recipe", "Share Recipe", "Contact Us"];

  return (
    <footer className="bg-white text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 bg-gray-100 text-black p-8 rounded-lg">
          {/* Web Logo & Description */}
          <div>
            <h3 className="text-lg font-bold">WEB LOGO</h3>
            <p className="text-sm mt-2">
              Lorem Ipsum Dolor Sit Amet Consectetur. Duis Lorem Purus Ipsum Sed Id Tortor
              Vulputate Iaculis. Aliquam Bibendum Dictu Fels Aenean Nisl Duis. Dictumst Sed
              Integ Vitae Velit Lectus Nunc. Tristique Tincidun In Tellus Sagittis Ab.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold">QUICK LINKS</h3>
            <ul className="mt-2 space-y-1">
              {menus.map((link, index) => (
                <li key={index} className="hover:underline cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold">FOLLOW US ON</h3>
            <div className="flex items-center space-x-4 mt-2">
              <FaFacebookF className="text-blue-600 text-xl cursor-pointer" />
              <RxCross2 className="text-xl cursor-pointer" />
              <FaInstagram className="text-pink-500 text-xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
