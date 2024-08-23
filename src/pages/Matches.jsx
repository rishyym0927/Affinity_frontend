import React, { useContext } from 'react';


// import { AuthContext } from '../context/AuthContrext';
import ChatBox from '../components/chat/ChatBox';
import PotentialChat from '../components/chat/PotentialChat'
import UserChat from '../components/chat/UserChat'
import { AuthContext } from '../context/AuthContext';
import { ExtraContext } from '../context/ExtraContext';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ExtraContext);

  return (
    <div className="container mx-auto p-4 ">
    
      {userChats?.length < 1 ? null : (
        <div className="flex">
          <div className="flex-grow message-box pr-6 space-y-3">
            {isUserChatsLoading && <p>Loading chats ...</p>}
            {userChats?.map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                {console.log(chat)}
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </div>
          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default Chat;
