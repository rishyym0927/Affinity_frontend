import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";

const InfoCard = ({ user, onLike, onReject }) => {
  return (
    <div className="flex flex-row w-full h-full gap-10">
      <div className="w-2/5 h-full">
        <ProfileCard user={user} />
      </div>
      <motion.div
        className="bg-black  h-full  w-3/5  shadow-2xl overflow-auto rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 flex flex-col jusitfy-around h-full  ">
          <div className="h-1/5">
            <h2 className="text-5xl font-extrabold text-white ">
              {user
                ? `${user.first_name} ${user.last_name}, ${user.age}`
                : "John Doe"}
            </h2>
            <p className="text-xl text-gray-300">
              {user ? user.location : "New York, USA"}
            </p>
          </div>
          <div className=" space-y-4 h-3/5">
            <p className="text-lg text-gray-400">
              {user ? user.openness : "Introvert"}
            </p>
            <p className="text-lg text-gray-400">
              {user ? `Interests: ${user.interests}` : "Interests: Football"}
            </p>
            <p className="text-lg text-gray-400">
              {user
                ? `Looking for: ${user.relation_type}`
                : "Looking for: Casual"}
            </p>
            <p className="text-lg text-gray-400">
              {user
                ? `Social habits: ${user.social_habits}`
                : "Social habits: Dunno"}
            </p>
            <p className="text-lg text-gray-400">
              {user ? `Expectations: ${user.exp_qual}` : "Expectations: Cook"}
            </p>
            <p className="text-lg text-gray-400">
              {user
                ? `Past relationships: ${user.past_relations}`
                : "Past relationships: No"}
            </p>
          </div>

          {/* Interactive Buttons */}
          <div className="flex justify-around  gap-6 flex-row h-1/5  items-center">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#22c55e" }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 w-1/2 h-3/5 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-all duration-300"
              onClick={onLike}
            >
              Like
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 w-1/2 h-3/5 text-white font-semibold px-8 py-3 rounded-lg  shadow-lg transform transition-all duration-300"
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
