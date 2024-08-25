import React, { useContext, useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import { RiseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ExtraContext } from "../context/ExtraContext";
import { RUST_MAIN_URL } from "../utils/constant";

const Requests = () => {
  const [boys, setBoys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { contestId, setContestId } = useContext(ExtraContext);
  const color = "#ff0059";

  // Fetch the list of boys
  useEffect(() => {
    const getBoys = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${RUST_MAIN_URL}getgirlrequests`,
          {
            email: user.email,
          }
        );
        setBoys(response.data);
        console.log("Boys data:", response.data);
      } catch (error) {
        console.error("Error fetching boys:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getBoys();
  }, [user.email]);

  const [mainId, setMainId] = useState(null);

  // Fetch details of the current boy in the list
  useEffect(() => {
    const getCurrentUserDetails = async () => {
      if (boys.length > 0 && currentIndex < boys.length) {
        setIsLoading(true);
        console.log("Loading", boys[0], currentIndex);
        const currentBoy = boys[currentIndex];
        console.log("Current boy:", currentBoy);
        setContestId(currentBoy.id);

        if (!currentBoy || !currentBoy.girl_email_id) {
          console.error("Invalid boy data or missing email");
          setIsLoading(false);
          return;
        }

        try {
          const response = await axios.post(
            `${RUST_MAIN_URL}getuser`,
            {
              email: currentBoy.girl_email_id,
            }
          );
          console.log("Fetched user details:", response.data);
          setCurrentUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getCurrentUserDetails();
  }, [boys, currentIndex]);

  // Handle navigation and updating to the next user
  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const onLike = async () => {
    try {
      const boyId = String(boys[currentIndex]?.id);
      console.log("Current boy ID:", boyId);
      if (!boyId) {
        console.error("No valid boy ID found.");
        return;
      }
      setCurrentIndex((prevIndex) => prevIndex + 1);
      const response = await axios.post(
        `${RUST_MAIN_URL}changeflag`,
        {
          email: boyId,
        }
      );
      if (response.status == 202) {
        console.log("Success:", response);
        navigate("/coderun");
      } else {
        console.error("Failed with status code:", response.status);
      }
    } catch (error) {
      console.error("Error updating flag:", error);
    }
  };

  return (
    <div className="flex h-[95%]">
      <div className="flex items-center h-[100%] w-[100%]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            {" "}
            <RiseLoader size={20} color="#ff0059" />
          </div>
        ) : // Use the custom Loader component
        boys.length > 0 && currentUserDetails ? (
          <InfoCard
            user={currentUserDetails}
            onLike={onLike}
            onReject={handleNextUser}
          />
        ) : (
          <div>No users to display</div>
        )}
      </div>
    </div>
  );
};

export default Requests;
