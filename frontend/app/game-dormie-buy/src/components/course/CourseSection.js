import React from 'react';

function CourseSection({ coursePar, courseIndex, handleCourseParChange, handleCourseIndexChange }) {
  return (
    <thead>
      <tr>
        <th></th>
        {Array.from({ length: 18 }, (_, i) => (
          <th key={i}>{i + 1}</th>
        ))}
      </tr>
      <tr>
        <th>Course Par</th>
        {coursePar.map((par, i) => (
          <th key={i}>
            <input
              type="number"
              value={par}
              onChange={(e) => handleCourseParChange(i, e.target.value)}
              className="course-input"
            />
          </th>
        ))}
      </tr>
      <tr>
        <th>Course Index</th>
        {courseIndex.map((index, i) => (
          <th key={i}>
            <input
              type="number"
              value={index}
              onChange={(e) => handleCourseIndexChange(i, e.target.value)}
              className="course-input"
            />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default CourseSection;
