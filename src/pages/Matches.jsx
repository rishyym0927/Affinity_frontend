import React, { useContext } from 'react';
import ChatBox from '../components/chat/ChatBox';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import { ExtraContext } from '../context/ExtraContext';
import { motion } from 'framer-motion';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ExtraContext);

  const emptyStateVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sparkleVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: { 
      scale: [0, 1, 0], 
      rotate: [0, 180, 360], 
      transition: { duration: 2, repeat: Infinity, repeatType: "loop" } 
    },
  };

  return (
    <div className="container mx-auto p-4 h-full flex">
      {userChats?.length < 1 ? (
        <motion.div 
          className="w-full h-full flex items-center justify-center"
          variants={emptyStateVariants}
          initial="initial"
          animate="animate"
        >
          <div className="text-center">
            <motion.div
              className="text-[#ff0059] text-6xl mb-4 inline-block"
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
            >
              ✨
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-[#ff0059]">No Matches Yet</h2>
            <p className="text-xl text-gray-600 mb-6">
              Your perfect match is just around the corner! Keep exploring and connecting.
            </p>
            <motion.button
              className="bg-[#ff0059] text-white px-8 py-3 rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,0,89,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {/* Add navigation to explore page or similar */}}
            >
               Click me to feel good
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="flex w-full h-full gap-4">
          {/* Sidebar for user chats */}
          <motion.div
            className="w-2/5 h-full bg-neutral-900 rounded-lg p-4 space-y-3 overflow-y-auto shadow-2xl"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
          >
            {isUserChatsLoading && <p>Loading chats ...</p>}
            {userChats?.map((chat, index) => (
              <motion.div
                key={index}
                onClick={() => updateCurrentChat(chat)}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <UserChat chat={chat} user={user} />
              </motion.div>
            ))}
          </motion.div>
          {/* Main Chat Box */}
          <motion.div
            className="w-3/5 h-full rounded-lg shadow-2xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
          >
            <ChatBox />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Chat;