import React, { useContext, useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MACHINE_CHATBOT_URL, RUST_MAIN_URL } from "../utils/constant";
import { RiseLoader } from "react-spinners";

const Dashboard = () => {
  const [boys, setBoys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id) {
      const getBoys = async () => {
        setIsLoading(true);  // Start loading
        try {
          const response = await axios.post(MACHINE_CHATBOT_URL, {
            user_id: `${user.id}`,
          });
          console.log(response);
          setBoys(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);  // Stop loading
        }
      };
      getBoys();
    }
  }, [user?.id]); // Adding user.id as a dependency

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

  return (
    <div className="flex h-[95%]">
      <div className="flex items-center h-[100%] w-[100%]">
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
