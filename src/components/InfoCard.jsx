import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
const InfoCard = ({ user, onLike, onReject }) => {
  return (
    <div>
      <div className="w-24 h-24">
        <ProfileCard user={user} />
      </div>
       <motion.div
      className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 w-full max-w-lg h-[90%] shadow-xl rounded-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          {user ? `${user.first_name} ${user.last_name}, ${user.age}` : "John Doe"}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {user ? user.location : "New York, USA"}
        </p>
        <div className="mt-6 space-y-4">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            {user ? user.openness : "Introvert"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user ? `Interests: ${user.interests}` : "Interests: Football"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user ? `Looking for: ${user.relation_type}` : "Looking for: Casual"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user ? `Social habits: ${user.social_habits}` : "Social habits: Dunno"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user ? `Expectations: ${user.exp_qual}` : "Expectations: Cook"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user ? `Past relationships: ${user.past_relations}` : "Past relationships: No"}
          </p>
        </div>

        {/* Interactive Buttons */}
        <div className="flex justify-around mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-green-600 transform transition-all duration-300"
            onClick={onLike}
          >
            Like
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-red-600 transform transition-all duration-300"
            onClick={onReject}
          >
            Reject
          </motion.button>
        </div>
      </div>
    </motion.div>
    </div>
   
  );
};

export default InfoCard;
