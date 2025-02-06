import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";

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
        {/* Logo */}
        <h1 className="font-bold text-2xl text-blue-600">SpeCode Fusion</h1>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {NavbarMenu.map((menu) => (
            <a
              key={menu.id}
              href={menu.path}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              {menu.title}
            </a>
          ))}
          <button className='primary-btn'>Sign In</button>
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
            <a
              key={menu.id}
              href={menu.path}
              className="block text-gray-700 py-2 hover:text-blue-500 transition"
            >
              {menu.title}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
