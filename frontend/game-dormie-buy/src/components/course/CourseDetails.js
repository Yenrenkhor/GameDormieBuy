import React, { useEffect, useState } from 'react';

function CourseDetails({ courseName }) {
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    if (courseName) {
      fetchCourseDetails(courseName);
    }
  }, [courseName]);

  function fetchCourseDetails(courseName) {
    fetch(`http://localhost:8080/api/v1/course?courseName=${encodeURIComponent(courseName)}`)
      .then(response => {
        console.log('Response status:', response.status); // Debug logging
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Failed to fetch details for ${courseName}`);
      })
      .then(data => {
        console.log('Fetched course details:', data); // Debug logging
        setCourseDetails(data);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  }

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Course Name: {courseDetails.courseName}</h2>
      <p>Game Mode: {courseDetails.gameMode}</p>
      <h3>Score Table</h3>
      <table className="score-table">
        <thead>
          <tr>
            <th>Hole</th>
            {courseDetails.par.map((_, index) => (
              <th key={index}>{index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Par</th>
            {courseDetails.par.map((par, index) => (
              <td key={index}>{par}</td>
            ))}
          </tr>
          <tr>
            <th>Index</th>
            {courseDetails.index.map((index, i) => (
              <td key={i}>{index}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CourseDetails;
