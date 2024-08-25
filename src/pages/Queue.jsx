import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { RUST_MAIN_URL } from '../utils/constant';
import { RiseLoader } from 'react-spinners';

const Queue = () => {
  const { user } = useContext(AuthContext);
  const [acceptedReq, setAcceptedReq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedBoys = async () => {
      setIsLoading(true);  // Start loading
      try {
        const response = await axios.post(`${RUST_MAIN_URL}getacceptedboys`, {
          email: user.email
        });
        
        console.log("Response data:", response.data); // Log the entire response
        if (Array.isArray(response.data)) {
          setAcceptedReq(response.data);
        } else {
          setError("Unexpected data format. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching accepted boys:", err);
        setError("Failed to fetch accepted boys. Please try again later.");
      } finally {
        setIsLoading(false);  // Stop loading
      }
    };

    fetchAcceptedBoys();
  }, [user.email]);

  console.log(acceptedReq, "Accepted Boys");

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <RiseLoader size={20} color="#ff0059" />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 bg-neutral-900 rounded-xl shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-6 text-[#ff0059]">Queue</h2>
      {acceptedReq && acceptedReq.length > 0 ? (
        <ul className="space-y-4">
          {acceptedReq.map((boy, index) => (
            <li
              key={index}
              className="bg-neutral-800 p-4 rounded-lg flex justify-between items-center shadow-lg"
            >
              <div className="text-xl font-semibold">
                <span>{boy.boy_email_id || "Unknown"}</span>
                <span className="ml-4 text-yellow-500">
                  Score: {boy.contest_score || "N/A"}
                </span>
              </div>
              <div className="flex gap-4">
                <ActionButton
                  text="Accept"
                  bgColor="bg-[#ff0059]"
                  hoverColor="bg-yellow-500"
                  onClick={() => onAccept(boy.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accepted requests found.</p>
      )}
    </div>
  );
};

const ActionButton = ({ onClick, bgColor, hoverColor, text }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: hoverColor }}
    whileTap={{ scale: 0.95 }}
    className={`${bgColor} text-white font-semibold px-6 py-2 rounded-lg shadow-md transform transition-all duration-300`}
    onClick={onClick}
  >
    {text}
  </motion.button>
);

export default Queue;
