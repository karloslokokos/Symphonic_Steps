// Provides a WebSocket connection through a React context, 
// allowing any component to easily connect to and use WebSocket 
// functionalities without repeatedly having to manage the connection state.

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
// Creates  WebSocket context for providing and consuming connections

const WebSocketContext = createContext(null);

// Defines WebSocketProvider component for establishing connection

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  // Creates new WebSocket connection when component mounts

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_WS_BASE_URL); // The WebSocket server URL
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
// Provides socket to any child components that may require it

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
// Custom hook to access WebSocket context components

export const useWebSocket = () => useContext(WebSocketContext);
