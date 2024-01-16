import React, { useState, useEffect } from 'react';
import { useCheckedCourses } from '../Contexts/CheckedCoursesContext';
import './Styling/TimeTable.css';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

const TimeTable = () => {
    const { checkedCourses } = useCheckedCourses();
    const [cellStates, setCellStates] = useState({});

    useEffect(() => {
        const newCellStates = {};

        console.log("Checked Courses:", checkedCourses);

        checkedCourses.forEach(course => {
            const courseDays = course.days.map(day => {
                switch (day) {
                    case "Mon": return "Monday";
                    case "Tue": return "Tuesday";
                    case "Wed": return "Wednesday";
                    case "Thu": return "Thursday";
                    case "Fri": return "Friday";
                    default: return day;
                }
            });

            console.log("Checked Courses:", checkedCourses);

            courseDays.forEach(day => {

                console.log("This is course: ", course);

                let [startHour, startMinutes] = course.startTime.split(':').map(Number);
                let [endHour, endMinutes] = course.endTime.split(':').map(Number);
                let isFirstCell = true;

                while (startHour < endHour || (startHour === endHour && startMinutes < endMinutes)) {
                    let timeKey = `${startHour < 10 ? '0' + startHour : startHour}:${startMinutes === 0 ? '00' : '30'}`;
                    let cellKey = `${day}-${timeKey}`;

                    if (!newCellStates[cellKey]) {
                        newCellStates[cellKey] = { count: 0, courses: [] };
                    }

                    newCellStates[cellKey].count++;
                    if (isFirstCell) {
                        newCellStates[cellKey].courses.push(course.courseCode);
                        isFirstCell = false;
                    }

                    if (startMinutes < 30) {
                        startMinutes = 30;
                    } else {
                        startHour++;
                        startMinutes = 0;
                    }
                }
            });
        });

        console.log("New Cell States:", newCellStates);
        setCellStates(newCellStates);
    }, [checkedCourses]);

    return (
        <div className="timetable">
            <h1>Time Table</h1>
            <table>
                <tr>
                    <th>&nbsp;</th>
                    {days.map(day => <th key={day}>{day}</th>)}
                </tr>
                {times.map(time => (
                    <tr key={time}>
                        <th className="time">{time.endsWith('00') ? time : <span>&nbsp;</span>}</th>
                        {days.map(day => {
                            const cellKey = `${day}-${time}`;
                            const cellInfo = cellStates[cellKey];

                            let cellClass = "";
                            let displayText = "";

                            if (cellInfo) {
                                cellClass = cellInfo.count > 1 ? "multiple-selected" : "selected";
                                if (cellInfo.courses.length > 0) {
                                    displayText = cellInfo.courses.join("  ⚔  ");
                                    console.log("This is cellInfo: ", cellInfo);
                                    console.log("This is cellInfo.courses: ", cellInfo.courses);
                                }
                            }

                            return (
                                <td key={cellKey} className={cellClass}>
                                    {displayText}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default TimeTable;
