import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ExtraContext } from "../../context/ExtraContext";

const PotentialChat = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ExtraContext);

  const handleCreateChat = (recipientId) => {
    createChat(user._id, recipientId);
  };

  return (
    <div className="all-users">
      {potentialChats?.map((u, index) => (
        <div
          key={index}
          className="single-user cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
          onClick={() => handleCreateChat(u._id)}
        >
          {u.username}
          {/* Uncomment and adjust this line if online status is implemented */}
          {/* <span className={onlineUsers?.some((onlineUser) => onlineUser?.userId === u?._id) ? "user-online" : ""}></span> */}
        </div>
      ))}
    </div>
  );
};

export default PotentialChat;
