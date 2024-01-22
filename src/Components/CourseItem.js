import React, { useState, useEffect } from 'react';
import './Styling/CourseItem.css';
import { useCheckedCourses } from '../Contexts/CheckedCoursesContext';


const CourseItem = ({ course }) => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({ lectures: false, labs: false, tuts: false, disc: false });
  const { checkedCourses, addCheckedCourse, removeCheckedCourse } = useCheckedCourses();


  const toggleMenu = () => setOpen(!open);
  const toggleSubmenu = (type) => setSubmenuOpen({ ...submenuOpen, [type]: !submenuOpen[type] });

  const handleCheckboxChange = (section, isChecked) => {
    if (isChecked) {
      addCheckedCourse(section);
    } else {
      removeCheckedCourse(section.fullSectionCode);
    }
  };

  
  useEffect(() => {
    console.log('Checked courses:', checkedCourses);
  }, [checkedCourses]);
  

  return (
    <div className='course-item-container'>
      <div className='course-name' onClick={toggleMenu}>{course.courseName}</div>
      {open && (
        <div>
          {course.lectures.length > 0 && (
            <div className='lecture-submenu-container'>
              <div className='submenu' onClick={() => toggleSubmenu('lectures')}>Lectures</div>
              {submenuOpen.lectures && (
                <ul className='submenu-list lecture-item'>
                  {course.lectures.map((lecture, index) => (
                    <li key={lecture.fullSectionCode}>
                      <input 
                        type="checkbox" id={`lecture_${index}`} 
                        checked={checkedCourses.some(c => c.fullSectionCode === lecture.fullSectionCode)}
                        onChange={(e) => handleCheckboxChange(lecture, e.target.checked)}
                      />
                      <label htmlFor={`lecture_${index}`}>({lecture.sectionCode}) {lecture.days.join(' ')} {lecture.startTime}-{lecture.endTime}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {course.laboratories.length > 0 && (
            <div className='lab-submenu-container'>
              <div className='submenu' onClick={() => toggleSubmenu('labs')}>Laboratories</div>
              {submenuOpen.labs && (
                <ul className='submenu-list lab-item'>
                  {course.laboratories.map((lab, index) => (
                    <li key={lab.fullSectionCode}>
                      <input 
                        type="checkbox" id={`lab_${index}`} 
                        checked={checkedCourses.some(c => c.fullSectionCode === lab.fullSectionCode)}
                        onChange={(e) => handleCheckboxChange(lab, e.target.checked)}
                      />
                      <label htmlFor={`lab_${index}`}>({lab.sectionCode}) {lab.days.join(' ')} {lab.startTime}-{lab.endTime}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {course.tuts.length > 0 && (
            <div className='tut-submenu-container'>
              <div className='submenu' onClick={() => toggleSubmenu('tuts')}>Tutorials</div>
              {submenuOpen.tuts && (
                <ul className='submenu-list tut-item'>
                  {course.tuts.map((tut, index) => (
                    <li key={tut.fullSectionCode}>
                      <input 
                        type="checkbox" id={`tut_${index}`} 
                        checked={checkedCourses.some(c => c.fullSectionCode === tut.fullSectionCode)}
                        onChange={(e) => handleCheckboxChange(tut, e.target.checked)}
                      />
                      <label htmlFor={`tut_${index}`}> ({tut.sectionCode}) {tut.days.join(' ')} {tut.startTime}-{tut.endTime}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {course.discussions.length > 0 && (
            <div className='disc-submenu-container'>
              <div className='submenu' onClick={() => toggleSubmenu('disc')}>Discussions</div>
              {submenuOpen.disc && (
                <ul className='submenu-list disc-item'>
                  {course.discussions.map((disc, index) => (
                    <li key={disc.fullSectionCode}>
                      <input 
                        type="checkbox" id={`disc_${index}`} 
                        checked={checkedCourses.some(c => c.fullSectionCode === disc.fullSectionCode)}
                        onChange={(e) => handleCheckboxChange(disc, e.target.checked)}
                      />
                      <label htmlFor={`disc_${index}`}> ({disc.sectionCode}) {disc.days.join(' ')} {disc.startTime}-{disc.endTime}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseItem;
