import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Score } from './Score';
import BsNav from '../Containers/BsNav';
import '../styles/MusicVisualiser.css';

const MusicVisualiser = () => {
  const [noteData, setNoteData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); 
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const wsUrl = process.env.REACT_APP_WS_URL; 
  
  // Function to fetch note data
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/get_note_data?limit=16`);
      setNoteData(response.data);
      console.log('Note data fetched');
    } catch (error) {
      console.error('Error fetching note data:', error);
    }
  };

  useEffect(() => {
    fetchNotes(); 
    
    // WebSocket connection setup
    const socket = io(wsUrl);
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('data_update', () => {
      setRefreshKey(prevKey => prevKey + 1);
      window.location.reload();
    });

    return () => {
      socket.disconnect(); 
    };
  }, [refreshKey]); 

  return (
    <div key={refreshKey} className="MainPage-page">
      <BsNav />
      
      <h1 className="instruction-text">

      <br />This is a real-time score generator powered by VEXFLOW.</h1>
      <br />
      <br /> 
      <br /> 
      <h2 className="instruction-text">Step on the musical stairs to see what notes you have played!</h2>

      <div className="centered-content">
        <div className="score-container">
          <Score className="Score" staves={noteData} />
        </div>
      </div>
    </div>
  );
};

export default MusicVisualiser;

