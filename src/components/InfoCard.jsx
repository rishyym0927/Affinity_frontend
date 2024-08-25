import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";

const InfoCard = ({ user, onLike, onReject }) => {
  return (
    <div className="flex flex-row w-full h-full gap-10 bg-neutral-900 p-8 rounded-xl">
      <div className="w-2/5 h-full">
        <ProfileCard user={user} />
      </div>
      <motion.div
        className="bg-neutral-800 h-full w-3/5 shadow-2xl overflow-auto rounded-xl overflow-hidden transform transition-all duration-500"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.05,
          rotate: [0, 1, -1, 1, -1, 0],
          transition: { duration: 0.5 }
        }}
      >
        <div className="p-8 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-6xl font-extrabold text-[#ff0059] mb-2">
              {user ? `${user.first_name} ${user.last_name}` : "John Doe"}
            </h2>
            <p className="text-3xl text-white mb-4">
              {user ? `${user.age} • ${user.location}` : "25 • New York, USA"}
            </p>
          </div>
         
          <div className="space-y-4 text-neutral-300">
            <InfoItem label="Personality" value={user ? user.openness : "Introvert"} />
            <InfoItem label="Interests" value={user ? user.interests : "Football"} />
            <InfoItem label="Looking for" value={user ? user.relation_type : "Casual"} />
            <InfoItem label="Social habits" value={user ? user.social_habits : "Outgoing"} />
            <InfoItem label="Expectations" value={user ? user.exp_qual : "Honesty"} />
            <InfoItem label="Past relationships" value={user ? user.past_relations : "No"} />
          </div>
          <div className="flex justify-between gap-6 mt-8">
            <ActionButton onClick={onReject} bgColor="bg-neutral-700" hoverColor="bg-red-600" text="Reject" />
            <ActionButton onClick={onLike} bgColor="bg-[#ff0059]" hoverColor="bg-yellow-500" text="Accept" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <p className="text-xl">
    <span className="font-semibold text-yellow-500">{label}:</span> {value}
  </p>
);

const ActionButton = ({ onClick, bgColor, hoverColor, text }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: hoverColor }}
    whileTap={{ scale: 0.95 }}
    className={`${bgColor} w-1/2 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-all duration-300 text-xl`}
    onClick={onClick}
  >
    {text}
  </motion.button>
);

export default InfoCard;