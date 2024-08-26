import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { chatBaseURL, RUST_MAIN_URL } from "../utils/constant";

export const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  // Determine recipient ID based on user's email
  const recipientId =
    chat?.boy_email_id === user?.email
      ? chat?.girl_email_id
      : chat?.boy_email_id;

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return; // Early return if no recipientId

      try {
        const response = await axios.post(`${RUST_MAIN_URL}getuser`,{
          email: recipientId
        });
     
        setRecipientUser(response.data); // Assuming response.data contains the user data
        // console.log("Fetched recipient user:", response.data);
      } catch (err) {
        setError(err.message || "Error fetching recipient user"); // Handle the error properly
      }
    };

    getUser();
  }, [recipientId]); // Dependency array includes recipientId

  return { recipientUser, error }; // Return both recipientUser and error
};
