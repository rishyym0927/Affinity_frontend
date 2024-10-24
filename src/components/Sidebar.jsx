import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import profile_svg from "../assets/profile_svg.svg";
import { FiEdit, FiCheck, FiX } from 'react-icons/fi'

const Sidebar = () => {
  const { user, updateUser, logoutUser } = useContext(AuthContext);
  const location = useLocation();
  const [showProfileBox, setShowProfileBox] = useState(false);

  const [enableEdit, setEnableEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});

  const menuItemVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#4B5563",
      transition: {
        type: "spring",
        stiffness: 300,
      },
      cursor: "none",
    },
  };

  const profileBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const getLinkClass = (path) => {
    const baseClass = "block text-lg md:text-xl lg:text-2xl";
    return location.pathname === path
      ? `${baseClass} text-[#ff0059]`
      : `${baseClass} hover:text-gray-400`;
  };

  const getListItemClass = (path) => {
    const baseClass =
      "mb-6 w-full p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold ";
    return location.pathname === path
      ? `${baseClass} bg-[#2C2C2C]`
      : `${baseClass} bg-neutral-700`;
  };

  const handleEditChange = (field, val) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const saveChanges = () => {
    updateUser(editedUser);
    setEnableEdit(false);
  };

  const cancelChanges = () => {
    setEditedUser({ ...user });
    setEnableEdit(false);
  };

  return (
    <div className="w-full md:w-80 lg:w-96 h-full bg-black text-white flex flex-col fixed top-0 left-0">
      <motion.div
        className="p-3 flex gap-2 flex-row items-center bg-[#ff0059] hover:bg-red-500 m-5 rounded-lg justify-around"
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowProfileBox(true)}
      >
        <img
          src={user?.image_url || profile_svg}
          alt="Profile"
          className="w-14 h-14 rounded-full bg-black"
        />
        <h3 className="text-3xl font-semibold">
          @{user?.user_name || "John Doe"}
        </h3>
      </motion.div>

      <AnimatePresence>
        {showProfileBox && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-10"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setShowProfileBox(false)}
            />
            <motion.div
              className="fixed top-[5%] left-[10%] right-[10%] max-h-[90vh] overflow-y-auto p-4 bg-neutral-800 rounded-xl z-20 shadow-lg text-white"
              variants={profileBoxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="w-full md:w-1/3 flex justify-center items-start">
                  <img
                    src={user?.image_url || profile_svg}
                    alt="Profile"
                    className="w-full max-w-[260px] h-auto rounded-lg object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-4 text-neutral-300">
                  <h2 className="text-4xl font-extrabold text-[#ff0059] mb-4 flex gap-3">
                    <p>{user?.first_name} {user?.last_name} </p>
                    <FiEdit
                      className="hover:text-neutral-300 text-[#ff0059]"
                      onClick={() => {
                        setEnableEdit(true);
                      }}
                    />
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem
                      label="Username"
                      value={user?.user_name || "John Doe"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("user_name", val)}
                    />
                    <InfoItem
                      label="Email"
                      value={user?.email || "john.doe@example.com"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("email", val)}
                    />
                    <InfoItem
                      label="Gender"
                      value={user?.gender || "Not specified"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("gender", val)}
                    />
                    <InfoItem
                      label="Age"
                      value={user?.age || "Not specified"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("age", val)} 
                    />
                    <InfoItem
                      label="Location"
                      value={user?.location || "Not specified"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("location", val)}
                    />
                    <InfoItem
                      label="Personality"
                      value={user?.openness || "Not specified"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("openness", val)}
                    />
                    <InfoItem
                      label="Interests"
                      value={user?.interests || "Not specified"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("interests", val)}
                    />
                    <InfoItem
                      label="Looking for"
                      value={user?.relation_type || "Not specified"}
                      onChange={(val) => handleEditChange("relation_type", val)}
                      edit={enableEdit}
                    />
                    <InfoItem
                      label="Social habits"
                      value={user?.social_habits || "Not specified"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("social_habits", val)}
                    />
                    <InfoItem
                      label="Expectations"
                      value={user?.exp_qual || "Not specified"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("exp_qual", val)}
                    />
                    <InfoItem
                      label="Past relationships"
                      value={user?.past_relations || "Not specified"}
                      edit={enableEdit}
                      onChange={(val) => handleEditChange("past_relations", val)}
                    />
                  </div>
                  {enableEdit && (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={saveChanges}
                        className="bg-[#ff0059] px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2"
                      >
                        <FiCheck /> Save
                      </button>
                      <button
                        onClick={cancelChanges}
                        className="bg-[#616161] px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2"
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                className="mt-4 bg-[#ff0059] w-full text-white font-semibold px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#ff3380" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileBox(false)}
              >
                Close
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
          {user.gender === "Female" && <motion.li
            className={getListItemClass("/queue")}
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link to="/queue" className={getLinkClass("/queue")}>
              Queue
            </Link>
          </motion.li>}
        </ul>
      </nav>

      <motion.button
        className="mt-4 bg-[#ff0059] w-2/6 ml-4 mb-4 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 text-lg"
        whileHover={{ scale: 1.1, backgroundColor: "#ff3380" }}
        whileTap={{ scale: 0.95 }}
        onClick={logoutUser}
        animate={{
          y: [0, -10, 0], // Moves the button up and down
        }}
        transition={{
          repeat: Infinity, // Keeps the animation looping
          duration: 0.4, // Duration of each animation cycle
          ease: "easeInOut", // Smooth animation
        }}
      >
        Logout
      </motion.button>
    </div>
  );
};

const InfoItem = ({ label, value, edit, onChange }) => (
  <p className="text-lg">
    <span className="font-semibold text-yellow-500">{label}:</span>
    {edit ?
      label === 'Personality' ?
        <select className="text-black mx-3 px-2 bg-neutral-300 rounded-md" defaultValue={value}   onChange={(e) => onChange(e.target.value)}>
          <option value="extrovert">Extrovert</option>
          <option value="introvert">Introvert</option>
          <option value="ambivert">Ambivert</option>
        </select>
        : label === 'Looking for' ?
          <select className="text-black mx-3 px-2 bg-neutral-300 rounded-md" defaultValue={value}   onChange={(e) => onChange(e.target.value)}>
            <option value="casual">Casual</option>
            <option value="shortTerm">Short Term</option>
            <option value="longTerm">Long Term</option>
          </select> 
        : label === 'Past relationships' ?
          <select className="text-black mx-3 px-2 bg-neutral-300 rounded-md" defaultValue={value}   onChange={(e) => onChange(e.target.value)} >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select> :
          (<input
            type="text"
            defaultValue={value}
            className="text-black mx-3 px-2 bg-neutral-300 rounded-md"
            onChange={(e) => onChange(e.target.value)}
          />
          ) : (
        <span className="mx-3">{value}</span>
      )}
  </p>
);

export default Sidebar;
