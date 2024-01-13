// src/App.js
import React from 'react';
import './App.css';
import CourseChecklist from './Components/CourseList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CourseChecklist />
      </header>
    </div>
  );
}

export default App;
