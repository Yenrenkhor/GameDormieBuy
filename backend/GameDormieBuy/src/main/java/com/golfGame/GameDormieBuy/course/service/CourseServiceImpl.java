package com.golfGame.GameDormieBuy.course.service;

import com.golfGame.GameDormieBuy.course.model.Course;
import com.golfGame.GameDormieBuy.course.model.web.CalculateRequest;
import com.golfGame.GameDormieBuy.course.model.web.CalculateResponse;
import com.golfGame.GameDormieBuy.course.model.web.CreateCourseRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CourseServiceImpl {
    List<Course> getAllCourses();
    Course getCourseByName(String courseName);
    void createCourse(CreateCourseRequest courseDto);
    CalculateResponse calculate(CalculateRequest calculateRequest);
}
