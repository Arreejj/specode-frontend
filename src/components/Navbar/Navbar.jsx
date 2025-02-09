import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom"; 

// Navbar menu items
const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Services", path: "#" },
  { id: 3, title: "About Us", path: "#" },
  { id: 4, title: "Our Team", path: "#" },
  { id: 5, title: "Contact Us", path: "#" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo (Clickable to Home) */}
        <Link to="/" className="font-bold text-2xl text-blue-600">
          SpeCode Fusion
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {NavbarMenu.map((menu) => (
            <Link
              key={menu.id}
              to={menu.path}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              {menu.title}
            </Link>
          ))}
          <Link to="/login" className="primary-btn">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-3xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoMdMenu />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md py-4 px-6">
          {NavbarMenu.map((menu) => (
            <Link
              key={menu.id}
              to={menu.path}
              className="block text-gray-700 py-2 hover:text-blue-500 transition"
            >
              {menu.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
