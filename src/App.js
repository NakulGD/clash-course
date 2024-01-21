// src/App.js
import React from 'react';
import './App.css';
import CourseChecklist from './Components/CourseList';
import { CheckedCoursesProvider } from './Contexts/CheckedCoursesContext';
import TimeTable from './Components/TimeTable';


function App() {
  return (
    <CheckedCoursesProvider>
      <div className="App">
        <header className="App-header">
          <div className = "left"><TimeTable /></div>
          <div className = "right"><CourseChecklist /></div>
        </header>
      </div>
    </CheckedCoursesProvider>
  );
}

export default App;
