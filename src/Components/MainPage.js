import React from 'react';
import CourseChecklist from './CourseList';
import { CheckedCoursesProvider } from '../Contexts/CheckedCoursesContext';
import TimeTable from './TimeTable';

const MainPage = () => {
    return (
        <CheckedCoursesProvider>
        <div className="App">
          <header className="App-header">
            <div className = "left"><TimeTable /></div>
            {/* <div className = "right"><CourseChecklist /></div> */}
          </header>
        </div>
      </CheckedCoursesProvider>
    );
};

export default MainPage;
