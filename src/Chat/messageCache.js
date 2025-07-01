class MessageCache {
  constructor(options = {}) {
    this.options = {
      maxMessagesPerChat: options.maxMessagesPerChat || 100,
      maxCachedChats: options.maxCachedChats || 30,
      maxStorageSizeMB: options.maxStorageSizeMB || 3,
      cleanupThresholdDays: options.cleanupThresholdDays || 30,
      ...options,
    };

    // Memory cache for active chats (fastest access)
    this.memoryCache = new Map();

    // Chat metadata for management
    this.chatMetadata = new Map();

    // Initialize from localStorage
    this.initialize();
  }

  // Initialize cache from localStorage
  initialize() {
    try {
      const metadata = this.getFromStorage("chat_metadata");
      if (metadata) {
        Object.entries(metadata).forEach(([chatId, meta]) => {
          this.chatMetadata.set(chatId, {
            ...meta,
            lastAccessed: new Date(meta.lastAccessed),
            lastMessageTime: new Date(meta.lastMessageTime),
          });
        });
      }
      this.cleanupOldChats();
    } catch (error) {
      console.error("Failed to initialize message cache:", error);
      this.clearCorruptedData();
    }
  }

  // Get messages for a chat (Memory-first, then localStorage)
  getMessages(chatId) {
    if (!chatId) return [];

    // Check memory cache first
    if (this.memoryCache.has(chatId)) {
      this.updateChatAccess(chatId);
      return this.memoryCache.get(chatId).messages;
    }

    // Load from localStorage
    const chatData = this.loadChatFromStorage(chatId);
    if (chatData) {
      // Cache in memory for fast future access
      this.memoryCache.set(chatId, chatData);
      this.updateChatAccess(chatId);
      return chatData.messages;
    }

    return [];
  }

  // Add a new message
  addMessage(chatId, message) {
    if (!chatId || !message) return false;

    const timestamp = new Date();
    const messageWithTimestamp = {
      ...message,
      id: message.id || this.generateMessageId(),
      timestamp: message.timestamp || timestamp,
      status: message.status || "sent", // sent, pending, failed
    };

    // Get or create chat data
    let chatData = this.memoryCache.get(chatId) || {
      chatId,
      messages: [],
      pendingMessages: [],
      failedMessages: [],
    };

    // Add message based on status
    if (messageWithTimestamp.status === "pending") {
      chatData.pendingMessages.push(messageWithTimestamp);
    } else if (messageWithTimestamp.status === "failed") {
      chatData.failedMessages.push(messageWithTimestamp);
    } else {
      chatData.messages.push(messageWithTimestamp);

      // Maintain message limit
      if (chatData.messages.length > this.options.maxMessagesPerChat) {
        chatData.messages = chatData.messages.slice(
          -this.options.maxMessagesPerChat
        );
      }
    }

    // Update memory cache
    this.memoryCache.set(chatId, chatData);

    // Update metadata
    this.updateChatMetadata(chatId, {
      lastMessageTime: timestamp,
      messageCount: chatData.messages.length,
      hasUnread: message.incoming || false,
    });

    // Persist to localStorage (async-like with setTimeout to avoid blocking)
    setTimeout(() => this.saveChatToStorage(chatId), 0);

    return true;
  }

  // Update message status (pending -> sent/failed)
  updateMessageStatus(chatId, messageId, newStatus, serverData = {}) {
    const chatData = this.memoryCache.get(chatId);
    if (!chatData) return false;

    let messageFound = false;

    // Check pending messages first
    const pendingIndex = chatData.pendingMessages.findIndex(
      (m) => m.id === messageId
    );
    if (pendingIndex !== -1) {
      const message = chatData.pendingMessages.splice(pendingIndex, 1)[0];
      message.status = newStatus;

      // Merge any server data (like server timestamp)
      Object.assign(message, serverData);

      if (newStatus === "sent") {
        chatData.messages.push(message);
      } else if (newStatus === "failed") {
        chatData.failedMessages.push(message);
      }
      messageFound = true;
    }

    if (messageFound) {
      this.memoryCache.set(chatId, chatData);
      setTimeout(() => this.saveChatToStorage(chatId), 0);
    }

    return messageFound;
  }

  // Get all messages including pending and failed
  getAllMessages(chatId) {
    const chatData =
      this.memoryCache.get(chatId) || this.loadChatFromStorage(chatId);
    if (!chatData) return { messages: [], pending: [], failed: [] };

    return {
      messages: chatData.messages || [],
      pending: chatData.pendingMessages || [],
      failed: chatData.failedMessages || [],
    };
  }

  // Clear messages for a chat (when switching chats)
  clearChatMemory(chatId) {
    if (this.memoryCache.has(chatId)) {
      // Save to localStorage before clearing from memory
      this.saveChatToStorage(chatId);
      this.memoryCache.delete(chatId);
    }
  }

  // Preload a chat into memory
  preloadChat(chatId) {
    if (!this.memoryCache.has(chatId)) {
      const chatData = this.loadChatFromStorage(chatId);
      if (chatData) {
        this.memoryCache.set(chatId, chatData);
      }
    }
  }

  // Get chat metadata (for chat list)
  getChatMetadata(chatId) {
    return (
      this.chatMetadata.get(chatId) || {
        lastAccessed: new Date(),
        lastMessageTime: new Date(),
        messageCount: 0,
        unreadCount: 0,
        hasUnread: false,
        isPinned: false,
      }
    );
  }

  // Update chat metadata
  updateChatMetadata(chatId, updates) {
    const existing = this.getChatMetadata(chatId);
    const updated = { ...existing, ...updates, lastAccessed: new Date() };
    this.chatMetadata.set(chatId, updated);

    // Save metadata periodically
    this.saveMetadataToStorage();
  }

  // Mark chat as read
  markChatAsRead(chatId) {
    this.updateChatMetadata(chatId, {
      hasUnread: false,
      unreadCount: 0,
    });
  }

  // Private: Load chat from localStorage
  loadChatFromStorage(chatId) {
    try {
      const stored = this.getFromStorage(`chat_${chatId}`);
      if (stored) {
        // Parse timestamps back to Date objects
        stored.messages = stored.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        return stored;
      }
    } catch (error) {
      console.error(`Failed to load chat ${chatId}:`, error);
    }
    return null;
  }

  // Private: Save chat to localStorage
  saveChatToStorage(chatId) {
    const chatData = this.memoryCache.get(chatId);
    if (!chatData) return;

    try {
      // Check storage quota before saving
      if (this.isStorageQuotaExceeded()) {
        this.performEmergencyCleanup();
      }

      this.setToStorage(`chat_${chatId}`, chatData);
    } catch (error) {
      console.error(`Failed to save chat ${chatId}:`, error);
      if (error.name === "QuotaExceededError") {
        this.handleStorageQuotaExceeded();
      }
    }
  }

  // Private: Save metadata to localStorage
  saveMetadataToStorage() {
    try {
      const metadata = {};
      this.chatMetadata.forEach((value, key) => {
        metadata[key] = value;
      });
      this.setToStorage("chat_metadata", metadata);
    } catch (error) {
      console.error("Failed to save metadata:", error);
    }
  }

  // Private: Update chat access time
  updateChatAccess(chatId) {
    this.updateChatMetadata(chatId, { lastAccessed: new Date() });
  }

  // Private: Generate unique message ID
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Private: localStorage helpers
  getFromStorage(key) {
    try {
      const item = localStorage.getItem(`msgcache_${key}`);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get ${key} from storage:`, error);
      return null;
    }
  }

  setToStorage(key, value) {
    try {
      localStorage.setItem(`msgcache_${key}`, JSON.stringify(value));
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        throw error; // Re-throw quota errors
      }
      console.error(`Failed to set ${key} to storage:`, error);
    }
  }

  // Private: Check storage quota
  isStorageQuotaExceeded() {
    try {
      // Estimate current usage
      let totalSize = 0;
      for (let key in localStorage) {
        if (key.startsWith("msgcache_")) {
          totalSize += localStorage[key].length;
        }
      }

      // Convert to MB (rough estimate)
      const usageMB = totalSize / (1024 * 1024);
      return usageMB > this.options.maxStorageSizeMB;
    } catch (e) {
      return false;
    }
  }

  // Private: Emergency cleanup when storage is full
  performEmergencyCleanup() {
    console.warn("Performing emergency cleanup due to storage quota");

    // Get all chats sorted by last access (oldest first)
    const chatIds = Array.from(this.chatMetadata.keys()).sort((a, b) => {
      const metaA = this.chatMetadata.get(a);
      const metaB = this.chatMetadata.get(b);
      return metaA.lastAccessed - metaB.lastAccessed;
    });

    // Remove oldest 25% of chats
    const toRemove = Math.ceil(chatIds.length * 0.25);
    for (let i = 0; i < toRemove && i < chatIds.length; i++) {
      this.removeChatFromStorage(chatIds[i]);
    }
  }

  // Private: Handle storage quota exceeded
  handleStorageQuotaExceeded() {
    console.error("Storage quota exceeded, performing cleanup");
    this.performEmergencyCleanup();
  }

  // Private: Clean up old chats
  cleanupOldChats() {
    const cutoffDate = new Date();
    cutoffDate.setDate(
      cutoffDate.getDate() - this.options.cleanupThresholdDays
    );

    this.chatMetadata.forEach((metadata, chatId) => {
      if (metadata.lastAccessed < cutoffDate && !metadata.isPinned) {
        this.removeChatFromStorage(chatId);
      }
    });
  }

  // Private: Remove chat from storage
  removeChatFromStorage(chatId) {
    try {
      localStorage.removeItem(`msgcache_chat_${chatId}`);
      this.chatMetadata.delete(chatId);
      this.memoryCache.delete(chatId);
    } catch (error) {
      console.error(`Failed to remove chat ${chatId}:`, error);
    }
  }

  // Private: Clear corrupted data
  clearCorruptedData() {
    console.warn("Clearing corrupted cache data");
    this.memoryCache.clear();
    this.chatMetadata.clear();

    // Remove all message cache data from localStorage
    const keysToRemove = [];
    for (let key in localStorage) {
      if (key.startsWith("msgcache_")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  // Public: Get cache statistics
  getStats() {
    return {
      memoryCacheSize: this.memoryCache.size,
      totalChats: this.chatMetadata.size,
      storageUsage: this.getStorageUsage(),
      oldestChat: this.getOldestChatDate(),
      newestChat: this.getNewestChatDate(),
    };
  }

  // Private: Get storage usage estimate
  getStorageUsage() {
    try {
      let totalSize = 0;
      for (let key in localStorage) {
        if (key.startsWith("msgcache_")) {
          totalSize += localStorage[key].length;
        }
      }
      return {
        bytes: totalSize,
        mb: (totalSize / (1024 * 1024)).toFixed(2),
      };
    } catch (error) {
      return { bytes: 0, mb: "0.00" };
    }
  }

  // Private: Get oldest chat date
  getOldestChatDate() {
    let oldest = null;
    this.chatMetadata.forEach((metadata) => {
      if (!oldest || metadata.lastAccessed < oldest) {
        oldest = metadata.lastAccessed;
      }
    });
    return oldest;
  }

  // Private: Get newest chat date
  getNewestChatDate() {
    let newest = null;
    this.chatMetadata.forEach((metadata) => {
      if (!newest || metadata.lastAccessed > newest) {
        newest = metadata.lastAccessed;
      }
    });
    return newest;
  }

  // Public: Manual cleanup
  cleanup() {
    this.cleanupOldChats();
    this.saveMetadataToStorage();
  }

  // Public: Clear all cache data
  clearAll() {
    this.memoryCache.clear();
    this.chatMetadata.clear();

    const keysToRemove = [];
    for (let key in localStorage) {
      if (key.startsWith("msgcache_")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }
}

// Export singleton instance
export const messageCache = new MessageCache({
  maxMessagesPerChat: 100,
  maxCachedChats: 30,
  maxStorageSizeMB: 3,
  cleanupThresholdDays: 30,
});

export default MessageCache;
