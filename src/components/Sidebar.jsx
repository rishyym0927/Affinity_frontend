import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import profile_svg from "../assets/profile_svg.svg";

const Sidebar = () => {
    const {user} = useContext(AuthContext);

    // Animation variants for menu items
    const menuItemVariants = {
        hover: {
            scale: 1.05,
            backgroundColor: '#374151', // Tailwind's gray-700
            transition: {
                type: 'spring',
                stiffness: 300,
            }
        }
    };

    return (
        <div className="w-full md:w-80 lg:w-96 h-full bg-neutral-900 text-white flex flex-col fixed top-0 left-0">
            <motion.div 
                className="p-6 flex flex-row items-center bg-[#ff0059] hover:bg-red-500 m-5 rounded-lg gap-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
            >
                <img
                    src={user?.image || profile_svg}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border border-2 border-white"
                />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">{user?.user_name || "John Doe"}</h3>
            </motion.div>
            <nav className="flex-1 p-6 w-full">
                <ul className="w-full">
                    <motion.li 
                        className="mb-6 w-full bg-neutral-700 p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold cursor-pointer"
                        variants={menuItemVariants}
                        whileHover="hover"
                    >
                        <Link to="/search" className="block text-lg md:text-xl lg:text-2xl hover:text-gray-400">
                            Search
                        </Link>
                    </motion.li>
                    <motion.li 
                        className="mb-6 w-full bg-neutral-700 p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold cursor-pointer"
                        variants={menuItemVariants}
                        whileHover="hover"
                    >
                        <Link to="/queue" className="block text-lg md:text-xl lg:text-2xl hover:text-gray-400">
                            Queue
                        </Link>
                    </motion.li>
                    <motion.li 
                        className="w-full bg-neutral-700 p-3 rounded-lg text-lg md:text-xl lg:text-2xl font-bold cursor-pointer"
                        variants={menuItemVariants}
                        whileHover="hover"
                    >
                        <Link to="/matches" className="block text-lg md:text-xl lg:text-2xl hover:text-gray-400">
                            Matches
                        </Link>
                    </motion.li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
