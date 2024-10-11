import React from 'react';
import { motion } from 'framer-motion';

const Card1 = ({ image, name, age }) => {
  return (
    <motion.div
      className="w-full h-full relative rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
    >
      {/* Image with full cover */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      
      {/* Text Content */}
      <div className="absolute bottom-10 left-4 text-white z-10 flex flex-row items-center gap-2">
        <div className="text-xl font-semibold">{name}</div>
        <div className="text-sm text-gray-300">{age} years old</div>
      </div>
    </motion.div>
  );
};

export default Card1;
