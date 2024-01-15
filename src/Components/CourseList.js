import React, { useState, useEffect } from 'react';
import { useCheckedCourses } from '../Contexts/CheckedCoursesContext';
import './Styling/CourseList.css';

function CourseChecklist() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('1'); // Default to Semester 1
  const [courseSections, setCourseSections] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { checkedCourses, addCheckedCourse, removeCheckedCourse } = useCheckedCourses();

  useEffect(() => {
    console.log('Checked courses:', checkedCourses);
  }, [checkedCourses]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course) return;

    setLoading(true);
    setError('');
    setCourseSections([]);


    try {            /// calling back-end with the stringified course and semester inputs, awaits for response
      const response = await fetch('http://localhost:5000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseName: course, semester }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const sections = await response.json(); /// 'sections' array is being initialized with the data in the JSON object (expected to be an array)
      if (sections.length === 0) {
        setError(`The course ${course} is not offered in Semester ${semester}.`);
      } else {
        setCourseSections(sections.map(section => ({ ...section, selected: false })));    /// creates a new 'section' obj for every existing section with a new "selected:" property initialized to 'false'
      }
    } catch (error) {
      if (error.message === 'Network response was not ok') {
        setError(`The course ${course} could not be found.`);
      } else {
        setError('There was an error fetching course data.');
      }
      console.error('Error fetching course data:', error);
    }
    setLoading(false);
    setCourse('');
  };

  const toggleSection = (section, index) => {
    const newCourseSections = [...courseSections];
    newCourseSections[index] = {
      ...newCourseSections[index],
      selected: !newCourseSections[index].selected
    };
    setCourseSections(newCourseSections);

    const sectionData = {
      courseCode: `${course} ${newCourseSections[index].fullSectionCode}`,
      days: newCourseSections[index].days,
      startTime: newCourseSections[index].startTime,
      endTime: newCourseSections[index].endTime
    };

    if (newCourseSections[index].selected) {
      addCheckedCourse(sectionData);
      console.log(`Adding section: ${sectionData.courseCode}`);
    } else {
      removeCheckedCourse(sectionData.courseCode);
      console.log(`Removing section: ${sectionData.courseCode}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="semester-selector">
          <label>
            <input
              type="radio"
              value="1"
              checked={semester === '1'}
              onChange={() => setSemester('1')}
            />
            Semester 1
          </label>
          <label>
            <input
              type="radio"
              value="2"
              checked={semester === '2'}
              onChange={() => setSemester('2')}
            />
            Semester 2
          </label>
        </div>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course Name"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Add Course'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {courseSections.length > 0 && (
        <div>
          <h3>{course}</h3> {/* THIS DOES NOT WORK AS INTENDED*/}
          <ul className='course-sections-list'>
            {courseSections.map((section, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`section-${index}`}
                  checked={section.selected}
                  onChange={() => toggleSection(section, index)} // Pass both section and index
                />
                <label htmlFor={`section-${index}`}>
                  {section.activity} ({section.sectionCode}) {section.days.join(' ')} {section.startTime}-{section.endTime}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CourseChecklist;
