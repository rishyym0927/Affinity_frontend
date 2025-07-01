/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ExtraContext } from "../../context/ExtraContext";
import { useWebSocket } from "../../context/PeroxoSocket";
import { useMessageCache } from "../../hooks/useMessageCache"; // Adjust path as needed
import ChatHeader from "./ChatHeader";
import MessageBox from "./MessageBox";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat } = useContext(ExtraContext);
  const { sendMessage, addMessageHandler, isConnected } = useWebSocket();

  const chatId = currentChat?.chatId || currentChat?.id || null;
  const {
    allMessages,
    addMessage,
    updateMessageStatus,
    retryMessage,
    clearFromMemory,
    isLoading,
  } = useMessageCache(chatId);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Clear cache memory when switching chats
  useEffect(() => {
    return () => {
      if (chatId) clearFromMemory();
    };
  }, [chatId, clearFromMemory]);

  // Listen to WebSocket messages
  useEffect(() => {
    if (!chatId || !currentChat) return;

    const unsubscribe = addMessageHandler((message) => {
      if (message.DirectMessage) {
        const { from, to, content, id, timestamp } = message.DirectMessage;

        const otherUserId = currentChat.otherUser.id;
        const isRelevant =
          (from === user.id && to === otherUserId) ||
          (from === otherUserId && to === user.id);

        if (isRelevant) {
          addMessage({
            id,
            from,
            to,
            content,
            incoming: from !== user.id,
            timestamp: timestamp || new Date(),
            status: "sent",
          });
        }
      }
    });

    return () => unsubscribe();
  }, [addMessageHandler, currentChat, chatId, user.id, addMessage]);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !chatId || !currentChat || !isConnected) return;

    const trimmed = input.trim();
    const tempId = `temp_${Date.now()}`;

    const payload = {
      DirectMessage: {
        from: user.id,
        to: currentChat.otherUser.id,
        content: trimmed,
      },
    };

    // Add optimistically as pending
    addMessage({
      id: tempId,
      from: user.id,
      to: currentChat.otherUser.id,
      content: trimmed,
      incoming: false,
      timestamp: new Date(),
      status: "pending",
    });

    try {
      sendMessage(payload);

      // Simulate confirmation immediately (in real app, wait for ack)
      updateMessageStatus(tempId, "sent");
    } catch (error) {
      updateMessageStatus(tempId, "failed");
    }

    setInput("");
  };

  if (!currentChat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 bg-neutral-900 rounded-lg">
      <div className="flex-1 overflow-y-auto space-y-2 pb-2">
        <ChatHeader userInfo={currentChat.otherUser} />
        {isLoading ? (
          <div className="text-gray-400 text-sm">Loading messages...</div>
        ) : (
          allMessages.map((msg) => (
            <MessageBox
              key={msg.id}
              content={msg.content}
              incoming={msg.incoming}
              timestamp={msg.timestamp}
              status={msg.status}
              onRetry={() => retryMessage(msg.id)}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-l-lg bg-neutral-800 text-white outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || !isConnected}
          className="px-4 bg-[#ff0059] text-white rounded-r-lg disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
