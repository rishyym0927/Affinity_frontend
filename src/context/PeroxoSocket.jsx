/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { PEROXO_SOCKET_URL } from "../utils/constant";
import { AuthContext } from "./AuthContext";

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const PeroxoWebSocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Extract token from user object
  const token = user?.token;

  // Only log when token actually changes, not on every render
  const prevTokenRef = useRef();
  useEffect(() => {
    if (prevTokenRef.current !== token) {
      console.log("PeroxoWebSocketProvider token changed:", token);
      prevTokenRef.current = token;
    }
  }, [token]);

  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [error, setError] = useState(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const messageHandlersRef = useRef(new Set());
  const connectionHandlersRef = useRef(new Set());

  // Configuration constants
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 3000;

  // Clean up function - no dependencies that change
  const cleanup = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.onopen = null;
      socketRef.current.onclose = null;
      socketRef.current.onerror = null;
      socketRef.current.onmessage = null;

      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
      socketRef.current = null;
    }
  }, []);

  // Send message - stable function
  const sendMessage = useCallback((message) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }

    try {
      const messageStr =
        typeof message === "string" ? message : JSON.stringify(message);
      socketRef.current.send(messageStr);
      return true;
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  }, []);

  // Add message handler - stable function
  const addMessageHandler = useCallback((handler) => {
    messageHandlersRef.current.add(handler);
    return () => {
      messageHandlersRef.current.delete(handler);
    };
  }, []);

  // Add connection handler - stable function
  const addConnectionHandler = useCallback((handler) => {
    connectionHandlersRef.current.add(handler);
    return () => {
      connectionHandlersRef.current.delete(handler);
    };
  }, []);

  // Disconnect function - stable
  const disconnect = useCallback(() => {
    cleanup();
    setConnectionStatus("disconnected");
    setReconnectAttempts(0); // Reset attempts
  }, [cleanup]);

  // Main connection effect - this is where we handle all connection logic
  useEffect(() => {
    let currentSocket = null;
    let reconnectTimeout = null;

    const connectToWebSocket = () => {
      if (!token && !user?.id) {
        console.log("Token not available, skipping connection");
        setConnectionStatus("disconnected");
        setError("Token is required for connection");
        return;
      }

      // Clean up existing connection
      if (currentSocket) {
        currentSocket.onopen = null;
        currentSocket.onclose = null;
        currentSocket.onerror = null;
        currentSocket.onmessage = null;
        if (currentSocket.readyState === WebSocket.OPEN) {
          currentSocket.close();
        }
      }

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }

      setConnectionStatus("connecting");
      setError(null);

      try {
        const wsUrl = `${PEROXO_SOCKET_URL}/ws?token=${user.id}`;
        console.log("Connecting to WebSocket:", wsUrl);
        
        currentSocket = new WebSocket(wsUrl);
        socketRef.current = currentSocket;

        currentSocket.onopen = () => {
          console.log("WebSocket connected");
          setConnectionStatus("connected");
          setReconnectAttempts(0);
          setError(null);

          // Notify connection handlers
          connectionHandlersRef.current.forEach((handler) => {
            try {
              handler("connected");
            } catch (e) {
              console.error("Error in connection handler:", e);
            }
          });
        };

        currentSocket.onclose = (event) => {
          console.log("WebSocket disconnected:", event.code, event.reason);
          setConnectionStatus("disconnected");

          // Notify connection handlers
          connectionHandlersRef.current.forEach((handler) => {
            try {
              handler("disconnected", event);
            } catch (e) {
              console.error("Error in connection handler:", e);
            }
          });

          // Only reconnect if it wasn't a clean close and we still have token
          if (event.code !== 1000 && token) {
            setReconnectAttempts((prev) => {
              const newAttempts = prev + 1;
              if (newAttempts <= MAX_RECONNECT_ATTEMPTS) {
                console.log(`Scheduling reconnect attempt ${newAttempts}/${MAX_RECONNECT_ATTEMPTS}`);
                reconnectTimeout = setTimeout(() => {
                  connectToWebSocket();
                }, RECONNECT_INTERVAL * Math.pow(2, prev));
              } else {
                setError("Maximum reconnection attempts reached");
              }
              return newAttempts;
            });
          }
        };

        currentSocket.onerror = (event) => {
          console.error("WebSocket error:", event);
          setError("WebSocket connection error");
          setConnectionStatus("disconnected");

          // Notify connection handlers
          connectionHandlersRef.current.forEach((handler) => {
            try {
              handler("error", event);
            } catch (e) {
              console.error("Error in connection handler:", e);
            }
          });
        };

        currentSocket.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            // Notify all message handlers
            messageHandlersRef.current.forEach((handler) => {
              try {
                handler(message);
              } catch (e) {
                console.error("Error in message handler:", e);
              }
            });
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };

      } catch (error) {
        console.error("Failed to create WebSocket connection:", error);
        setError("Failed to create WebSocket connection");
        setConnectionStatus("disconnected");
      }
    };

    // Connect if we have token, disconnect if we don't
    if (token) {
      console.log("Token available, connecting to WebSocket");
      connectToWebSocket();
    } else {
      console.log("No token available, disconnecting WebSocket");
      if (currentSocket) {
        currentSocket.close();
      }
      setConnectionStatus("disconnected");
      setReconnectAttempts(0);
    }

    // Cleanup function
    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (currentSocket) {
        currentSocket.onopen = null;
        currentSocket.onclose = null;
        currentSocket.onerror = null;
        currentSocket.onmessage = null;
        if (currentSocket.readyState === WebSocket.OPEN) {
          currentSocket.close();
        }
      }
    };
  }, [token,user.id]); 

  // Manual reconnect function
  const reconnect = useCallback(() => {
    setReconnectAttempts(0);
    // The reconnection will be handled by the main effect when reconnectAttempts changes
  }, []);

  // Connect function for manual use
  const connect = useCallback(() => {
    if (token) {
      setReconnectAttempts(0); // This will trigger the main effect
    }
  }, [token]);

  // Handle visibility change for reconnection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        connectionStatus === "disconnected" &&
        token
      ) {
        reconnect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [connectionStatus, token, reconnect]);

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      if (connectionStatus === "disconnected" && token) {
        reconnect();
      }
    };

    const handleOffline = () => {
      setConnectionStatus("disconnected");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [connectionStatus, token, reconnect]);

  const contextValue = {
    // Connection state
    connectionStatus,
    error,
    reconnectAttempts,
    isConnected: connectionStatus === "connected",
    isConnecting: connectionStatus === "connecting",
    isDisconnected: connectionStatus === "disconnected",

    // Methods
    sendMessage,
    connect,
    disconnect,
    reconnect,
    addMessageHandler,
    addConnectionHandler,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};