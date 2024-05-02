// This serves as the landing page for the "Symphonic Steps" application, 
// provides a welcome message and a nav button to get started.

import React from 'react';
import BsNav from '../Containers/BsNav';
import '../styles/mainPage.css';
import { Link } from 'react-router-dom'; 

import symphonicStepsMainLogo from '../img/symphonicStepsMainLogo.png';

// Defines Mainpage component
function MainPage() {
  return (
    <div className="MainPage-page">
      {/* Incorporates nav bar */}
      <BsNav />
      <header className="MainPage-header">
      {/* Display the Symphonic Steps logo for branding */}

        <img src={symphonicStepsMainLogo} alt="Symphonic Steps Logo" className="Logo" />
        <br />
          <br /> 
          <br />
        <h1>Welcome to Symphonic Steps</h1>
        <br />
          <br /> 
          <br />
        <h2>An interactive sensor-based musical installation</h2>
        <br />
          <br /> 
          <br />
        <Link to="/GetStartedPage"> 
          <button className="cta-button">Get Started</button>
        </Link>
      </header>
    </div>
  );
}

export default MainPage;

