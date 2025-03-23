import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, X, MessageCircle, Star } from "lucide-react";
import ProfileCard from "./ProfileCard";

const InfoCard = ({ user, onLike, onReject }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <div className="flex flex-row w-full h-full gap-10 bg-neutral-900 p-8 rounded-xl">
      <motion.div className="w-2/5 h-full"  initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(255, 0, 89, 0.1), 0 10px 10px -5px rgba(255, 0, 89, 0.04)",
          transition: { duration: 0.2 }
        }}>
        <ProfileCard user={user} />
      </motion.div>
      <motion.div
        className="bg-gradient-to-br from-neutral-800 to-neutral-900 h-full w-3/5 shadow-2xl overflow-auto rounded-xl overflow-hidden transform transition-all duration-500 border border-neutral-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(255, 0, 89, 0.1), 0 10px 10px -5px rgba(255, 0, 89, 0.04)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="p-8 flex flex-col justify-between h-full relative backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-zinc-800/5 to-transparent pointer-events-none"></div>
          
          <div>
            <motion.h2 
              className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0059] to-[#ff4d94] mb-2"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              {user ? `${user.first_name} ${user.last_name}` : "John Doe"}
            </motion.h2>
            <motion.div 
              className="flex items-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl text-white">
                {user ? `${user.age}` : "25"}
              </p>
              <span className="mx-2 text-[#ff0059] text-3xl">•</span>
              <p className="text-2xl text-gray-300">
                {user ? user.location : "New York, USA"}
              </p>
              <div className="ml-3 px-2 py-1 bg-[#ff0059]/10 rounded-full border border-[#ff0059]/20">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-[#ff0059] mr-2 animate-pulse"></div>
                  <span className="text-sm text-[#ff0059]">Online</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="space-y-5 text-neutral-200 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <AnimatedInfoItem 
              icon={<Star size={20} className="text-[#ff0059]" />}
              label="Personality" 
              value={user ? user.openness : "Introvert"} 
              delay={0.4}
              isExpanded={expandedSection === "personality"}
              onToggle={() => toggleSection("personality")}
              description="A brief insight into their character and temperament."
            />
            <AnimatedInfoItem 
              icon={<Heart size={20} className="text-[#ff0059]" />}
              label="Interests" 
              value={user ? user.interests : "Football"} 
              delay={0.5}
              isExpanded={expandedSection === "interests"}
              onToggle={() => toggleSection("interests")}
              description="Activities and topics they're passionate about."
            />
            <AnimatedInfoItem 
              icon={<MessageCircle size={20} className="text-[#ff0059]" />}
              label="Looking for" 
              value={user ? user.relation_type : "Casual"} 
              delay={0.6}
              isExpanded={expandedSection === "looking"}
              onToggle={() => toggleSection("looking")}
              description="The type of relationship they hope to find."
            />
            <AnimatedInfoItem 
              label="Social habits" 
              value={user ? user.social_habits : "Outgoing"} 
              delay={0.7}
              isExpanded={expandedSection === "social"}
              onToggle={() => toggleSection("social")}
              description="How they interact in social settings and gatherings."
            />
            <AnimatedInfoItem 
              label="Expectations" 
              value={user ? user.exp_qual : "Honesty"} 
              delay={0.8}
              isExpanded={expandedSection === "expectations"}
              onToggle={() => toggleSection("expectations")}
              description="What they value most in a potential match."
            />
            <AnimatedInfoItem 
              label="Past relationships" 
              value={user ? user.past_relations : "No"} 
              delay={0.9}
              isExpanded={expandedSection === "past"}
              onToggle={() => toggleSection("past")}
              description="Their previous relationship experience and history."
            />
          </div>
          
          <motion.div 
            className="flex justify-between gap-6 mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <EnhancedActionButton 
              onClick={onReject} 
              bgColor="bg-neutral-800" 
              hoverColor="bg-red-600" 
              icon={<X size={20} />}
              text="Pass" 
            />
            <EnhancedActionButton 
              onClick={onLike} 
              bgColor="bg-gradient-to-r from-[#ff0059] to-[#ff4d94]" 
              hoverColor="bg-gradient-to-r from-[#ff4d94] to-[#ff0059]" 
              icon={<Heart size={20} />}
              text="Match" 
              isPrimary={true}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const AnimatedInfoItem = ({ icon, label, value, delay, isExpanded, onToggle, description }) => (
  <motion.div
    className="bg-neutral-800/40 rounded-lg p-3 border border-neutral-700 hover:border-[#ff0059]/30 transition-all cursor-pointer"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay }}
    onClick={onToggle}
    whileHover={{ backgroundColor: "rgba(40, 40, 40, 0.6)" }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <p className="text-xl">
          <span className="font-semibold text-[#ff0059]">{label}:</span>{" "}
          <span className="text-white">{value}</span>
        </p>
      </div>
      <motion.div 
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-neutral-400"
      >
        ▼
      </motion.div>
    </div>
    
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: isExpanded ? "auto" : 0,
        opacity: isExpanded ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="mt-2 pt-2 border-t border-neutral-700 text-neutral-400">
        {description}
      </div>
    </motion.div>
  </motion.div>
);

const EnhancedActionButton = ({ onClick, bgColor, hoverColor, text, icon, isPrimary }) => (
  <motion.button
    whileHover={{ 
      scale: 1.05, 
      boxShadow: isPrimary ? "0 0 15px rgba(255, 0, 89, 0.5)" : "none" 
    }}
    whileTap={{ scale: 0.95 }}
    className={`${bgColor} w-1/2 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-all duration-300 text-xl flex items-center justify-center gap-2`}
    onClick={onClick}
  >
    {icon}
    {text}
  </motion.button>
);

export default InfoCard;