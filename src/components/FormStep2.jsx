// src/components/FormStep2.js
import React from 'react';
import { motion } from 'framer-motion';

const FormStep2 = ({ onNext, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#ff0059] mb-4">Step 2: Contact Information</h2>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-400">Email:</span>
          <input type="email" name="email" className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" />
        </label>
        <label className="block">
          <span className="text-gray-400">Phone:</span>
          <input type="tel" name="phone" className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" />
        </label>
        <div className="flex justify-between">
          <button type="button" onClick={onBack} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
            Back
          </button>
          <button type="button" onClick={onNext} className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md">
            Next
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FormStep2;
