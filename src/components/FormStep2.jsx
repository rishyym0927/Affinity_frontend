import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const FormStep2 = ({ onNext, onBack }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg h-full flex flex-col justify-around"
    >
      <div>
      <h2 className="text-4xl text-white  font-bold text-[#ff0059] text-neutral-700 mb-4">Contact Information</h2>
      <p className='text-neutral-400  font-bold mb-8'>Don't worry we will keep it to  <span className='text-yellow-600'>ourselves</span> only !</p>
      </div>
      
      <form className="space-y-4">
        <div className='flex flex-row gap-4 '>
          <label className="w-1/3">
            <span className="text-gray-400">Gender:</span>
            <div className="flex mt-1 flex-row gap-4">
              {['Male', 'Female'].map(gender => (
                <button
                  key={gender}
                  type="button"
                  name="gender"
                  value={gender}
                  onClick={() => updateRegisterInfo({ ...registerInfo, gender })}
                  className={`p-2 h-10 rounded-md ${registerInfo.gender === gender ? 'bg-[#ff0059]' : 'bg-neutral-800'} text-white border border-gray-600`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </label>
          <label className="w-1/3">
            <span className="text-gray-400">Age:</span>
            <input
              type="age"
              name="age"
              value={registerInfo.age}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, age: Number(e.target.value) })}
              className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
            />
          </label>
          <label className="w-1/3">
          <span className="text-gray-400">Username:</span>
          <input
            type="text"
            name="username"
            value={registerInfo.username}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, username: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
          />
        </label>
        </div>

        <label className="block">
          <span className="text-gray-400">Location:</span>
          <input
            type="text"
            name="location"
            value={registerInfo.location}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, location: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
          />
        </label>
        <div className='flex flex-row gap-10'>
          <label className="w-1/2">
            <span className="text-gray-400">Openness:</span>
            <select
              name="openness"
              value={registerInfo.openness}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, openness: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
            >
              <option value="">Select</option>
              <option value="introvert">Introvert</option>
              <option value="extrovert">Extrovert</option>
              <option value="ambivert">Ambivert</option>
            </select>
          </label>
          <label className="w-1/2">
            <span className="text-gray-400">Relation Type:</span>
            <select
              name="relation_type"
              value={registerInfo.relation_type}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, relation_type: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
            >
              <option value="">Select</option>
              <option value="casual">Casual</option>
              <option value="shortTerm">Short Term</option>
              <option value="longTerm">Long Term</option>
            </select>
          </label>
          
        </div>
         <label className="block">
          <span className="text-gray-400">Expected Qualities</span>
          <input
            type="text"
            name="exp_qual"
            value={registerInfo.exp_qual}
            onChange={(e) =>
              updateRegisterInfo({ ...registerInfo, exp_qual: e.target.value })
            }
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
          />
        </label>
       
      </form>
      <div className="flex justify-start  gap-4 items-end mt-10">
          <button type="button" onClick={onBack} className="bg-neutral-800 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
            Back
          </button>
          <button type="button" onClick={onNext} className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md">
            Next
          </button>
        </div>
    </motion.div>
  );
};

export default FormStep2;