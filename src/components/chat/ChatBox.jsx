import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ExtraContext } from "../../context/ExtraContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";

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

  console.log("current chatss", currentChat);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setAaa(user ? user.email : null);
    setBbb(currentChat ? currentChat.id : null);
    console.log("ds", aaa, bbb);
  }, [user, currentChat]);

  const handleSubmitForm = useCallback(() => {
    if (aaa && bbb && socket.connected) {
      socket.emit("room:join", { aaa, bbb });
    } else {
      alert("Unable to start video call. Please try again later.");
      console.log("Unable to join room: missing data or socket not connected");
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
    return isToday ? d.toLocaleTimeString() : d.toLocaleDateString();
  };

  if (!recipientUser) {
    return <p className="text-center w-full">No conversation found</p>;
  }

  if (isMessagesLoading) {
    return <p className="text-center w-full">Loading messages...</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-full bg-black rounded-lg shadow-lg text-white">
      <div className="flex flex-row items-center justify-between">
        <div className="font-bold text-lg">@{recipientUser?.user_name}</div>
        <button className="w-24 h-10 bg-yellow-400" onClick={handleSubmitForm}>
          VIDEO CALL
        </button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto flex-grow">
        {console.log(messages)}
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                message?.senderId == user.id ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-3 rounded-md max-w-[70%] break-words ${
                  message?.senderId == user.id ? "bg-[#ff0059]" : "bg-neutral-700"
                }`}
                ref={index === messages.length - 1 ? scroll : null}
              >
                <p>{message.text}</p>
                <span className="block text-xs mt-1 text-gray-400">
                  {formatTime(message.createdAt)}
                </span>
              </div>
            </div>
          ))}
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <input
          type="text"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          className="bg-[#ff0059] hover:bg-red-500 text-white p-3 rounded-md whitespace-nowrap"
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