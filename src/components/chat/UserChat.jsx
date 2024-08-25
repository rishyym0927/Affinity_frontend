import React, { useContext } from 'react';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import { ExtraContext } from '../../context/ExtraContext';
import { motion } from 'framer-motion';

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers } = useContext(ExtraContext);
  
  // Check if the recipient user is online
  const isOnline = onlineUsers?.some((onlineUser) => onlineUser?.userId === recipientUser?._id);

  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: '#1a1a1a' }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center p-4 justify-between  rounded-lg transition-all h-auto max-h-32 md:max-h-40 w-full cursor-pointer"
    >
      <div className="flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mr-3"
        >
          <img
            src={recipientUser?.image_url}
            alt=""
            className="w-12 h-12 rounded-full object-cover md:w-14 md:h-14"
          />
        </motion.div>
        <div className="text-content">
          <div className="text-white font-semibold text-lg md:text-xl uppercase truncate">
            {recipientUser?.user_name || 'Unknown User'}
          </div>
          <div className="text-gray-400 text-sm md:text-base">
            {recipientUser?.email || 'No email provided'}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        {/* Real-time online status indicator */}
        <motion.span
          className={`${
            isOnline ? 'bg-green-500' : 'bg-gray-500'
          } w-3 h-3 rounded-full mt-2`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        ></motion.span>
      </div>
    </motion.div>
  );
};

export default UserChat;
