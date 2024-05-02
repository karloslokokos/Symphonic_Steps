//component retrieves data from mySQL through API via axios
//renders table of last 16b notes played by the user

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dataTable.css';
import BsNav from '../Containers/BsNav';

// Defines DataTable as a functional component using React hooks

const DataTable = () => {
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  // useEffect hook to manage data fetching

  useEffect(() => {
    if (!apiUrl) {
      // Checks if  API base URL is set in  environment variables, logs error if not
      console.error('REACT_APP_API_BASE_URL is not set. Ensure that the environment variable is configured.');
      return;
    }
    // Make API Request to fetch app
    axios.get(`${apiUrl}/api/get_data?limit=16`) //  'limit' query to limit results
      .then((response) => {
        // API returns the most recent notes first
        setData(response.data);
      })
        // Logs errors if the API request fails
        .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);// Dependency array with apiUrl ensures useEffect runs only when apiUrl changes


  // Renders component with a navigation bar and a data table

  return (
    <div className="MainPage-page">
       {/* Include navbar component */}

      <BsNav />
      <div className="data-table-container">
        <div className="data-table-content">
        <h1 style={{ textAlign: 'center' }}>Data Table</h1>
          <table className="facebook-table">
            <thead>
              <tr>
                <th>Note</th> 
                {/* <th>Note ID</th> */}
                <th>Time Played</th>
                <th>Pitch</th>
              </tr>
            </thead>
            <tbody>
            {/* // Maps over each item to render table rows */}
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td> 
                  {/* <td>{item.id}</td> */}
                  <td>{item.timestamp}</td>
                  <td>{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

