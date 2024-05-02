import React from 'react'; 
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { WebSocketProvider } from './Components/WebSocketContext';  
import MainPage from './Components/MainPage';  
import DataTable from './Components/DataTable';  
import MusicVisualiser from './Components/MusicVisualiser';  
import InstrumentSelector from './Components/InstrumentSelector';  
import TheoryTrainer from './Components/TheoryTrainer';  
import GetStartedPage from './Components/GetStartedPage';  

function App() {
  return (
    <Router>  // HashRouter for static hosting on AWS
      <WebSocketProvider>  // Provides  WebSocket context for real-time data communication with flask server
        <div className="app">  // Main app container
          <Routes>  // Container for different routing paths
            <Route path="/" element={<Navigate replace to="/MainPage" />} /> 
            <Route path="/MainPage" element={<MainPage />} />  
            <Route path="/GetStartedPage" element={<GetStartedPage />} /> 
            <Route path="/DataTable" element={<DataTable />} /> 
            <Route path="/MusicVisualiser" element={<MusicVisualiser />} />  
            <Route path="/InstrumentSelector" element={<InstrumentSelector />} /> 
            <Route path="/TheoryTrainer" element={<TheoryTrainer />} />  
          </Routes>
        </div>
      </WebSocketProvider>
    </Router>
  );
}

export default App; // Exports App component 
