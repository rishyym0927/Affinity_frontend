import React, { useContext,useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { validations } from '../utils/formValidations';

const FormStep2 = ({ onNext, onBack }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const handleNext = () =>{
    const newErrors ={};
    const fieldsToValidate = ['gender','age','username','location'] ;

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
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg h-full flex flex-col justify-around bg-white dark:bg-neutral-900"
    >
      <div>
        <h2 className="text-4xl font-bold text-[#ff0059] dark:text-yellow-400 mb-4">
          Contact Information
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 font-bold mb-8">
          Don't worry, we will keep it to <span className="text-yellow-600">ourselves</span> only!
        </p>
      </div>

      <form className="space-y-4">
        <div className="flex flex-row gap-4">
          <label className="w-1/3">
            <span className="text-gray-800 dark:text-gray-300">Gender:</span>
            <div className="flex mt-1 flex-row gap-4">
              {['Male', 'Female'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  name="gender"
                  value={gender}
                  onClick={() => updateRegisterInfo({ ...registerInfo, gender })}
                  className={`p-2 h-10 rounded-md ${
                    registerInfo.gender === gender ? 'bg-[#ff0059] text-gray-200 dark:text-gray-800' : 'bg-gray-200 dark:bg-neutral-800'
                  } text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600`}
                >
                   {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
            {errors.gender && <p className="text-[#ff0059]">{errors.gender}</p>}
          </label>

          <label className="w-1/3">
            <span className="text-gray-800 dark:text-gray-300">Age:</span>
            <input
              type="age"
              name="age"
              value={registerInfo.age}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, age: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white"
            />
            {errors.age && <p className="text-[#ff0059]">{errors.age}</p>}
          </label>

          <label className="w-1/3">
            <span className="text-gray-800 dark:text-gray-300">Username:</span>
            <input
              type="text"
              name="username"
              value={registerInfo.username}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, username: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white"
            />
            {errors.username && <p className="text-[#ff0059]">{errors.username}</p>}
          </label>
        </div>

        <label className="block">
          <span className="text-gray-800 dark:text-gray-300">Location:</span>
          <input
            type="text"
            name="location"
            value={registerInfo.location}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, location: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white"
          />
          {errors.location && <p className="text-[#ff0059]">{errors.location}</p>}
        </label>

        <div className="flex flex-row gap-10">
          <label className="w-1/2">
            <span className="text-gray-800 dark:text-gray-300">Openness:</span>
            <select
              name="openness"
              value={registerInfo.openness}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, openness: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white"
            >
              <option value="">Select</option>
              <option value="introvert">Introvert</option>
              <option value="extrovert">Extrovert</option>
              <option value="ambivert">Ambivert</option>
            </select>
          </label>

          <label className="w-1/2">
            <span className="text-gray-800 dark:text-gray-300">Relation Type:</span>
            <select
              name="relation_type"
              value={registerInfo.relation_type}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, relation_type: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white"
            >
              <option value="">Select</option>
              <option value="casual">Casual</option>
              <option value="shortTerm">Short Term</option>
              <option value="longTerm">Long Term</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-gray-800 dark:text-gray-300">Expected Qualities:</span>
          <input
            type="text"
            name="exp_qual"
            value={registerInfo.exp_qual}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, exp_qual: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white"
          />
        </label>
      </form>

      <div className="flex justify-start gap-4 items-end mt-10 pb-5">
        <button type="button" onClick={onBack} className="bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 text-black dark:text-white py-2 px-4 rounded-md">
          Back
        </button>
        <button type="button" onClick={handleNext} className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md">
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default FormStep2;