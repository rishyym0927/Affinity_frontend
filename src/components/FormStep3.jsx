import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const FormStep3 = ({ onBack }) => {
  const { registerUser, registerInfo } = useContext(AuthContext);

  const renderField = (label, value) => (
    <div className="mb-2">
      <span className="text-gray-400 font-semibold">{label}:</span>
      <span className="ml-2 text-white">{value || 'Not provided'}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg h-full flex flex-col justify-between"
    >
      <div>
        <h2 className="text-4xl text-white font-bold text-[#ff0059] mb-4">Review and Submit</h2>
        <p className="text-neutral-400 font-bold mb-4">Take a final look before you <span className="text-yellow-600">join us!</span></p>
      </div>

      <div className="bg-neutral-800 p-4 rounded-lg shadow-inner text-xs">
        <div className="grid grid-cols-2 gap-4">
          {renderField('First Name', registerInfo.first_name)}
          {renderField('Last Name', registerInfo.last_name)}
          {renderField('Email', registerInfo.email)}
          {renderField('Username', registerInfo.username)}
          {renderField('Gender', registerInfo.gender)}
          {renderField('Age', registerInfo.age)}
          {renderField('Location', registerInfo.location)}
          {renderField('Openness', registerInfo.openness)}
          {renderField('Relation Type', registerInfo.relation_type)}
          {renderField('Expected Qualities', registerInfo.exp_qual)}
          {renderField('Interests', registerInfo.interests)}
          {renderField('Social Habits', registerInfo.social_habits)}
          {renderField('Past Relationships', registerInfo.past_relations)}
          
        {registerInfo.image_url && (
          <div className="mt-4 flex">
            <span className="text-gray-400 font-semibold">Profile Picture:</span>
            <div className="mt-2 w-32 h-32 rounded-full overflow-hidden">
              <img src={registerInfo.image_url} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        </div>
        <form onSubmit={registerUser} className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="bg-neutral-900 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>

      </div>

     
    </motion.div>
  );
};

export default FormStep3;