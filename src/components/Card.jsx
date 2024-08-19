import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ image, name, age }) => {
  return (
    <motion.div
      style={{ backgroundImage: `url(${image})` }}
      className="w-[100%] h-[100%] bg-cover bg-center relative rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05, }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, 8, 0] ,}}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, }}
    >
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
      
      {/* Text Content */}
      <div className="absolute bottom-10 left-4 text-white z-10 flex flex-row items-center gap-2">
        <div className="text-xl font-semibold">{name}</div>
        <div className="text-sm text-gray-300">{age}</div>
      </div>
    </motion.div>
  );
};

export default Card;
