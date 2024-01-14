import React, { useState, useEffect } from 'react';
import { useCheckedCourses } from '../Contexts/CheckedCoursesContext';
import './Styling/TimeTable.css';

// Define the timetable range
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

// const checkedCourses = [
//     {
//         fullSectionCode: "CPSC 320 202",
//         days: ["Mon", "Wed", "Fri"],
//         startTime: "9:00",
//         endTime: "10:30"
//     },
//     {
//         fullSectionCode: "CPEN 441 101",
//         days: ["Mon", "Wed"],
//         startTime: "17:00",
//         endTime: "20:00"
//     },
//     // ... more objects as needed
// ];

const TimeTable = () => {

    const { checkedCourses } = useCheckedCourses();


    // Define a new state variable called 'selectedCells' and initialize it to an empty object
    const [selectedCells, setSelectedCells] = useState({});
    
    // Define a state variable for newSelectedCells
    const [newSelectedCells, setNewSelectedCells] = useState({});
    
    function toggleCell(day, time) {
        const key = `${day}-${time}`;
    
        // All this does is update the given key in the selectedCells object to be the opposite of what it was before
        // It's just long because we're creating a whole new function within the arguments to make sure we're getting
        // the latest state of the object
        setSelectedCells(function (prevState) {
            const newState = { ...prevState };
            newState[key] = !prevState[key];
            return newState;
        });
    }
    
    useEffect(() => {
        // Function to set cells based on checkedCourses
        const setCellsForCourses = () => {
            const newSelectedCells = {};
        
            checkedCourses.forEach(course => {
                console.log("this is course:", course);
                console.log("this is course.days:", course.days);
                const courseDays = course.days.map(day => {
                    // Convert abbreviated days to full names
                    console.log("this is days:", days);
                    console.log("this is day:", day);
                    switch (day) {
                        case "Mon": return "Monday";
                        case "Tue": return "Tuesday";
                        case "Wed": return "Wednesday";
                        case "Thu": return "Thursday";
                        case "Fri": return "Friday";
                        default: return day;
                    }
                });
        
                courseDays.forEach(day => {
                    let [startHour, startMinutes] = course.startTime.split(':').map(Number);
                    let [endHour, endMinutes] = course.endTime.split(':').map(Number);
                    // Adjust for 24-hour format if necessary
        
                    while (startHour < endHour /*|| (startHour === endHour && startMinutes <= endMinutes)*/) {
                        let time = `${startHour < 10 ? '0' + startHour : startHour}:${startMinutes === 0 ? '00' : '30'}`;
                        newSelectedCells[`${day}-${time}`] = true;
        
                        if (startMinutes < 30) {
                            startMinutes = 30;
                        } else {
                            startHour++;
                            startMinutes = 0;
                        }
                    }
                });
            });
            
            // Update the newSelectedCells state
            setNewSelectedCells(newSelectedCells);
        };

        setCellsForCourses();
    }, [checkedCourses]); 

    //console.log(newSelectedCells);

    return (
        <div className="timetable">
            <h1>Time Table</h1>
            <table>

                {/* For each day, create a table header */}
                {/* This is basically the code that creates the top row containing the days of the week. */}
                <tr>
                    <th>&nbsp;</th>
                    {days.map(day => <th key={day}>{day}</th>)}
                </tr>

                {/* For each time, create a table row */}
                {times.map(time => (
                    <tr key={time}>

                        {/* Only display the rows that end in ":00", so no half-hour rows */}
                        <th className="time">{time.endsWith(":00") ? time : <span>&nbsp;&nbsp;</span>}</th>

                        {/* For each day, create a table cell */}
                        {/* These ones have keys combining the day and the time */}
                        {days.map(day => (
                            <td
                                key={day + '-' + time}
                                className={newSelectedCells[`${day}-${time}`] ? "selected" : ""}
                            />
                        ))}
                    </tr>
                ))}

            </table>
        </div>
    );
};

export default TimeTable;
