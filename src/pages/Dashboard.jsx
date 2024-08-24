import React, { useContext, useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MACHINE_CHATBOT_URL, RUST_BACKEND_URL_SCORE } from "../utils/constant";

const Dashboard = () => {
  const [boys, setBoys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {user} = useContext(AuthContext)
  useEffect(() => {
    const getBoys = async () => {
      try {
        const response = await axios.post(
          MACHINE_CHATBOT_URL
        ,{
          user_id: `${user.id}`,
        });
        console.log(response);
        setBoys(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBoys();
  }, []);

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const onLike = async () => {
    try {
      const response = await axios.post("http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/addfriend", {
        girl_email: user.email,
        boy_email: boys[currentIndex].email,
      });
  
      console.log(response);
  
      if (response.status === 202) {
        // Increment the current index if the response status is 202
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        // Handle unexpected response status
        console.error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      // Handle errors (network issues, server errors, etc.)
      console.error("Error adding friend:", error.message || error);
    }
  };

  const currentUser = boys[currentIndex];
  console.log("Current user:", currentUser)

  return (
    <div className="flex h-[95%]">
      <div className="flex items-center h-[100%] w-[100%] ">
        {currentIndex < boys.length ? (
          <InfoCard
            user={currentUser}
            onLike={onLike}
            onReject={handleNextUser}
          />
        ) : (
          <div className="text-center w-full">
            <h2 className="text-3xl font-semibold text-red-900">
              No more users found.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
