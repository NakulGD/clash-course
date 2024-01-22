import React, { useState, useEffect } from 'react';
import { useCheckedCourses } from '../Contexts/CheckedCoursesContext';
import { CheckedCoursesProvider } from '../Contexts/CheckedCoursesContext';
import CourseItem from './CourseItem';
import './Styling/CourseList.css';

function CourseChecklist() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('1'); // Default to Semester 1
  const [courseSections, setCourseSections] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  //const { checkedCourses, addCheckedCourse, removeCheckedCourse } = useCheckedCourses();


  const [lectures, setLectures] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  const removeCourse = (courseName) => {
    const updatedCourseList = allCourses.filter((courseItem) => courseItem.courseName !== courseName)

    setAllCourses(updatedCourseList);
    localStorage.setItem('courses', JSON.stringify(updatedCourseList));
  };

  const clearSavedCourses = () => {
    localStorage.removeItem('courses');
    setAllCourses([]); // Reset the allCourses state
  };


  const [allCourses, setAllCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  function logCoursesFromLocalStorage() {
    const savedCoursesString = localStorage.getItem('courses');
    if (savedCoursesString) {
      const savedCourses = JSON.parse(savedCoursesString);
      console.log('Saved courses:', savedCourses);
    } else {
      console.log('No courses found in localStorage');
    }
  }

  useEffect(() => {
    logCoursesFromLocalStorage();
  }, [allCourses]);
  
  
  
  function Course(name, lecs, labs, tuts, disc) {
    this.courseName = name;
    this.lectures = lecs;
    this.laboratories = labs;
    this.tuts = tuts;
    this.discussions = disc;
  }

  /*
  useEffect(() => {
    console.log('Checked courses:', checkedCourses);
  }, [checkedCourses]);
  */


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

        const lectures = sections.filter(section => section.activity === 'Lecture').map(section => ({...section, selected: false}));
        const laboratories = sections.filter(section => section.activity === 'Laboratory').map(section => ({...section, selected: false}));
        const tutorials = sections.filter(section => section.activity === 'Tutorial').map(section => ({...section, selected: false}));
        const discussions = sections.filter(section => section.activity === 'Discussion').map(section => ({...section, selected: false}));

        setLectures(lectures);
        setLaboratories(laboratories);
        setTutorials(tutorials);
        setDiscussions(discussions);

        const listCourse = new Course(course, lectures, laboratories, tutorials, discussions);

        console.log("This is the course object: ", listCourse);

        setAllCourses(prevCourses => {
          const updatedCourses = [...prevCourses, listCourse];
          localStorage.setItem('courses', JSON.stringify(updatedCourses));
          return updatedCourses;
        });
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

      {allCourses.length > 0 && (
        allCourses.map((courseItem, index) => (
          <div key={courseItem.fullSectionCode} className="course-list-item">
          <CourseItem course={courseItem} />
          <button 
            onClick={() => removeCourse(courseItem.courseName)}
            className="remove-course-btn"
          >
            Remove
          </button>
        </div>
        ))
      )}

      <button onClick={clearSavedCourses}>Clear Saved Courses</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default CourseChecklist;
