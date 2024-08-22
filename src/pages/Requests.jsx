import React, { useState } from "react";
import InfoCard from "../components/InfoCard";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [boys, setBoys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

//   useEffect(() => {
//     const getBoys = async () => {
//       try {
//         const response = await axios.get(
//           "http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/getboys"
//         );
//         setBoys(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     getBoys();
//   }, []);

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    navigate("/coderunner")
  };

  const users  = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      username: "johndoe123",
      gender: "Male",
      age: 28,
      location: "New York, NY",
      openness: "High",
      relation_type: "Serious",
      interests: "Hiking, Reading, Gaming",
      exp_qual: "Bachelor's Degree",
      social_habits: "Social Drinker",
      past_relations: "Yes",
      password: "password123",
      image_url: "https://example.com/profile/john.jpg",
      score: 85,
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      username: "janesmith456",
      gender: "Female",
      age: 25,
      location: "San Francisco, CA",
      openness: "Moderate",
      relation_type: "Casual",
      interest: "Cooking, Traveling, Photography",
      exp_qual: "Master's Degree",
      social_habits: "Non-Smoker",
      past_relations: "No",
      password: "securePass456",
      image_url: "https://example.com/profile/jane.jpg",
      score: 92,
    },
    {
      first_name: "Alex",
      last_name: "Brown",
      email: "alex.brown@example.com",
      username: "alexbrown789",
      gender: "Non-binary",
      age: 30,
      location: "Austin, TX",
      openness: "Low",
      relation_type: "Friendship",
      interests: "Yoga, Music, Art",
      exp_qual: "PhD",
      social_habits: "Occasional Drinker",
      past_relations: "Yes",
      password: "myPassword789",
      image_url: "https://example.com/profile/alex.jpg",
      score: 78,
    }
  ];
  

  const currentUser = users[currentIndex];
  return (<div className="flex h-[95%]">
    <div className="flex items-center h-[100%] w-[100%] ">
       
        <InfoCard
          user={currentUser}
          onLike={handleNextUser}
          onReject={handleNextUser}
        />
      
    </div>
  </div>);
};

export default Requests;
