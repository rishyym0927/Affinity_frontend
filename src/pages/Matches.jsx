import { useContext } from "react";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import { ExtraContext } from "../context/ExtraContext";
import { motion } from "framer-motion";
import ChatBox2 from "../components/chat/ChatBox2";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, userChatsError } =
    useContext(ExtraContext);

  const emptyStateVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sparkleVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: { duration: 2, repeat: Infinity, repeatType: "loop" },
    },
  };

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  };

  // Show loading state while fetching chats
  if (isUserChatsLoading) {
    return (
      <motion.div
        className="container mx-auto p-4 h-full flex items-center justify-center"
        variants={loadingVariants}
        initial="initial"
        animate="animate"
      >
        <div className="text-center">
          <motion.div
            className="text-[#ff0059] text-4xl mb-4 inline-block"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⏳
          </motion.div>
          <h2 className="text-2xl font-semibold text-[#ff0059] mb-2">
            Loading Your Matches
          </h2>
          <p className="text-gray-600">Finding your conversations...</p>
        </div>
      </motion.div>
    );
  }

  // Show error state if there's an error and no fallback data
  if (userChatsError && (!userChats || userChats.length === 0)) {
    return (
      <motion.div
        className="container mx-auto p-4 h-full flex items-center justify-center"
        variants={emptyStateVariants}
        initial="initial"
        animate="animate"
      >
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-red-500 mb-2">
            Unable to Load Chats
          </h2>
          <p className="text-gray-600 mb-4">
            There was an issue loading your conversations.
          </p>
          <motion.button
            className="bg-[#ff0059] text-white px-6 py-2 rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4 h-full flex">
      {!userChats || userChats.length < 1 ? (
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
            <h2 className="text-3xl font-bold mb-4 text-[#ff0059]">
              No Matches Yet
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Your perfect match is just around the corner! Keep exploring and
              connecting.
            </p>
            <motion.button
              className="bg-[#ff0059] text-white px-8 py-3 rounded-full font-semibold text-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(255,0,89,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                /* Add navigation to explore page or similar */
              }}
            >
              Start Exploring
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
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
          >
            <div className="mb-4">
              <h3 className="text-white text-lg font-semibold mb-2">
                Your Matches
              </h3>
              <p className="text-gray-400 text-sm">
                {userChats.length} conversation
                {userChats.length !== 1 ? "s" : ""}
              </p>
            </div>

            {userChats.map((chat, index) => {
              // Ensure chat has required properties
              if (!chat || !chat.id) {
                console.warn("Invalid chat object at index", index, chat);
                return null;
              }

              return (
                <motion.div
                  key={chat.id} // Use chat.id instead of index for better React performance
                  onClick={() => updateCurrentChat(chat)}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="cursor-pointer"
                >
                  <UserChat chat={chat} user={user} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Chat Box */}
          <motion.div
            className="w-3/5 h-full rounded-lg shadow-2xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
          >
            <ChatBox2 />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Chat;
