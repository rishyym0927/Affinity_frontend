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
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#ff0059] mb-4">Contact Information</h2>
      <form className="space-y-4">
        
        <div className='flex flex-row w-full gap-4'>
          <label className="block w-full">
            <span className="text-gray-400">Gender:</span>
            <div className="flex mt-1 space-x-2">
              {['male', 'female', 'non_binary'].map(gender => (
                <button 
                  key={gender}
                  type="button" 
                  name="gender" 
                  value={gender} 
                  onClick={() => updateRegisterInfo({ ...registerInfo, gender })}
                  className={`p-2 h-10 rounded-md ${registerInfo.gender === gender ? 'bg-[#ff0059]' : 'bg-gray-700'} text-white border border-gray-600`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </label>
          <label className="block w-full">
            <span className="text-gray-400">Age:</span>
            <input 
              type="number" 
              name="age" 
              value={registerInfo.age}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, age: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
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
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
          />
        </label>
        <div className='flex flex-row w-full gap-4'>
          <label className="block w-full">
            <span className="text-gray-400">Openess:</span>
            <select 
              name="openess" 
              value={registerInfo.openess}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, openess: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="">Select</option>
              <option value="introvert">Introvert</option>
              <option value="extrovert">Extrovert</option>
              <option value="ambivert">Ambivert</option>
            </select>
          </label>
          <label className="block w-full">
            <span className="text-gray-400">Relation:</span>
            <select 
              name="relation" 
              value={registerInfo.relation}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, relation: e.target.value })}
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="">Select</option>
              <option value="casual">Casual</option>
              <option value="shortTerm">Short Term</option>
              <option value="longTerm">Long Term</option>
            </select>
          </label>
        </div>
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
