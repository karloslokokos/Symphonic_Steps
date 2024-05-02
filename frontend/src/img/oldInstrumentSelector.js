import React, { useState } from 'react';
import BsNav from '../Containers/BsNav';
import axios from 'axios';  // Import axios
import '../styles/mainPage.css';

const InstrumentSelector = () => {
  const [activeDictionary, setActiveDictionary] = useState('topic_to_audio');
  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  const switchDictionary = async (newDictionary) => {
    console.log('Switching dictionary to:', newDictionary);

    try {
      const response = await axios.post(`${apiUrl}/switch_dictionary`, {
        dictionary: newDictionary,
      });

      setActiveDictionary(newDictionary);
      console.log(`Switched to ${newDictionary}`, response.data);
    } catch (error) {
      console.error('Error switching dictionary:', error);
    }
  };

  return (
    <div>
      <BsNav />
      <h2>Current Instrument: {activeDictionary}</h2>
      <div>
        <button className="btn btn-outline-secondary" onClick={() => switchDictionary('topic_to_audio')}>
          Switch to Instrument 1
        </button>
      </div>
      <div>
        <button className="btn btn-outline-secondary" onClick={() => switchDictionary('topic_to_audio2')}>
          Switch to Instrument 2
        </button>
      </div>
      <div>
        <button className="btn btn-outline-secondary" onClick={() => switchDictionary('topic_to_audio3')}>
          Switch to Instrument 3
        </button>
      </div>
      <div>
        <button className="btn btn-outline-secondary" onClick={() => switchDictionary('topic_to_audio4')}>
          Switch to Instrument 4
        </button>
      </div>
    </div>
  );
};

export default InstrumentSelector;