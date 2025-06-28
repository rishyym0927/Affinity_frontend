/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import {
  chatBaseURL,
  getRequest,
  postRequest,
  RUST_MAIN_URL,
} from "../utils/constant.js";
import { io } from "socket.io-client";
import axios from "axios";
import clickSound from "../assets/button1.mp3"; // Add this sound file to your assets
import { sampleData5 } from "../../sampleData.js";

export const ExtraContext = createContext();

export const ExtraContextProvider = ({ children, user }) => {
  const [score, setScore] = useState(null);
  const audioRef = useRef(new Audio(clickSound));
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  //to read messages of selected users only
  const [currentChat, setCurrentChat] = useState(null);
  //to read messages of selected users only
  // console.log("selected userssss", currentChat);
  // console.log("selected user", user);

  const updateCurrentChat = useCallback((chat) => {
    audioRef.current.play();
    console.log("update current chat");
    setCurrentChat(chat);
  }, []);

  // Helper function to fetch user details by ID
  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(
        `${RUST_MAIN_URL}/user/getuser?id=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const getUserChats = async () => {
      try {
        setIsUserChatsLoading(true);
        if (user.id) {
          let response = await axios.post(
            `${RUST_MAIN_URL}/matchmaking/getAcceptedMatched`,
            {
              id: user.id,
            },
            {
              withCredentials: true,
            }
          );

          if (response.status !== 200) {
            throw new Error("Error occurred while fetching user chats");
          }

          const matches = response.data;

          // Transform matches to chat format with user details
          const chatsWithUserDetails = await Promise.all(
            matches.map(async (match) => {
              // Determine which user is the "other" user (not the current user)
              const otherUserId =
                match.male_id === user.id ? match.female_id : match.male_id;
              const currentUserId = user.id;

              // Fetch details for the other user
              const otherUser = await fetchUserById(otherUserId);
              const currentUserDetails = await fetchUserById(currentUserId);

              if (!otherUser || !currentUserDetails) {
                console.warn(
                  `Could not fetch user details for match ID ${match.id}`
                );
                return null;
              }

              // Create a chat object structure compatible with existing code
              return {
                id: match.id, // Use match ID as chat ID
                matchId: match.id,
                status: match.status,
                male_id: match.male_id,
                female_id: match.female_id,
                // For backward compatibility with existing code that uses email IDs
                boy_email_id:
                  currentUserDetails.gender === "Male"
                    ? currentUserDetails.email
                    : otherUser.email,
                girl_email_id:
                  currentUserDetails.gender === "Female"
                    ? currentUserDetails.email
                    : otherUser.email,
                // Additional user details for easier access
                otherUser: otherUser,
                currentUser: currentUserDetails,
                // Determine recipient info based on current user
                recipientId: otherUserId,
                recipientEmail: otherUser.email,
                recipientName: `${otherUser.first_name} ${otherUser.last_name}`,
                recipientUsername: otherUser.username,
                created_at: match.created_at,
              };
            })
          );

          // Filter out any null values (failed user fetches)
          const validChats = chatsWithUserDetails.filter(
            (chat) => chat !== null
          );

          setUserChats(validChats);
        }
      } catch (error) {
        console.log("Error fetching user chats:", error.message);
        //only for development and sample purposes only
        setUserChats(sampleData5);
        setUserChatsError(error);
      } finally {
        setIsUserChatsLoading(false);
      }
    };

    getUserChats(); // Call the async function inside useEffect
  }, [user]); // Adding user as a dependency

  // const createChat = useCallback(async (firstId, secondId) => {
  //   const response = await postRequest(
  //     `${chatBaseURL}/chats`,
  //     JSON.stringify({
  //       firstId,
  //       secondId,
  //     })
  //   );
  //   if (response.error) {
  //     console.log("Error creating chat", response.error);
  //     return;
  //   }
  //   // Add the new chat to the user's chats list
  //   setUserChats((prev) => [...prev, response]);
  // }, []);

  //now for messages
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(null);
  const [messagesError, setMessagesError] = useState(null);

  // console.log("Messages", messages, currentChat);
  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(false);
      const response = await getRequest(
        `${chatBaseURL}/messages/${currentChat?.id}`
      );
      // console.log(response);
      setIsMessagesLoading(false);
      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };

    if (currentChat?.id) {
      getMessages(); // Call the async function inside useEffect
    }
  }, [currentChat]);

  //sending meesage
  const [newMessage, setNewMessage] = useState(null);
  const [sendtextmessageError, setSendTextMessageError] = useState(null);
  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) {
        return console.log("send a message");
      }
      const response = await postRequest(
        `${chatBaseURL}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender.id,
          text: textMessage,
        })
      );
      // console.log("mesasage resp", response);
      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);
      setTextMessage("");
      setMessages((prev) => [...prev, response]);
    },
    []
  );

  //socket
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // console.log("online Users", onlineUsers);
  useEffect(() => {
    const newSocket = io(
      "http://ec2-3-111-34-89.ap-south-1.compute.amazonaws.com:1497"
    );
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  //add online users
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?.id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);

  // Simplified socket message sending using the new chat structure
  useEffect(() => {
    if (!socket || !currentChat || !newMessage) return;

    // Use the recipientId from the chat object
    const recipientId = currentChat.recipientId;

    if (recipientId) {
      console.log("Sending message to recipient ID:", recipientId);
      socket.emit("sendMessage", {
        ...newMessage,
        recipientId: recipientId,
      });
    }
  }, [newMessage, socket, currentChat]);

  //getmessage
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      // console.log("Received message", currentChat, res)
      if (currentChat?.id !== res.chatId) {
        setMessages((prev) => [...prev, res]);
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  const [contestId, setContestId] = useState(null);

  return (
    <ExtraContext.Provider
      value={{
        score,
        setScore,
        userChats,
        setUserChats,
        isUserChatsLoading,
        setIsUserChatsLoading,
        userChatsError,
        setUserChatsError,
        updateCurrentChat,
        currentChat,
        sendTextMessage,
        messages,
        isMessagesLoading,
        setIsMessagesLoading,
        messagesError,
        setMessagesError,
        newMessage,
        onlineUsers,
        setContestId,
        contestId,
      }}
    >
      {children}
    </ExtraContext.Provider>
  );
};
