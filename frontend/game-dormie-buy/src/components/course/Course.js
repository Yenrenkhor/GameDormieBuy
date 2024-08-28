import React, { useState } from 'react';
import CourseDropdown from './CourseDropdown';
import CourseDetails from './CourseDetails';

function Course() {
  const [selectedCourse, setSelectedCourse] = useState('');

  function handleCourseSelect(courseName) {
    setSelectedCourse(courseName);
  }

  return (
    <div>
      <h1>Course Details</h1>
      <CourseDropdown onSelect={handleCourseSelect} />
      {selectedCourse && <CourseDetails courseName={selectedCourse} />}
    </div>
  );
}

export default Course;
