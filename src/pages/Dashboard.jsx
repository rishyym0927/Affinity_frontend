import React, { useState } from "react";
import InfoCard from "../components/InfoCard";

const Dashboard = () => {
  const users = [
    {
      username: "johndoe123",
      password: "SuperSecretPassword123!",
      first_name: "John",
      last_name: "Doe",
      email: null,
      gender: "Male",
      age: 28,
      location: null,
      openness: null,
      interest: null,
      exp_qual: null,
      relation_type: null,
      social_habits: null,
      past_relations: null,
      image_url: null,
      score: 85,
    },
    {
      username: "janesmithxo",
      password: "P@ssw0rd456!",
      first_name: "Jane",
      last_name: "Smith",
      email: null,
      gender: "Female",
      age: 32,
      location: null,
      openness: null,
      interest: null,
      exp_qual: null,
      relation_type: null,
      social_habits: null,
      past_relations: null,
      image_url: null,
      score: 92,
    },
    {
      username: "mikeross78",
      password: "Str0ngP@ss789#",
      first_name: "Mike",
      last_name: "Ross",
      email: null,
      gender: "Male",
      age: 25,
      location: null,
      openness: null,
      interest: null,
      exp_qual: null,
      relation_type: null,
      social_habits: null,
      past_relations: null,
      image_url: null,
      score: 78,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Like and Reject actions
  const handleNextUser = () => {
   
      setCurrentIndex((prevIndex) => prevIndex + 1);
      console.log("User liked or rejected.", currentIndex);
    
  };

  // Current user
  const currentUser = users[currentIndex];

  return (
    <div className="flex">
      <div className="flex items-center h-full w-[100%]">
        {currentIndex < users.length ? (
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
