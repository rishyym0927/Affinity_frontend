import { useContext, useEffect, useState } from "react";
import { ExtraContext } from "../../context/ExtraContext";
import { motion } from "framer-motion";
import { RUST_MAIN_URL } from "../../utils/constant";
import axios from "axios";


const UserChat = ({ chat, user }) => {
  const { onlineUsers } = useContext(ExtraContext);

  // Get the other user's information from the chat object
  const otherUser = chat?.otherUser;
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Check if the other user is online using their ID
  const isOnline = onlineUsers?.some(
    (onlineUser) => onlineUser?.userId === otherUser?.id
  );

  // Fallback values in case data is missing
  const displayName = otherUser
    ? `${otherUser.first_name} ${otherUser.last_name}`.trim() ||
      otherUser.username ||
      "Unknown User"
    : "Unknown User";

  const displayEmail = otherUser?.email || "No email provided";

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!otherUser?.id) return;

      try {
        const response = await axios.get(
          `${RUST_MAIN_URL}/user/getuseravatar?user_id=${otherUser.id}`
        );
        setAvatarUrl(response.data); // assuming it returns the avatar URL string
      } catch (error) {
        console.error("Failed to fetch avatar URL:", error);
        setAvatarUrl(null); // fallback in case of error
      }
    };

    fetchAvatar();
  }, [otherUser?.id]);

  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: "#1a1a1a" }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center p-4 justify-between rounded-lg transition-all h-auto max-h-32 md:max-h-40 w-full cursor-pointer"
    >
      <div className="flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mr-3"
        >
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover md:w-14 md:h-14"
            onError={(e) => {
              // Fallback to generated avatar if image fails to load
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName
              )}&background=ff0059&color=fff&size=56`;
            }}
          />
        </motion.div>
        <div className="text-content">
          <div className="text-white font-semibold text-lg md:text-xl uppercase truncate">
            {displayName}
          </div>
          <div className="text-gray-400 text-sm md:text-base truncate">
            {displayEmail}
          </div>
          {/* Optional: Show match status */}
          <div className="text-xs text-gray-500 mt-1">Match ID: {chat?.id}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {/* Real-time online status indicator */}
        <motion.span
          className={`${
            isOnline ? "bg-green-500" : "bg-gray-500"
          } w-3 h-3 rounded-full mt-2`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Optional: Show online/offline text */}
        <span
          className={`text-xs mt-1 ${
            isOnline ? "text-green-400" : "text-gray-500"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </motion.div>
  );
};

export default UserChat;
