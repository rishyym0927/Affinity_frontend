import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ExtraContext } from "../../context/ExtraContext";
import { useWebSocket } from "../../context/PeroxoSocket";

const ChatBox2 = () => {
  const { user } = useContext(AuthContext);
  const { currentChat } = useContext(ExtraContext);
  const { sendMessage, addMessageHandler, isConnected } = useWebSocket();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Clear messages when switching chats
  useEffect(() => {
    setMessages([]);
  }, [currentChat]);

  // Handle incoming WebSocket messages for this chat
  useEffect(() => {
    if (!currentChat) return;

    const unsubscribe = addMessageHandler((message) => {
      if (message.DirectMessage) {
        const { from, to, content } = message.DirectMessage;
        const otherId = currentChat.otherUser.id;
        const isRelevant =
          (from === user.id && to === otherId) ||
          (from === otherId && to === user.id);
        if (isRelevant) {
          setMessages((prev) => [
            ...prev,
            {
              from,
              to,
              content,
              incoming: from !== user.id,
            },
          ]);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [addMessageHandler, currentChat, user.id]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !currentChat || !isConnected) return;

    // Construct the ChatMessage shape expected by the backend
    const payload = {
      DirectMessage: {
        from: user.id,
        to: currentChat.otherUser.id,
        content: input.trim(),
      },
    };

    // Send via WebSocket and optimistically update UI
    sendMessage(payload);
    setMessages((prev) => [
      ...prev,
      {
        from: user.id,
        to: currentChat.otherUser.id,
        content: input.trim(),
        incoming: false,
      },
    ]);
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
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.incoming ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                msg.incoming
                  ? "bg-gray-800 text-white"
                  : "bg-[#ff0059] text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
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

export default ChatBox2;
