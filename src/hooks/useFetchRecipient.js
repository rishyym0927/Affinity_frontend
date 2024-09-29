import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { RUST_MAIN_URL } from "../utils/constant.js";

export const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
  console.log(chat, "dsfgds")
  useEffect(() => {
    // Determine recipient ID based on user's email inside the useEffect
    const recipientId =
      chat?.boy_email_id === user?.email
        ? chat?.girl_email_id
        : chat?.boy_email_id;

    // Early return if recipientId is not available
    if (!recipientId) return;

    const getUser = async () => {
      try {
        const response = await axios.post(`${RUST_MAIN_URL}getuser`, {
          email: recipientId
        });

        setRecipientUser(response.data); // Assuming response.data contains the user data
      } catch (err) {
        setError(err.message || "Error fetching recipient user");
        //for dev only
        setRecipientUser(chat); // Handle the error properly
      }
    };

    getUser(); // Call the function
  }, [chat, user]); // Add chat and user to the dependency array

  return { recipientUser, error }; // Return both recipientUser and error
};
