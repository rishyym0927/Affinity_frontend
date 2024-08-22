import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import profile_svg from "../assets/profile_svg.svg";

const Sidebar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  // Animation variants for menu items
  const menuItemVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "", // Tailwind's gray-700
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <div className="w-full md:w-80 lg:w-96 h-full bg-black text-white flex flex-col fixed top-0 left-0">
      <motion.div
        className="p-3 flex gap-2 flex-row items-center bg-[#ff0059] hover:bg-red-500 m-5 rounded-lg justify-around  cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={user?.image_url || profile_svg}
          alt="Profile"
          className="w-14 h-14 rounded-full bg-black "
        />
        <h3 className="text-3xl font-semibold">
          @{user?.user_name || "John Doe"}
        </h3>
      </motion.div>
      <nav className="flex-1 p-6 w-full">
        <ul className="w-full">
          <motion.li
            className="mb-6 w-full bg-neutral-700 p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold cursor-pointer"
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link
              to="/dashboard"
              className="block text-lg md:text-xl lg:text-2xl hover:text-gray-400"
            >
              Search
            </Link>
          </motion.li>
          <motion.li
            className="mb-6 w-full bg-neutral-700 p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold cursor-pointer"
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link
              to="/request"
              className="block text-lg md:text-xl lg:text-2xl hover:text-gray-400"
            >
              Request
            </Link>
          </motion.li>
          <motion.li
            className="mb-6 w-full bg-neutral-700 p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold cursor-pointer"
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link
              to="/matches"
              className="block text-lg md:text-xl lg:text-2xl hover:text-gray-400"
            >
              Matches
            </Link>
          </motion.li>
          <motion.li
            className="w-full bg-neutral-700 p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold cursor-pointer"
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link
              to="/chatbot"
              className="block text-lg md:text-xl lg:text-2xl hover:text-gray-400"
            >
              ChatBot
            </Link>
          </motion.li>
        </ul>
      </nav>

      <motion.div
        className=" w-[28%] flex items-center justify-center m-6 bg-neutral-700 p-3 rounded-lg text-xl font-bold cursor-pointer"
        variants={menuItemVariants}
        whileHover="hover"
        onClick={logoutUser}
      >
        Logout
      </motion.div>
    </div>
  );
};

export default Sidebar;
