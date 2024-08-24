import React, { useContext } from 'react';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import { ExtraContext } from '../../context/ExtraContext';

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers } = useContext(ExtraContext);
  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  return (
    <div
      role="button"
      className="flex items-center p-4 justify-between hover:bg-neutral-800 bg-[#101010] rounded-lg transition-colors"
    >
      <div className="flex items-center">
        <div className="mr-3">
          <img src={recipientUser?.image_url} alt="" className="w-12 h-12 rounded-full" />
        </div>
        <div className="text-content">
          <div className="text-white font-bold text-transform:uppercase">{recipientUser?.user_name}</div>
  
        </div>
      </div>
      <div className="flex flex-col items-end">
        
        <div className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
          2
        </div>
        <span className={`${isOnline ? 'bg-green-500' : ''} w-3 h-3 rounded-full mt-2`}></span>
      </div>
    </div>
  );
};

export default UserChat;
