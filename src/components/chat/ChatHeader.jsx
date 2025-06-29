import { useEffect, useState } from "react";
import { RUST_MAIN_URL } from "../../utils/constant";
import axios from "axios";

/* eslint-disable react/prop-types */
const ChatHeader = ({ userInfo }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const displayName = userInfo
    ? `${userInfo.first_name} ${userInfo.last_name}`.trim() || userInfo.username
    : "Unknown User";

  useEffect(() => {
    let isMounted = true;
    const fetchAvatar = async () => {
      try {
        if (userInfo?.id) {
          const response = await axios.get(
            `${RUST_MAIN_URL}/user/getuseravatar?id=${userInfo.id}`
          );
          if (isMounted && response.data) {
            setAvatarUrl(response.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch avatar:", error);
        if (isMounted) {
          setAvatarUrl(
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName
            )}&background=ff0059&color=fff&size=64`
          );
        }
      }
    };

    // Initialize avatar
    fetchAvatar();

    return () => {
      isMounted = false;
    };
  }, [userInfo, displayName]);

  const finalAvatar =
    avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=ff0059&color=fff&size=64`;

  return (
    <div className="flex items-center p-4 border-b border-gray-700">
      <img
        src={finalAvatar}
        alt={`${displayName}'s avatar`}
        className="w-10 h-10 rounded-full object-cover mr-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName
          )}&background=ff0059&color=fff&size=64`;
        }}
      />
      <div className="text-white font-semibold text-lg truncate">
        {displayName}
      </div>
    </div>
  );
};

export default ChatHeader;
