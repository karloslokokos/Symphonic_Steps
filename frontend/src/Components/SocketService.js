// initializes and manages a WebSocket connection using socket.io-client. 
// creates a single shared instance of the WebSocket that can be reused across 
// different parts of the application

import io from 'socket.io-client';

const wsUrl = process.env.REACT_APP_WS_URL; // WebSocket server URL

let socket;

// Function to create a WebSocket connection

export const getSocket = () => {
  if (!socket) { //check if connection exists
    socket = io(wsUrl); //initialise connection using server url
    console.log('Initializing WebSocket connection');

  // Create event listeners for the socket

    socket.on('connect', () => console.log('Connected to WebSocket server'));
    socket.on('disconnect', (reason) => console.log('Disconnected from WebSocket server:', reason));
  }
  return socket; // Returns socket instance
};
