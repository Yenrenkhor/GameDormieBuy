import React, { useState, useEffect } from 'react';

function CourseDropdown({ onSelect }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  let api_url = process.env.REACT_APP_API_URL

  useEffect(() => {
    fetchCourseNames();
  }, []);

  function fetchCourseNames() {
    fetch(`${api_url}/api/v1/course/all`)
      .then(response => {
        console.log('Response status:', response.status); // Debug logging
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch course names');
      })
      .then(data => {
        console.log('Fetched courses:', data); // Debug logging
        setCourses(data); // Assuming data is an array of course objects
      })
      .catch(error => {
        console.error('Error fetching course names:', error);
      });
  }

  function handleCourseSelect(e) {
    const courseName = e.target.value;
    setSelectedCourse(courseName);
    onSelect(courseName); // Pass selected course name to parent component
  }

  return (
    <div>
      <h2>Select Course:</h2>
      <select value={selectedCourse} onChange={handleCourseSelect}>
        <option value="">Select a course</option>
        {courses.map(course => (
          <option key={course.courseId} value={course.courseName}>{course.courseName}</option>
        ))}
      </select>
    </div>
  );
}

export default CourseDropdown;
