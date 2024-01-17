// src/contexts/CheckedCoursesContext.js
import React, { createContext, useState, useContext } from 'react';

const CheckedCoursesContext = createContext();

export const useCheckedCourses = () => useContext(CheckedCoursesContext);

export const CheckedCoursesProvider = ({ children }) => {
  const [checkedCourses, setCheckedCourses] = useState([]);

  // Function to add a course to the checked list
  const addCheckedCourse = (course) => {
    setCheckedCourses(prev => [...prev, course]);
  };

  // Function to remove a course from the checked list
  const removeCheckedCourse = (fullSectionCode) => {
    setCheckedCourses(prev => prev.filter(c => c.fullSectionCode !== fullSectionCode));
  };

  return (
    <CheckedCoursesContext.Provider value={{ checkedCourses, addCheckedCourse, removeCheckedCourse }}>
      {children}
    </CheckedCoursesContext.Provider>
  );
};
