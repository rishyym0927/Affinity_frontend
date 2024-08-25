import React, { useContext } from 'react';
import ChatBox from '../components/chat/ChatBox';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import { ExtraContext } from '../context/ExtraContext';
import { motion } from 'framer-motion';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ExtraContext);

  return (
    <div className="container mx-auto p-4 h-full flex">
      {userChats?.length < 1 ? null : (
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
            className="w-3/5 h-full  rounded-lg shadow-2xl"
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