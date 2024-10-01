import { useEffect, useState } from "react";
import axios from "axios";
import { RUST_MAIN_URL } from "../utils/constant.js";

export const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Determine recipient email based on the user's email
    const recipientEmail = chat?.boy_email_id === user?.email
      ? chat?.girl_email_id
      : chat?.boy_email_id;

    // Early return if recipientEmail is not available
    if (!recipientEmail) return;

    const fetchRecipientUser = async () => {
      try {
        const response = await axios.post(`${RUST_MAIN_URL}getuser`, {
          email: recipientEmail,
        });

        setRecipientUser(response.data); // Assuming response.data contains the user data
      } catch (err) {
        // Handle error and log for development
        setError(err.message || "Error fetching recipient user");
        console.error("Error fetching recipient user:", err);
        setRecipientUser(null); // Clear previous recipient data on error
      }
    };

    fetchRecipientUser(); // Call the function
  }, [chat, user]); // Add chat and user to the dependency array

  return { recipientUser, error }; // Return both recipientUser and error
};
