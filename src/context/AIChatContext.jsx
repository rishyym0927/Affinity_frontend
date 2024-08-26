import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { AI_CHATBOT_URL, RUST_BACKEND_URL_SCORE, RUST_MAIN_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import messageSound from "../assets/message-sent.mp3";
export const AIChatContext = createContext();

export const AIChatContextProvider = ({ children }) => {
  const audioRef = useRef(new Audio(messageSound));
  const { user } = useContext(AuthContext); // Ensure this is correct in your app
  const [userAIChatID, setUserAIChatID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesError, setMessagesError] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [mUser, setMUser] = useState(null);
  const [textMessage, setTextMessage] = useState("");
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const getMessages = async () => {
      if (!userAIChatID) return;

      setIsMessagesLoading(true);
      setMessagesError(null);

      try {
        const response = await axios.get(
          `http://ec2-13-233-131-217.ap-south-1.compute.amazonaws.com:5000/api/messages/${userAIChatID}`
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
  
  const [score, setScore]= useState(null)
  const sendTextMessage = useCallback(async (message) => {
    if (!message || !userAIChatID || !mUser) {
      console.log("Cannot send message");
      return;
    }
  
    try {
      // console.log("Sender ID:", mUser._id);
  
      // Send the user's message to your server
      const userMessageResponse = await axios.post(
        `http://ec2-13-233-131-217.ap-south-1.compute.amazonaws.com:5000/api/messages`,
        {
          chatId: userAIChatID,
          senderId: mUser._id,
          text: message,
        }
      );
  
      // Add the user's message to the messages state
      setMessages(prev => [...prev, userMessageResponse.data]);
      audioRef.current.play();
      // Construct the request payload for the AI chat URL
      const aiRequestPayload = {
        user_id: mUser._id, // Replace with actual user ID if needed
        message: message
      };
  
      // Send the request to the AI chat service
      const aiResponse = await axios.post(AI_CHATBOT_URL, aiRequestPayload);
      
      console.log("AI Response:", aiResponse.data.compatibility);
      if (aiResponse.data.compatibility !== undefined) {
        try {
          // Update the database
          const response = await axios.put(`${RUST_MAIN_URL}updatescore`, {
            email: user.email,
            score: Math.floor(Number(aiResponse.data.compatibility*100)),
          });
      
          // console.log("Response from backend:", response);
      
          // Set the score state
          setScore(aiResponse.data.compatibility);
      
          // Log the updated score
          // console.log("Score changed:", aiResponse.data.compatibility);
      
          if (response.status === 202) {
            console.log("Score Updated");
            toast.success("Score updated successfully",{
            
                theme: "dark",
                position: "top-right",
                autoClose: 1500,
              
            })
            if(user?.gender ==="Female"){
              navigate("/dashboard")
            }
            else {navigate("/request")}; // Redirect to dashboard after score update
          }
        } catch (error) {
          console.error("Error updating score:", error);
          // Handle the error, e.g., show an error message to the user
        }
      }
      // Store the AI's response as a message in your server
      const aiMessageResponse = await axios.post(
        `http://ec2-13-233-131-217.ap-south-1.compute.amazonaws.com:5000/api/messages`,
        {
          chatId: userAIChatID,
          senderId: "66c5e5a825f42519a77afa5f", // AI Bot ID
          text: aiResponse.data.response, // Use the response text from AI
        }
      );
  
      // Add the AI's message to the messages state
      setMessages(prev => [...prev, aiMessageResponse.data]);
  
      // Clear the input field after the message is sent
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
