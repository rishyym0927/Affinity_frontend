import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const FormStep21 = ({ onNext, onBack }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);

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
          <span className="text-gray-400">Interests:</span>
          <input 
            type="text" 
            name="interests" 
            value={registerInfo.interest}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, interest: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
          />
        </label>
        
        <label className="block">
          <span className="text-gray-400">exp_qual:</span>
          <input 
            type="text" 
            name="exp_qual" 
            value={registerInfo.exp_qual}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, exp_qual: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
          />
        </label>

        <label className="block">
          <span className="text-gray-400">Social Habits:</span>
          <input 
            type="text" 
            name="social_habits" 
            value={registerInfo.social_habits}
            onChange={(e) => updateRegisterInfo({ ...registerInfo, social_habits: e.target.value })}
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600" 
          />
        </label>

        <div className="block">
          <span className="text-gray-400">Past Relationships:</span>
          <div className="flex items-center mt-2">
            <label className="inline-flex items-center mr-4">
              <input 
                type="radio" 
                name="past_relationships" 
                value="yes" 
                checked={registerInfo.past_relations === 'yes'}
                onChange={() => updateRegisterInfo({ ...registerInfo, past_relations: 'yes' })}
                className="form-radio text-[#ff0059]" 
              />
              <span className="ml-2 text-gray-400">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="past_relationships" 
                value="no" 
                checked={registerInfo.past_relations === 'no'}
                onChange={() => updateRegisterInfo({ ...registerInfo, past_relations: 'no' })}
                className="form-radio text-[#ff0059]" 
              />
              <span className="ml-2 text-gray-400">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-4">
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

export default FormStep21;
