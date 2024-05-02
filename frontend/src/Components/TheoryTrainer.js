// This is an educational component that helps users 
// learn musical theory by playing specific notes that correspond to intervals .
// Tasks are presented for the user to complete, 
// inputs are verified against the database for accuracy.

import React, { useState } from 'react';
import axios from 'axios';
import BsNav from '../Containers/BsNav';
import '../styles/TheoryTrainer.css';
import major2nd from '../img/major2nd.png';
import major3rd from '../img/major3rd.png';
import perfect4th from '../img/perfect4th.png';
import perfect5th from '../img/perfect5th.png';

// Initialises TheoryTrainer component
const TheoryTrainer = () => {
  const allTasks = [
    { name: 'Perfect 5th', notes: ['C4', 'G4'] },
    { name: 'Major 3rd', notes: ['C3', 'E3'] },
    { name: 'Perfect 4th', notes: ['C4', 'F4'] },
    { name: 'Major 2nd', notes: ['C4', 'D4'] },
  ];

// Object maps intervals to their .png files

  const taskImages = {
    'Perfect 5th': perfect5th,
    'Major 3rd': major3rd,
    'Perfect 4th': perfect4th,
    'Major 2nd': major2nd,
  };
//React state hooks tracks completion status, current task, 
//score, and game status

  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Function generates random task from list of uncompleted tasks

  const generateRandomTask = () => {
    let remainingTasks = allTasks.filter(task => !completedTasks.includes(task.name));
  
    if (remainingTasks.length === 0) {
      setGameOver(true);//Sets game state to over when no tasks remain
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * remainingTasks.length);
    const newTask = remainingTasks[randomIndex];
  
    setCurrentTask(newTask);//Updates current task
    setCompletedTasks(prevTasks => [...prevTasks, newTask.name]);
  };

  //This function validates users input on stairs aganst expected input
  const confirmInput = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/get_note_data`, {
        params: { limit: 2 }
      });
      const fetchedNotes = response.data;

    // Confims if the played notes match the intervals stored in tasks array

      const isValid = fetchedNotes.some(group => {
        const taskNotesStr = currentTask.notes.sort().join(',');
        const groupStr = group.sort().join(',');
        return taskNotesStr === groupStr;
      });
  
      console.log("Fetched Notes:", fetchedNotes);
      console.log("Is Valid:", isValid);

     //Alerts user and updates score if correct

      if (isValid) {
        alert("Correct! Moving to the next task.");
        setScore(prevScore => prevScore + 1);
      } else {
        alert("Incorrect. Moving to the next task.");
      }
      generateRandomTask();//Generates next task from remaining tasks
    } catch (error) {
      console.error("Error fetching note data:", error);
    }
  };

// Function retuns custom message based on the user's score

  const getScoreMessage = (score) => {
    switch (score) {
      case 1:
        return "You scored 25%, you need to work on your theory!";
      case 2:
        return "You scored 50%, not bad but keep studying!";
      case 3:
        return "You scored 75%, good work, you're nearly an expert!";
      case 4:
        return "You scored 100%, you are a music theory expert!";
      default:
        return "";
    }
  };

 // Initialises first task when component mounts
  useState(() => {
    generateRandomTask();
  }, []);

//Renders component UI based on the game state

  return (
    <div className="musical-stairs-game">
      <BsNav />
      <div className="game-container">
        <h1>Play the Musical Stairs Game</h1>
        {currentTask ? (
          <div className="task-container">
            {/* Renders name of current task */}
            <p>Play the following interval on the stairs: {currentTask.name}</p>
            {/* Renders image associated with current task */}
            <div className="image-container">
              <img src={taskImages[currentTask.name]} alt={currentTask.name} className="task-image" />
            </div>
            {/* Button for user to confirm input after playing notes */}
            <div className="button-container">
              <button className="validate-task-btn" onClick={confirmInput}>Confirm Answer!</button>
            </div>
          </div>
        ) : (
          <p>Loading task...</p>
        )}
        {/* Renders current score */}
        <p>Score: {score}</p>
        {gameOver && (
          <div className="game-over-container">
            {/* Renders final score + custom message */}
            <p>{getScoreMessage(score)}</p>
            {/* Button to reset gameplay */}
            <button className="restart-game-btn" onClick={() => window.location.reload()}>Restart Game</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheoryTrainer; //Exports component

