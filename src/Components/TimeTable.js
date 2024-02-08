import React, { useState, useEffect } from 'react';
import { useCheckedCourses } from '../Contexts/CheckedCoursesContext';
import './Styling/TimeTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table } from 'react-bootstrap';

// Days and times to be displayed in the time table
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const fullDayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];

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
                        newCellStates[cellKey].courses.push(course.fullSectionCode);
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
        <Container fluid className="timetable-container">
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        {fullDayNames.map(day => (
                            <th key={day} className="days">
                            {day}
                          </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map(time => (
                        <tr key={time}>
                            <th className="time">
                                {time.endsWith('00') ? time : <span>&nbsp;</span>}
                            </th>
                            {days.map(day => {
                                
                                switch (day) {
                                    case "Mon": 
                                        day = "Monday";
                                        break;
                                    case "Tue": 
                                        day = "Tuesday";
                                        break;
                                    case "Wed": 
                                        day = "Wednesday";
                                        break;
                                    case "Thu": 
                                        day = "Thursday";
                                        break;
                                    case "Fri": 
                                        day = "Friday";
                                        break;
                                }
                                
                                const cellKey = `${day}-${time}`;
                                const cellInfo = cellStates[cellKey];

                                console.log("This is cellKey: ", cellKey);

                                let cellClass = "";
                                let displayText = "";

                                if (cellInfo) {
                                    cellClass = cellInfo.count > 1 ? "multiple-selected" : "selected";
                                    if (cellInfo.courses.length > 0) {
                                        displayText = cellInfo.courses.join("  ⚔  ");
                                        // console.log("This is cellInfo: ", cellInfo);
                                        // console.log("This is cellInfo.courses: ", cellInfo.courses);
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
                </tbody>
            </Table>
        </Container>
    );
};

export default TimeTable;
