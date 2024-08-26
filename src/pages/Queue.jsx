import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { RUST_MAIN_URL } from "../utils/constant";
import { RiseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Queue = () => {
  const { user } = useContext(AuthContext);
  const [acceptedReq, setAcceptedReq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBoy, setSelectedBoy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedBoys = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${RUST_MAIN_URL}getacceptedboys`, {
          email: user.email,
        });
        console.log("Accepted", response);
        if (Array.isArray(response.data)) {
          setAcceptedReq(response.data);
        } else {
          setError("Unexpected data format. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching accepted boys:", err);
        setError("Failed to fetch accepted boys. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcceptedBoys();
  }, [user.email]);

  const onAccept = (boy) => {
    setSelectedBoy(boy);
    setShowConfirmModal(true);
    console.log("aa", boy);
  };

  const confirmAccept = async () => {
    try {
      const response = await axios.post(`${RUST_MAIN_URL}creatematch`, {
        boy_email: selectedBoy.boy_email_id,
        girl_email: user.email,
      });
      if (response.status === 200) {
        console.log("Successfully accepted", response);
        navigate('/matches');
      }
    } catch (error) {
      console.error("Error creating match:", error);
      setError("Failed to create match. Please try again.");
    }
    setShowConfirmModal(false);
  };

  const emptyStateVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cupidVariants = {
    initial: { scale: 0, rotate: -45 },
    animate: { 
      scale: [0, 1.2, 1], 
      rotate: [-45, 0, -45], 
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } 
    },
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-screen flex items-center justify-center bg-neutral-900"
      >
        <RiseLoader size={20} color="#ff0059" />
      </motion.div>
    );
  }

  if (error) return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full h-screen flex items-center justify-center bg-neutral-900"
    >
      <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
        {error}
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 bg-neutral-900 rounded-xl shadow-lg text-white"
    >
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold mb-6 text-[#ff0059]"
      >
        Queue
      </motion.h2>
      <AnimatePresence>
        {acceptedReq && acceptedReq.length > 0 ? (
          <motion.ul className="space-y-4">
            {acceptedReq.map((boy, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
                    onClick={() => onAccept(boy)}
                  />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            variants={emptyStateVariants}
            initial="initial"
            animate="animate"
            className="text-center py-20"
          >
            <motion.div
              className="text-[#ff0059] text-6xl mb-4 inline-block"
              variants={cupidVariants}
              initial="initial"
              animate="animate"
            >
              💘
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 text-[#ff0059]">Your Queue is Empty</h3>
            <p className="text-xl text-gray-400 mb-6">
              Cupid is still working his magic! Keep exploring and you might find your perfect match soon.
            </p>
            <motion.button
              className="bg-[#ff0059] text-white px-8 py-3 rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,0,89,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
            >
              Explore More Matches
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showConfirmModal && (
          <ConfirmModal 
            onConfirm={confirmAccept} 
            onCancel={() => setShowConfirmModal(false)}
            boyEmail={selectedBoy?.boy_email_id}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ActionButton = ({ onClick, bgColor, hoverColor, text }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`${bgColor} text-white font-semibold px-6 py-2 rounded-lg shadow-md transform transition-all duration-300`}
    onClick={onClick}
  >
    {text}
  </motion.button>
);

const ConfirmModal = ({ onConfirm, onCancel, boyEmail }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-neutral-800 p-6 rounded-lg shadow-xl"
    >
      <h3 className="text-xl font-bold mb-4 text-white">Confirm Match</h3>
      <p className="mb-6 text-gray-300">Are you sure you want to match with {boyEmail}?</p>
      <div className="flex justify-end space-x-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel} 
          className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
        >
          Cancel
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConfirm} 
          className="px-4 py-2 bg-[#ff0059] text-white rounded-md hover:bg-[#ff3379] transition-colors"
        >
          Confirm
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

export default Queue;