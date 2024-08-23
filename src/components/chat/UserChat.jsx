import React, { useContext } from 'react';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import { ExtraContext } from '../../context/ExtraContext';


const UserChat = ({ chat, user }) => {
  console.log("from userchat", user, chat);
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers } = useContext(ExtraContext);
  

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  return (
    <div
      role="button"
      className="flex items-center p-2 justify-between hover:bg-neutral-800 rounded-lg transition-colors"
    >
      <div className="flex items-center">
        <div className="mr-2">
          <img src="" alt="" className="w-12 h-12 rounded-full" />
        </div>
        <div className="text-content">
          <div className="text-white font-bold">{recipientUser?.user_name}</div>
          <div className="text-neutral-400">Text Message</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-neutral-400 text-sm">12/12/2022</div>
        <div className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
          2
        </div>
        <span className={`${isOnline ? 'bg-green-500' : ''} w-3 h-3 rounded-full mt-2`}></span>
      </div>
    </div>
  );
};

export default UserChat;
