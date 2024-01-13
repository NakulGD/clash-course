// src/App.js
import React from 'react';
import './App.css';
import CourseChecklist from './Components/CourseList';
import { CheckedCoursesProvider } from './Contexts/CheckedCoursesContext';


function App() {
  return (
    <CheckedCoursesProvider>
      <div className="App">
        <header className="App-header">
          <CourseChecklist />
        </header>
      </div>
    </CheckedCoursesProvider>
  );
}

export default App;
