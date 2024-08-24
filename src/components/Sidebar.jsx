import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import profile_svg from "../assets/profile_svg.svg";

const Sidebar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  // Animation variants for menu items
  const menuItemVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#4B5563", // Tailwind's gray-600
      transition: {
        type: "spring",
        stiffness: 300,
      },
      cursor : "none"
    },
  };

  const getLinkClass = (path) => {
    const baseClass = "block text-lg md:text-xl lg:text-2xl";
    return location.pathname === path
      ? `${baseClass} text-[#ff0059]`
      : `${baseClass} hover:text-gray-400`;
  };

  const getListItemClass = (path) => {
    const baseClass = "mb-6 w-full p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold ";
    return location.pathname === path
      ? `${baseClass} bg-[#2C2C2C]`
      : `${baseClass} bg-neutral-700`;
  };

  return (
    <div className="w-full md:w-80 lg:w-96 h-full bg-black text-white flex flex-col fixed top-0 left-0">
      {/* Profile section remains unchanged */}
      <motion.div
        className="p-3 flex gap-2 flex-row items-center bg-[#ff0059] hover:bg-red-500 m-5 rounded-lg justify-around  "
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
      <nav className="flex-1 p-6 w-full cursor-none">
        <ul className="w-full cursor-none">
          {user.gender === "Female" && (
            <motion.li
              className={getListItemClass("/dashboard")}
              variants={menuItemVariants}
              whileHover="hover"
            >
              <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                Search
              </Link>
            </motion.li>
          )}
          {user.gender === "Male" && (
            <motion.li
              className={getListItemClass("/request")}
              variants={menuItemVariants}
              whileHover="hover"
            >
              <Link to="/request" className={getLinkClass("/request")}>
                Request
              </Link>
            </motion.li>
          )}
          <motion.li
            className={getListItemClass("/matches")}
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link to="/matches" className={getLinkClass("/matches")}>
              Matches
            </Link>
          </motion.li>
          <motion.li
            className={getListItemClass("/chatbot")}
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link to="/chatbot" className={getLinkClass("/chatbot")}>
              ChatBot
            </Link>
          </motion.li>
          <motion.li
            className={getListItemClass("/chatbot")}
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link to="/queue" className={getLinkClass("/queue")}>
              Queue
            </Link>
          </motion.li>
        </ul>
      </nav>
      {/* Logout button remains unchanged */}
      <motion.div
        className="w-[28%] flex items-center justify-center m-6 bg-neutral-700 p-3 rounded-lg text-xl font-bold cursor-pointer"
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