// src/components/FormStep3.js
import React from 'react';
import { motion } from 'framer-motion';

const FormStep3 = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#ff0059] mb-4">Step 3: Review and Submit</h2>
      <p className="text-gray-400 mb-4">Review your information and submit the form.</p>
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
          Back
        </button>
        <button type="button" className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md">
          Submit
        </button>
      </div>
    </motion.div>
  );
};

export default FormStep3;
