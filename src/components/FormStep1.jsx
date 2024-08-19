import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const FormStep1 = ({ onNext }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#ff0059] mb-4">Let's get to know you better</h2>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-400">First Name:</span>
          <input 
            type="text" 
            name="firstName" 
            value={registerInfo.firstName}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, firstName: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
          />
        </label>
        <label className="block">
          <span className="text-gray-400">Last Name:</span>
          <input 
            type="text" 
            name="lastName" 
            value={registerInfo.lastName}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, lastName: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
          />
        </label>
        <label className="block">
          <span className="text-gray-400">Email:</span>
          <input 
            type="email" 
            name="email" 
            value={registerInfo.email}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
          />
        </label>
        <label className="block">
          <span className="text-gray-400">Username:</span>
          <input 
            type="text" 
            name="username" 
            value={registerInfo.username}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, username: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
          />
        </label>
       
        <button 
          type="button" 
          onClick={onNext} 
          className="w-full bg-[#ff0059] hover:bg-red-500 text-white py-2 rounded-md"
        >
          Next
        </button>
      </form>
    </motion.div>
  );
};

export default FormStep1;
