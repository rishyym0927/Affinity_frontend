import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const FormStep1 = ({ onNext }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg h-full "
    >
      <h2 className="text-lg font-bold text-[#ff0059] text-neutral-700 mb-4">START FOR FREE</h2>
      <h1 className='text-white text-5xl font-bold mb-6'>Create your account</h1>
      <p className='text-neutral-400 font-bold mb-14'>Already a member ? <span className='text-yellow-500'><Link to="/login">Log in</Link></span></p>
      <form className="space-y-4">
        <div className='flex flex-row gap-10'>
        <label className="w-1/2">
          <span className="text-gray-400">First Name:</span>
          <input 
            type="text" 
            name="first_name" 
            value={registerInfo.first_name}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, first_name: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600" 
          />
        </label>
        <label className="w-1/2">
          <span className="text-gray-400">Last Name:</span>
          <input 
            type="text" 
            name="last_name" 
            value={registerInfo.last_name}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, last_name: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600" 
          />
        </label>
        </div>
        <label className="block">
          <span className="text-gray-400">Email:</span>
          <input 
            type="email" 
            name="email" 
            value={registerInfo.email}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600" 
          />
        </label>
       

        <label className="block ">
          <span className="text-gray-400">Password:</span>
          <input 
            type="password" 
            name="password" 
            value={registerInfo.password}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600" 
          />
        </label>

        
      </form>
      <button 
          type="button" 
          onClick={onNext} 
          className="w-1/3 mt-14 mb-10 bg-[#ff0059] hover:bg-red-500 text-white py-4 rounded-md"
        >
          Lets Move to Next
        </button>
    </motion.div>
  );
};

export default FormStep1;
