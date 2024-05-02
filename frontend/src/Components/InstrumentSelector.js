// This component allows users to select a musical instrument 
// and posts data to API to enable selection.

import React, { useState } from 'react';
import BsNav from '../Containers/BsNav';
import axios from 'axios';
import '../styles/InstrumentSelector.css';
import guitarPng from '../img/guitarPng.png';
import drumsPng from '../img/drumsPng.png';
import violinPng from '../img/violinPng.png';
import pianoPng from '../img/pianoPng.png';

// Initialises functional component with a default active instrument with useState hook

const InstrumentSelector = () => {
  const [activeInstrument, setActiveInstrument] = useState('Piano');
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  // Dictionary object maps instrument names to their .img files

  const instruments = {
    Piano: pianoPng,
    Guitar: guitarPng,
    Violin: violinPng,
    Drums: drumsPng,
  };

  const switchInstrument = async (instrumentName, dictionary = 'topic_to_audio') => {
    console.log(`Switching instrument to: ${instrumentName}`);

// POST request to API for switching instrument using axios

    try {
      const response = await axios.post(`${apiUrl}/api/switch_dictionary`, {
        dictionary,
      });
  // Updates  active instrument state and logs response

      setActiveInstrument(instrumentName);
      console.log(`Switched to ${instrumentName}`, response.data);
    } catch (error) {
      console.error('Error switching instrument:', error);
    }
  };
// 
  return (
    <div className="MainPage-page">
      <BsNav />

      <div className="instrument-selector-container">
      {/* Displays name of currently selected instrument */}
        <h2>Current Instrument: {activeInstrument}</h2>
        {/* Displays image of currently selected instrument */}
        <img src={instruments[activeInstrument]} alt={activeInstrument} className="instrument-image" />
      {/* Buttons for instrument selection */}
        <div className="button-group">
          <button onClick={() => switchInstrument('Piano', 'piano_dictionary')}>Piano</button>
          <button onClick={() => switchInstrument('Guitar', 'guitar_dictionary')}>Guitar</button>
          <button onClick={() => switchInstrument('Violin', 'violin_dictionary')}>Violin</button>
          <button onClick={() => switchInstrument('Drums', 'drums_dictionary')}>Drums</button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentSelector;

