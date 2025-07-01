import { useState, useEffect, useCallback, useRef } from "react";
import { messageCache } from "../Chat/messageCache";

export const useMessageCache = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [failedMessages, setFailedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatIdRef = useRef(chatId);
  const abortControllerRef = useRef(null);

  // Update chatId ref when it changes
  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  // Load messages when chatId changes
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setPendingMessages([]);
      setFailedMessages([]);
      setError(null);
      return;
    }

    // Cancel any pending operations
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const loadMessages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Preload chat if not in memory
        messageCache.preloadChat(chatId);

        // Get all message types
        const {
          messages: confirmed,
          pending,
          failed,
        } = messageCache.getAllMessages(chatId);

        // Only update if we're still on the same chat and not aborted
        if (
          chatIdRef.current === chatId &&
          !abortControllerRef.current.signal.aborted
        ) {
          setMessages(confirmed);
          setPendingMessages(pending);
          setFailedMessages(failed);

          // Mark as read
          messageCache.markChatAsRead(chatId);
        }
      } catch (err) {
        if (!abortControllerRef.current.signal.aborted) {
          setError(err);
          console.error("Failed to load messages:", err);
        }
      } finally {
        if (!abortControllerRef.current.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadMessages();

    // Cleanup on unmount or chatId change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [chatId]);

  // Add a new message
  const addMessage = useCallback(
    (message) => {
      if (!chatId || !message) return false;

      try {
        const success = messageCache.addMessage(chatId, message);

        if (success && chatIdRef.current === chatId) {
          // Update local state based on message status
          if (message.status === "pending") {
            setPendingMessages((prev) => [
              ...prev,
              { ...message, timestamp: new Date(message.timestamp) },
            ]);
          } else if (message.status === "failed") {
            setFailedMessages((prev) => [
              ...prev,
              { ...message, timestamp: new Date(message.timestamp) },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              { ...message, timestamp: new Date(message.timestamp) },
            ]);
          }
        }

        return success;
      } catch (err) {
        setError(err);
        console.error("Failed to add message:", err);
        return false;
      }
    },
    [chatId]
  );

  // Update message status
  const updateMessageStatus = useCallback(
    (messageId, newStatus, serverData = {}) => {
      if (!chatId || !messageId) return false;

      try {
        const success = messageCache.updateMessageStatus(
          chatId,
          messageId,
          newStatus,
          serverData
        );

        if (success && chatIdRef.current === chatId) {
          // Find and move message between state arrays
          let messageToUpdate = null;

          // Check pending messages
          setPendingMessages((prev) => {
            const index = prev.findIndex((msg) => msg.id === messageId);
            if (index !== -1) {
              messageToUpdate = {
                ...prev[index],
                status: newStatus,
                ...serverData,
              };
              return prev.filter((_, i) => i !== index);
            }
            return prev;
          });

          // Check failed messages if not found in pending
          if (!messageToUpdate) {
            setFailedMessages((prev) => {
              const index = prev.findIndex((msg) => msg.id === messageId);
              if (index !== -1) {
                messageToUpdate = {
                  ...prev[index],
                  status: newStatus,
                  ...serverData,
                };
                return prev.filter((_, i) => i !== index);
              }
              return prev;
            });
          }

          // Add to appropriate state based on new status
          if (messageToUpdate) {
            if (newStatus === "sent") {
              setMessages((prev) => [...prev, messageToUpdate]);
            } else if (newStatus === "pending") {
              setPendingMessages((prev) => [...prev, messageToUpdate]);
            } else if (newStatus === "failed") {
              setFailedMessages((prev) => [...prev, messageToUpdate]);
            }
          }
        }

        return success;
      } catch (err) {
        setError(err);
        console.error("Failed to update message status:", err);
        return false;
      }
    },
    [chatId]
  );

  // Get all messages sorted by timestamp
  const getAllMessages = useCallback(() => {
    return [...messages, ...pendingMessages, ...failedMessages].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  }, [messages, pendingMessages, failedMessages]);

  // Get chat metadata
  const getChatMetadata = useCallback(() => {
    if (!chatId) return null;
    return messageCache.getChatMetadata(chatId);
  }, [chatId]);

  // Mark chat as read
  const markAsRead = useCallback(() => {
    if (!chatId) return;
    messageCache.markChatAsRead(chatId);
  }, [chatId]);

  // Clear chat from memory (useful when switching chats)
  const clearFromMemory = useCallback(() => {
    if (!chatId) return;
    messageCache.clearChatMemory(chatId);
  }, [chatId]);

  // Retry a failed message
  const retryMessage = useCallback(
    (messageId) => {
      return updateMessageStatus(messageId, "pending");
    },
    [updateMessageStatus]
  );

  // Get message counts
  const getMessageCounts = useCallback(() => {
    return {
      confirmed: messages.length,
      pending: pendingMessages.length,
      failed: failedMessages.length,
      total: messages.length + pendingMessages.length + failedMessages.length,
    };
  }, [messages.length, pendingMessages.length, failedMessages.length]);

  return {
    // Message data
    messages,
    pendingMessages,
    failedMessages,
    allMessages: getAllMessages(),

    // Loading states
    isLoading,
    error,

    // Actions
    addMessage,
    updateMessageStatus,
    retryMessage,
    markAsRead,
    clearFromMemory,

    // Metadata
    getChatMetadata,
    getMessageCounts,

    // Utility
    isEmpty:
      messages.length === 0 &&
      pendingMessages.length === 0 &&
      failedMessages.length === 0,
  };
};

// Hook for managing multiple chats
export const useMultipleChatCache = (chatIds = []) => {
  const [cacheStats, setCacheStats] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize cache stats
    const updateStats = () => {
      const stats = messageCache.getStats();
      const chatStats = {};

      chatIds.forEach((chatId) => {
        if (chatId) {
          chatStats[chatId] = {
            metadata: messageCache.getChatMetadata(chatId),
            messageCount: messageCache.getMessages(chatId).length,
          };
        }
      });

      setCacheStats({
        global: stats,
        chats: chatStats,
      });
    };

    updateStats();
    setIsInitialized(true);

    // Update stats periodically
    const interval = setInterval(updateStats, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [chatIds]);

  const preloadChats = useCallback((chatIdsToPreload) => {
    chatIdsToPreload.forEach((chatId) => {
      if (chatId) {
        messageCache.preloadChat(chatId);
      }
    });
  }, []);

  const clearAllFromMemory = useCallback(() => {
    chatIds.forEach((chatId) => {
      if (chatId) {
        messageCache.clearChatMemory(chatId);
      }
    });
  }, [chatIds]);

  const performCleanup = useCallback(() => {
    messageCache.cleanup();
  }, []);

  const clearAllCache = useCallback(() => {
    messageCache.clearAll();
    setCacheStats({});
  }, []);

  return {
    cacheStats,
    isInitialized,
    preloadChats,
    clearAllFromMemory,
    performCleanup,
    clearAllCache,
  };
};

export default useMessageCache;
