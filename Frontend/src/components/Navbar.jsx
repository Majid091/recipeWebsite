import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home")
  // const menus = ["Home", "Recipeies", "Share Recipe", "Contact Us"];
    const menus = [
      { name: "Home", path: "/" },
      { name: "Recipies", path: "/recipe-page" },
      { name: "Share Recipe", path: "/share-recipe" },
      { name: "Contact Us", path: "/contact" }
    ];

  return (
    <nav className="bg-white shadow-md py-4 px-6 lg:px-12">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">NUTRITION MAPPER</h1>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-gray-700">
          {menus.map((menu) => (
            <li
              key={menu.name}>
                <NavLink
              to={menu.path}  
              className={({ isActive }) =>
                `cursor-pointer hover:text-red-600 transition-all relative ${
                  isActive
                    ? " text-red-400"
                    : "text-black hover:text-red-600"
                }`
              }
              onClick={() => setActiveMenu(menu.name)}
            >
            {menu.name}
          </NavLink>

            </li>
          ))}
        </ul>

        {/* Login Button */}
        <button 
        className="hidden lg:block bg-red-300 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
          Login
        </button>



       {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="lg:hidden mt-4 space-y-2 text-center">
          {menus.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:text-red-400 transition ${
                item === "Home" ? "text-red-400 font-semibold" : ""
              }`}
            >
              {item}
            </li>
          ))}
          <button className="bg-red-300 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition mt-2">
            Login
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
