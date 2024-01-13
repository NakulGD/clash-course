// src/components/CourseChecklist.js
import React, { useState } from 'react';

function CourseChecklist() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('1'); // Default to Semester 1
  const [courseSections, setCourseSections] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course) return;
    setLoading(true);
    setError('');
    setCourseSections([]);
    try {
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
      const sections = await response.json();
      if (sections.length === 0) {
        setError(`The course ${course} is not offered in Semester ${semester}.`);
      } else {
        setCourseSections(sections.map(section => ({ ...section, selected: false })));
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

  const toggleSection = index => {
    const newCourseSections = [...courseSections];
    newCourseSections[index].selected = !newCourseSections[index].selected;
    setCourseSections(newCourseSections);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course Name"
        />
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Add Course'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {courseSections.length > 0 && (
        <div>
          <h3>{course}</h3>
          <ul className='course-sections-list'>
            {courseSections.map((section, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`section-${index}`}
                  checked={section.selected}
                  onChange={() => toggleSection(index)}
                />
                <label htmlFor={`section-${index}`}>
                  {section.activity} ({section.sectionCode}) {section.days} {section.startTime}-{section.endTime}
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
