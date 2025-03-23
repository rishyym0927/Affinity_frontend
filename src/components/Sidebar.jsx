import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import profile_svg from "../assets/profile_svg.svg";
import { FiEdit, FiCheck, FiX, FiSearch, FiHeart, FiMessageCircle, FiSend, FiList, FiLogOut, FiChevronRight } from 'react-icons/fi';

const Sidebar = () => {
  const { user, updateUser, logoutUser } = useContext(AuthContext);
  const location = useLocation();
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});
  const [collapsed, setCollapsed] = useState(false);

  // Responsive sidebar collapse for mobile
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      path: "/dashboard",
      title: "Search",
      icon: <FiSearch size={22} />,
      show: user.gender === "Female"
    },
    {
      path: "/request",
      title: "Request",
      icon: <FiSend size={22} />,
      show: user.gender === "Male"
    },
    {
      path: "/matches",
      title: "Matches",
      icon: <FiHeart size={22} />,
      show: true
    },
    {
      path: "/chatbot",
      title: "ChatBot",
      icon: <FiMessageCircle size={22} />,
      show: true
    },
    {
      path: "/queue",
      title: "Queue",
      icon: <FiList size={22} />,
      show: user.gender === "Female"
    }
  ];

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
    <>
      {/* Expand/Collapse Toggle for Mobile */}
      <motion.button
        className={`md:hidden fixed z-20 top-4 ${collapsed ? 'left-4' : 'left-64'} bg-neutral-800 p-2 rounded-full shadow-lg text-white`}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <FiChevronRight
          size={20}
          className={`transition-transform duration-300 ${collapsed ? 'rotate-0' : 'rotate-180'}`}
        />
      </motion.button>
    
      <motion.div
        className="  h-full bg-gradient-to-b from-neutral-900 to-black text-white flex flex-colz-10 shadow-2xl overflow-hidden"
        animate={{
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full flex flex-col ">
          {/* Profile Section */}
          <motion.div
            className="px-4 py-6 relative overflow-hidden"
            animate={{ 
              paddingLeft: collapsed ? 10 : 16,
              paddingRight: collapsed ? 10 : 16
            }}
          >
            <motion.div
              className="flex items-center gap-3 bg-gradient-to-r from-neutral-800 to-neutral-900 p-3 rounded-xl border border-neutral-700 cursor-pointer shadow-md"
              whileHover={{ 
                scale: 1.02, 
                borderColor: "#ff0059",
                boxShadow: "0 0 12px rgba(255, 0, 89, 0.3)"
              }}
              onClick={() => setShowProfileBox(true)}
            >
              <motion.div
                className="relative"
                animate={{ 
                  width: collapsed ? 40 : 60,
                  height: collapsed ? 40 : 60
                }}
              >
                <img
                  src={user?.image_url || profile_svg}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-[#ff0059]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-800"></span>
              </motion.div>
              
              <motion.div 
                className="flex-1 overflow-hidden"
                animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white truncate">
                  @{user?.user_name || "John Doe"}
                </h3>
                <p className="text-sm text-neutral-400 truncate">
                  {user?.location || "Location not set"}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Navigation Section */}
          <nav className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar">
            <motion.div
              className="space-y-2"
              animate={{ 
                paddingLeft: collapsed ? 8 : 0,
                paddingRight: collapsed ? 8 : 0
              }}
            >
              {menuItems.map((item) => 
                item.show && (
                  <NavItem 
                    key={item.path}
                    path={item.path}
                    title={item.title}
                    icon={item.icon}
                    currentPath={location.pathname}
                    collapsed={collapsed}
                  />
                )
              )}
            </motion.div>
          </nav>

          {/* Logout Section */}
          <div className="px-4 pb-6 pt-2">
            <motion.button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#ff0059] to-[#ff3380] text-white font-medium transform transition-all duration-300"
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 8px 16px -4px rgba(255, 0, 89, 0.5)" 
              }}
              whileTap={{ scale: 0.97 }}
              onClick={logoutUser}
              animate={{ 
                justifyContent: collapsed ? 'center' : 'flex-start',
                paddingLeft: collapsed ? 0 : 16
              }}
            >
              <FiLogOut size={20} />
              <motion.span
                animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Profile Modal */}
        <AnimatePresence>
          {showProfileBox && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowProfileBox(false)}
              />
              <motion.div
                className="fixed left-1/2 translate-x-1/2 transform w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-neutral-900 rounded-2xl z-40 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                {/* Profile Header */}
                <div className="p-6 bg-gradient-to-r from-[#ff0059]/20 to-neutral-900 border-b border-neutral-800">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">Profile Details</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowProfileBox(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <FiX size={24} />
                    </motion.button>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6 ">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                      <div className="relative w-full max-w-[220px] aspect-square rounded-xl overflow-hidden border-4 border-[#ff0059]/30 shadow-lg">
                        <img
                          src={user?.image_url || profile_svg}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ff0059]/80 text-white text-sm font-medium">
                            {user?.relation_type || "Looking"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 w-full max-w-[220px]">
                        <h3 className="text-2xl font-bold text-white text-center mb-1">
                          {user?.first_name} {user?.last_name}
                        </h3>
                        <p className="text-center text-neutral-400">
                          @{user?.user_name}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Personal Information</h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEnableEdit(!enableEdit)}
                          className={`p-2 rounded-full ${enableEdit ? 'bg-[#ff0059]/20 text-[#ff0059]' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
                        >
                          <FiEdit size={18} />
                        </motion.button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileInfoItem
                          label="Username"
                          value={user?.user_name || "John Doe"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("user_name", val)}
                        />
                        <ProfileInfoItem
                          label="Email"
                          value={user?.email || "john.doe@example.com"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("email", val)}
                        />
                        <ProfileInfoItem
                          label="Gender"
                          value={user?.gender || "Not specified"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("gender", val)}
                        />
                        <ProfileInfoItem
                          label="Age"
                          value={user?.age || "Not specified"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("age", val)} 
                        />
                        <ProfileInfoItem
                          label="Location"
                          value={user?.location || "Not specified"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("location", val)}
                        />
                        <ProfileInfoItem
                          label="Personality"
                          value={user?.openness || "Not specified"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("openness", val)}
                        />
                        <ProfileInfoItem
                          label="Interests"
                          value={user?.interests || "Not specified"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("interests", val)}
                        />
                        <ProfileInfoItem
                          label="Looking for"
                          value={user?.relation_type || "Not specified"}
                          onChange={(val) => handleEditChange("relation_type", val)}
                          edit={enableEdit}
                        />
                        <ProfileInfoItem
                          label="Social habits"
                          value={user?.social_habits || "Not specified"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("social_habits", val)}
                        />
                        <ProfileInfoItem
                          label="Expectations"
                          value={user?.exp_qual || "Not specified"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("exp_qual", val)}
                        />
                        <ProfileInfoItem
                          label="Past relationships"
                          value={user?.past_relations || "Not specified"}
                          edit={enableEdit}
                          onChange={(val) => handleEditChange("past_relations", val)}
                        />
                      </div>
                    </div>
                  </div>

                  {enableEdit && (
                    <div className="mt-6 flex gap-3 justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={cancelChanges}
                        className="px-4 py-2 rounded-lg bg-neutral-800 text-white font-medium flex items-center gap-2"
                      >
                        <FiX /> Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(255, 0, 89, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={saveChanges}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff0059] to-[#ff3380] text-white font-medium flex items-center gap-2"
                      >
                        <FiCheck /> Save Changes
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

// Navigation Item Component
const NavItem = ({ path, title, icon, currentPath, collapsed }) => {
  const isActive = currentPath === path;
  
  return (
    <motion.div
      className={`relative overflow-hidden ${isActive ? "z-10" : ""}`}
      animate={{ marginBottom: 8 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#ff0059]/20 to-neutral-900/20 rounded-xl border-l-4 border-[#ff0059]"
          layoutId="activeNavBackground"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      
      <Link to={path}>
        <motion.div
          className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
            isActive 
              ? "text-white" 
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
          }`}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          animate={{ 
            justifyContent: collapsed ? 'center' : 'flex-start',
            paddingLeft: collapsed ? 10 : 12 
          }}
        >
          <div className={`${isActive ? "text-[#ff0059]" : ""}`}>
            {icon}
          </div>
          
          <motion.span 
            className="font-medium text-lg"
            animate={{ 
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : 'auto',
              marginLeft: collapsed ? 0 : 4
            }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Profile Info Item Component
const ProfileInfoItem = ({ label, value, edit, onChange }) => (
  <div className="bg-neutral-800/50 p-3 rounded-lg border border-neutral-700">
    <p className="text-sm font-medium text-neutral-400 mb-1">{label}</p>
    {edit ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutral-700 text-white p-2 rounded border-none focus:ring-2 focus:ring-[#ff0059] outline-none"
      />
    ) : (
      <p className="text-white">{value}</p>
    )}
  </div>
);


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
