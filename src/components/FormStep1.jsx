import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { validations } from '../utils/formValidations'; 


const FormStep1 = ({ onNext }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
  
    const fieldsToValidate = ['first_name', 'last_name', 'email', 'password'];
  
    fieldsToValidate.forEach((field) => {
      const error = validations(field, registerInfo[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    onNext(); 
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg h-full bg-white dark:bg-neutral-900"
    >
      <h2 className="text-lg font-bold text-[#ff0059] dark:text-yellow-400 mb-4">START FOR FREE</h2>
      <h1 className='text-gray-800 dark:text-white text-5xl font-bold mb-6'>Create your account</h1>
      <p className='text-neutral-600 dark:text-neutral-400 font-bold mb-14'>
        Already a member? 
        <span className='text-yellow-500'>
          <Link to="/login"> Log in</Link>
        </span>
      </p>
      <form className="space-y-4">
        <div className='flex flex-row gap-10'>
          <label className="w-1/2">
            <span className="text-gray-800 dark:text-gray-300">First Name:</span>
            <input 
              type="text" 
              name="first_name" 
              value={registerInfo.first_name}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, first_name: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-200 border border-gray-300 outline-none text-black dark:bg-neutral-800 dark:text-white" 
            />
            {errors.first_name && <p className="text-[#ff0059]">{errors.first_name}</p>}
          </label>
          <label className="w-1/2">
            <span className="text-gray-800 dark:text-gray-300">Last Name:</span>
            <input 
              type="text" 
              name="last_name" 
              value={registerInfo.last_name}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, last_name: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-200 border border-gray-300 outline-none text-black dark:bg-neutral-800 dark:text-white" 
            />
            {errors.last_name && <p className="text-[#ff0059]">{errors.last_name}</p>} 
          </label>
        </div>
        <label className="block">
          <span className="text-gray-800 dark:text-gray-300">Email:</span>
          <input 
            type="email" 
            name="email" 
            value={registerInfo.email}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-200 border border-gray-300 outline-none text-black dark:bg-neutral-800 dark:text-white" 
          />
          {errors.email && <p className="text-[#ff0059]">{errors.email}</p>}
        </label>
        <label className="block">
          <span className="text-gray-800 dark:text-gray-300">Password:</span>
          <input 
            type="password" 
            name="password" 
            value={registerInfo.password}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-200 border border-gray-300 outline-none text-black dark:bg-neutral-800 dark:text-white" 
          />
            {errors.password && <p className="text-[#ff0059]">{errors.password}</p>}
        </label>
      </form>
      <button 
        type="button" 
        onClick={handleNext} 
        className="w-1/3 mt-14 mb-10 bg-[#ff0059] hover:bg-red-500 text-white py-4 rounded-md"
      >
        Let's Move to Next
      </button>
    </motion.div>
  );
};

export default FormStep1;
