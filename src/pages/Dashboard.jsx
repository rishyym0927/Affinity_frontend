import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import axios from "axios";

const Dashboard = () => {
  const [boys, setBoys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getBoys = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/getboys"
        );
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

  const currentUser = boys[currentIndex];

  return (
    <div className="flex h-[95%]">
      <div className="flex items-center h-[100%] w-[100%] ">
        {currentIndex < boys.length ? (
          <InfoCard
            user={currentUser}
            onLike={handleNextUser}
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
