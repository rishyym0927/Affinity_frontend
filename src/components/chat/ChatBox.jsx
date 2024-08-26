import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ExtraContext } from "../../context/ExtraContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { motion, AnimatePresence } from "framer-motion";

// Import sound effect
import messageSound from "../../assets/message-sent.mp3";
import moment from "moment";
import { AI_CHATBOT_URL, AI_MAIN_URL } from "../../utils/constant";
import axios from "axios";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ExtraContext);
  const { recipientUser } = useFetchRecipient(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const [aaa, setAaa] = useState(null);
  const [bbb, setBbb] = useState(null);
  const scroll = useRef();
  const navigate = useNavigate();
  const socket = useSocket();
  const audioRef = useRef(new Audio(messageSound));

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setAaa(user ? user.email : null);
    setBbb(currentChat ? currentChat.id : null);
  }, [user, currentChat]);

  const handleSubmitForm = useCallback(() => {
    if (aaa && bbb && socket.connected) {
      socket.emit("room:join", { aaa, bbb });
    } else {
      alert("Unable to start video call. Please try again later.");
    }
  }, [aaa, bbb, socket]);

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${bbb}`);
    },
    [navigate, bbb]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    return isToday ? d.toLocaleTimeString() : `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  };

  const handleSendMessage = () => {
    if (textMessage.trim()) {
      sendTextMessage(textMessage, user, currentChat.id, setTextMessage);
      audioRef.current.play();
    }
  };

  // useEffect(() => {
  //   console.log("Total MESSAGES", messages);
  
  //   if (messages.length > 50 && messages) {
  //     console.log("score reached");
      
  //     const getCompScore = async () => {
  //       try {
  //         const response = await axios.post(`${AI_MAIN_URL}calc`, {
  //           data: messages
  //         });
  //         console.log("Comp score response:", response.data);
  //         // Handle the response here
  //       } catch (error) {
  //         console.error("Error calculating comp score:", error);
  //         // Handle the error here
  //       }
  //     };
  
  //     getCompScore();
  //   }
  // }, [messages]);

  if (!recipientUser) {
    return <p className="text-center w-full">No conversation found</p>;
  }

  if (isMessagesLoading) {
    return <p className="text-center w-full">Loading messages...</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-full bg-neutral-900 rounded-lg shadow-lg text-white">
      <div className="flex flex-row items-center justify-between bg-neutral-800 p-3 rounded-lg">
        <div className="font-bold text-lg">@{recipientUser?.user_name}</div>
        <button
          className="w-32 h-10 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-md transition-all shadow-md"
          onClick={handleSubmitForm}
        >
          Video Call
        </button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto flex-grow">
        <AnimatePresence>
          {messages &&
            messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${
                  message?.senderId == user.id ? "items-end" : "items-start"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                ref={index == messages.length - 1 ? scroll : null}
              >
                <div
                  className={`p-3 rounded-md max-w-[70%] break-words shadow-md ${
                    message?.senderId == user.id ? "bg-[#ff0059]" : "bg-neutral-700"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="block text-xs mt-1 text-white">
                    {moment(message.createdAt).calendar()}
                  </span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <input
          type="text"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-[#ff0059] transition-all"
          placeholder="Type a message..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#ff0059] hover:bg-pink-600 text-white p-3 rounded-md transition-all shadow-md"
          onClick={handleSendMessage}
        >
          Send
        </motion.button>
      </div>
    </div>
  );
};

export default ChatBox;