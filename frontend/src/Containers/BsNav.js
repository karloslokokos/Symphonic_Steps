import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'; 
import '../styles/nav.css';
import guitar from '../img/guitar.svg';
import trebleClef from '../img/trebleClef.svg';
import { HouseDoor, MusicNoteBeamed, Table } from 'react-bootstrap-icons';
import symphonicStepsMainLogo from '../img/symphonicStepsMainLogo.png';

// Creates custom treble clef favicon for nav bar


function TrebleClef() {
  return <img src={trebleClef} alt="Treble Clef" style={{ height: '24px', width: '24px' }} />;
}

// Creates custom guitar favicon for nav bar


function GuitarIcon() {
  return <img src={guitar} alt="Guitar" style={{ height: '24px', width: '24px' }} />;
}

function BsNav() {
  return (
      // Defines main navigation component using React Bootstrap's Navbar
    <Navbar expand="lg" className="bg-light" variant="light">
      <Container fluid>
      // Symphonic steps logo linked to the main page using Link component

        <Navbar.Brand as={Link} to="/MainPage"> 
          <img
            alt="Symphonic Steps Logo"
            src={symphonicStepsMainLogo}
            className="navbar-logo"
          />
        </Navbar.Brand>
        // Toggle button for responsive navbar

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

        // Nav items use Link component for routing

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/MainPage"> 
              <HouseDoor /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/InstrumentSelector">
              <GuitarIcon /> Instrument Selector
            </Nav.Link>
            <Nav.Link as={Link} to="/TheoryTrainer">
              <TrebleClef />
              Theory Trainer
            </Nav.Link>
            <Nav.Link as={Link} to="/MusicVisualiser">
              <MusicNoteBeamed /> Music Visualiser
            </Nav.Link>           
            <Nav.Link as={Link} to="/Datatable">
              <Table /> Data Table
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BsNav; //Exports nav component


