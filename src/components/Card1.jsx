// src/components/Card.js
import React from 'react';
import { motion } from 'framer-motion';


const Card = ({ front, back }) => {
  return (
    <div className="card">
      <motion.div
        className="card-inner"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.1 }}
      >
        <div className="card-front object-center">
          {front}
        </div>
        <div className="card-back">
          {back}
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
