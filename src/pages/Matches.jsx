import React, { useContext } from 'react';
import ChatBox from '../components/chat/ChatBox';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import { ExtraContext } from '../context/ExtraContext';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ExtraContext);

  return (
    <div className="container mx-auto p-4 h-full flex">
      {userChats?.length < 1 ? null : (
        <div className="flex w-full h-full gap-4">
          {/* Sidebar for user chats */}
          {/* #0*/}
          <div className="w-2/5 h-full  rounded-lg  bg-[#0a0a0a] p-4 space-y-3 overflow-y-auto">
            {isUserChatsLoading && <p>Loading chats ...</p>}
            {userChats?.map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </div>
          
          {/* Main Chat Box */}
          <div className=" w-3/5 h-full ">
            <ChatBox />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
