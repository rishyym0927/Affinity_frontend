import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ExtraContext } from "../../context/ExtraContext";

const PotentialChat = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ExtraContext);
  // const {onlineUser} =useContext(ExtraContext);

  // fetch potential chats from database or API
  console.log("potential chats",potentialChats)
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => {
                  createChat(user._id, u._id);
                }}
              >
                {u.username}
                {/* <span className={onlineUsers?.some((user)=>user?.userId === u?._id) ? "user-online" : ""}></span> */}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChat;
