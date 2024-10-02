import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Denied = () => {
    return (
        <div className="bg-black text-gray-200 w-full h-screen flex flex-col items-center justify-center px-6 py-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
            
                <motion.div
                    className="flex justify-center items-center mb-4"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ type: "spring", stiffness: 150, duration: 1 }}
                >
                    <FaLock className="text-6xl text-[#ff0059]" />
                </motion.div>

                
                <h1 className="text-5xl font-bold mb-4">
                    Access Denied!
                </h1>


                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-xl text-gray-400"
                >
                    Oops! Looks like you're trying to unlock a door that doesn’t belong to you.
                </motion.p>

            
                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#ff0059] hover:bg-red-500 text-white font-bold text-xl py-2 px-6 rounded-lg mt-8"
                    >
                        Take Me Home
                    </motion.button>
                </Link>


                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-8 text-gray-400"
                >
                    Want to explore? Maybe you need the right key. 🗝️
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Denied;
