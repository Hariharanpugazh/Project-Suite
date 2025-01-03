import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, User } from "lucide-react";

const Header = ({ setIsSidebarOpen }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="mr-4 p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </motion.button>
          <motion.h1
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
            whileHover={{ scale: 1.05 }}
          >
            SNS Project Suite
          </motion.h1>
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLoginOpen(!isLoginOpen)}
            className="p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
          >
            <User size={24} />
          </motion.button>
          {isLoginOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
              >
                Login
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
              >
                Sign Up
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
