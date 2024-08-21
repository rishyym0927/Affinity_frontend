import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AIChatContext = createContext();

export const AIChatContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Ensure this is correct in your app
  const [userAIChatID, setUserAIChatID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesError, setMessagesError] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [mUser, setMUser] = useState(null);
  const [textMessage, setTextMessage] = useState("");
  const [sendTextMessageError, setSendTextMessageError] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      if (!userAIChatID) return;

      setIsMessagesLoading(true);
      setMessagesError(null);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/${userAIChatID}`
        );

        if (response.data) {
          setMessages(response.data);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessagesError(error);
      } finally {
        setIsMessagesLoading(false);
      }
    };

    getMessages();
  }, [userAIChatID]);

  const sendTextMessage = useCallback(async (message) => {
    if (!message || !userAIChatID || !mUser) {
      console.log("Cannot send message");
      return;
    }

    try {
        console.log("sender id", mUser._id)
      const userMessageResponse = await axios.post(
        `http://localhost:5000/api/messages`,
        {
          chatId: userAIChatID,
          senderId: mUser._id,
          text: message,
        }
      );

      setMessages(prev => [...prev, userMessageResponse.data]);

      const aiResponse = await axios.post(
        `https://39c4-117-219-22-193.ngrok-free.app/chat`,
        {
          user_id: mUser.id,
          message,
        }
      );
      console.log(aiResponse)

      const aiMessageResponse = await axios.post(
        `http://localhost:5000/api/messages`,
        {
          chatId: userAIChatID,
          senderId: "66c5e5a825f42519a77afa5f",
          text: aiResponse.data.response,
        }
      );


      setMessages(prev => [...prev, aiResponse.data]);
      setTextMessage("");
    } catch (error) {
      setSendTextMessageError(error.message);
      console.error("Error sending message:", error.message);
    }
  }, [userAIChatID, mUser]);

  return (
    <AIChatContext.Provider
      value={{
        mUser,
        setMUser,
        userAIChatID,
        setUserAIChatID,
        messages,
        setMessages,
        isMessagesLoading,
        messagesError,
        textMessage,
        setTextMessage,
        sendTextMessage,
        sendTextMessageError
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
};
