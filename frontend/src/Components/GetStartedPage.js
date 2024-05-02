// This component provides an introductory page that 
// guides users through the different features of the 
// "Symphonic Steps" interactive musical installation.

import React from 'react';
import { Link } from 'react-router-dom';
import BsNav from '../Containers/BsNav';
import symphonicStepsMainLogo from '../img/symphonicStepsMainLogo.png';

import '../styles/getStarted.css'; 

function GetStartedPage() {
  return (
    <div className="MainPage-page">
      <BsNav />
      {/* Encapsulates everything in main content container */}
      <div className="MainPage-header">
        <h1>Instructions for Symphonic Steps</h1>
        <p>Explore the different facets of our interactive musical installation.</p>
      
        {/* Section for Instrument Selector */}
        <div className="section-detail">
          <h3>Instrument Selector</h3>
          <p>Here you can choose between Piano, Guitar, Violin and Drums as the intrument you play on the stairs.</p>
          <Link to="/InstrumentSelector"><button className="cta-button">Go to Instrument Selector</button></Link>
        </div>

        {/* Section for Theory Trainer */}
        <div className="section-detail">
          <h3>Theory Trainer</h3>
          <p>Here you can learn intervals and chords by playing the notes that are presented on the stave.</p>
          <Link to="/TheoryTrainer"><button className="cta-button">Go to Theory Trainer</button></Link>
        </div>

        {/* Section for Music Visualiser */}
        <div className="section-detail">
          <h3>Music Visualiser</h3>
          <p>This allows you to visualize the music you create with the stairs in real-time!</p>
          <Link to="/MusicVisualiser"><button className="cta-button">Go to Music Visualiser</button></Link>
        </div>

        {/* Section for Data Table */}
        <div className="section-detail">
          <h3>Data Table</h3>
          <p>View and analyze the data generated from previous musical interactions.</p>
          <Link to="/Datatable"><button className="cta-button">Go to Data Table</button></Link>
          <br />
          <br /> 
          <br /> 
          <p>The Symphonic Steps logo 
            {/* Wraps the logo in a Link to make it navigable */}
            <Link to="/MainPage"> 
              <img src={symphonicStepsMainLogo} alt="Symphonic Steps Logo" className="navbar-logo-instruction" />
            </Link>
            will always take you home :)
          </p>
        </div>
      </div>
    </div>
  );
}

export default GetStartedPage;
