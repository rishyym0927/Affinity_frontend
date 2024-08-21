import React, { useRef, useEffect, useState, useContext } from "react";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { AIChatContext } from "../context/AIChatContext";

const ChatBox = () => {
  const scroll = useRef();

  const { messages } = useContext(AIChatContext);

  const {mUser, setMUser} = useContext(AIChatContext)
  const [userChatID, setUserChatID] = useState(null);
  const { setUserAIChatID, textMessage, setTextMessage, sendTextMessage } = useContext(AIChatContext);

  useEffect(() => {
    const registerUser = async () => {
      try {
        const storedUser = await JSON.parse(localStorage.getItem("User")); // Parse the stored user string

        if (storedUser && storedUser.user_name) {
          console.log(storedUser);

          const response = await axios.post("http://localhost:5000/api/users/register", {
            username: storedUser.user_name,
          });
          setMUser(response.data); // Store the user in state for future use

          console.log(response.data);
        } else {
          console.log("No user found in localStorage.");
        }
      } catch (error) {
        console.error("Error during user registration:", error);
      }
    };

    registerUser();
  }, []);

  // Second useEffect to handle chat creation when mUser is set
  useEffect(() => {
    const createChat = async () => {
      if (mUser) {
        try {
          const response2 = await axios.post("http://localhost:5000/api/chats/", {
            firstId: "66c5e5a825f42519a77afa5f",
            secondId: mUser._id,
          });
          console.log(response2.data);
          setUserChatID(response2.data._id); // Store the chat ID for future use
          setUserAIChatID(response2.data._id); // Store the AI chat ID for future use
        } catch (error) {
          console.error("Error during chat creation:", error);
        }
      }
    };

    createChat();
  }, [mUser]); // This effect runs whenever mUser changes

  useEffect(() => {
    const getChats = async () => {
      if (userChatID) {
        console.log("userChatID is available:", userChatID);

        try {
          // Get chat messages
          const response = await axios.get(`http://localhost:5000/api/messages/${userChatID}`);
          console.log("Chat messages response:", response.data);

          // Check if the messages array is empty
          if (response.data.length === 0) {
            console.log("No messages found, fetching AI message...");

            // Fetch a message from the AI API
            const aiResponse = await axios.post(`https://39c4-117-219-22-193.ngrok-free.app/chat`, {
              user_id: mUser._id,
            });
            console.log("AI response received:", aiResponse.data);

            const messageFromAI = aiResponse.data.response;

            // Send AI message to the chat
            const sendResponse = await axios.post(`http://localhost:5000/api/messages`, {
              chatId: userChatID,
              senderId: "66c5e5a825f42519a77afa5f",
              text: messageFromAI,
            });
            console.log("AI message sent successfully:", sendResponse.data);
          } else {
            console.log("Messages found, no AI response needed.");
          }
        } catch (e) {
          console.error("Error getting chat messages:", e);
        }
      } else {
        console.log("userChatID is not available.");
      }
    };

    getChats(); // Call the function
  }, [userChatID]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col justify-between bg-gray-900 rounded-lg h-full">
      <div className="flex justify-center items-center p-3 bg-gray-800 text-white">
        <strong>Username</strong>
      </div>
      <div className="flex flex-col gap-3 px-8 overflow-y-auto flex-grow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.senderId === 1 ? "self-end bg-teal-500" : "self-start bg-gray-700"
            } p-3 rounded-md max-w-[50%]`}
            ref={scroll}
          >
            <span>{message.text}</span>
            <span className="text-sm font-light text-right block">
              {moment(message.createdAt).calendar()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 p-4 bg-gray-800">
        <input
          type="text"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          className="w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
        />
        <button
          className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md"
          onClick={() => sendTextMessage(textMessage, setTextMessage)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;