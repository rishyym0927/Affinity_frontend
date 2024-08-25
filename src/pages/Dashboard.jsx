import React, { useContext, useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MACHINE_CHATBOT_URL, RUST_MAIN_URL } from "../utils/constant";
import { RiseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [boys, setBoys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id) {
      const getBoys = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post(MACHINE_CHATBOT_URL, {
            user_id: `${user.id}`,
          });
          console.log(response);
          setBoys(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      getBoys();
    }
  }, [user?.id]);

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const onReject = async () => {
    try {
      if (boys[currentIndex]) {
        const response = await axios.post(
          `${RUST_MAIN_URL}reject`,
          {
            boy_email: boys[currentIndex].email,
            girl_email: user.email,
          }
        );
        console.log("response on reject", response);
        if (response.status === 200) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error adding friend:", error.message || error);
    }
  };

  const onLike = async () => {
    try {
      if (boys[currentIndex]) {
        const response = await axios.post(
          `${RUST_MAIN_URL}addfriend`,
          {
            girl_email: user.email,
            boy_email: boys[currentIndex].email,
          }
        );
        console.log(response);
        if (response.status === 202) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error adding friend:", error.message || error);
    }
  };

  const currentUser = boys[currentIndex];

  const emptyStateVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const heartVariants = {
    initial: { scale: 0 },
    animate: { scale: [0, 1.2, 1], transition: { duration: 1, repeat: Infinity, repeatType: "reverse" } },
  };

  return (
    <div className="flex h-[95%]">
      <div className="flex items-center justify-center h-[100%] w-[100%]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <RiseLoader size={20} color="#ff0059" />
          </div>
        ) : currentIndex < boys.length ? (
          <InfoCard
            user={currentUser}
            onLike={onLike}
            onReject={onReject}
          />
        ) : (
          <motion.div 
            className="text-center"
            variants={emptyStateVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="text-[#ff0059] text-6xl mb-4"
              variants={heartVariants}
              initial="initial"
              animate="animate"
            >
              ❤️
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 text-[#ff0059]">No More Profiles to Show</h2>
            <p className="text-gray-600 mb-6">You've seen all available profiles. Check back later for new matches!</p>
            <motion.button
              className="bg-[#ff0059] text-white px-8 py-3 rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,0,89,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {useNavigate('/dashboard')}}
            >
              Explore More
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;