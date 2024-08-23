import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ExtraContext } from "../../context/ExtraContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";




const ChatBox = () => {
  const { user } = useContext(AuthContext);
  
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =   useContext(ExtraContext);
  console.log("chat box current chat", currentChat);
  const { recipientUser } = useFetchRecipient(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();
  console.log("recpient user", recipientUser, currentChat, user)

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    return isToday ? d.toLocaleTimeString() : d.toLocaleDateString();
  };

  if (!recipientUser) {
    return (
      <p className="text-center w-full">No conversation found</p>
    );
  }

  if (isMessagesLoading) {
    return (
      <p className="text-center w-full">Loading messages...</p>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-neutral-800 rounded-lg shadow-lg text-white">
      <div className="font-bold text-lg">{recipientUser?.user_name}</div>
      <div className="flex flex-col gap-3 overflow-auto h-64">
        {
        
        messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message?.senderId == user.id
                  ? "self-end bg-blue-600 p-2 rounded-lg"
                  : "self-start bg-gray-700 p-2 rounded-lg"
              }`}
              ref={scroll}
            >
              {/* {console.log("messi",message, user)} */}
              <span>{message.text}</span>
              <span className="block text-xs mt-1 text-gray-400">
                {formatTime(message.createdAt)}
              </span>
            </div>
          ))}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat.id, setTextMessage)
          }
        >
          Send
        </button>

      </div>
    </div>
  );
};

export default ChatBox;
