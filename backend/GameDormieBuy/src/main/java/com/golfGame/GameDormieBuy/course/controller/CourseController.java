package com.golfGame.GameDormieBuy.course.controller;

import com.golfGame.GameDormieBuy.course.model.Course;
import com.golfGame.GameDormieBuy.course.model.web.CalculateRequest;
import com.golfGame.GameDormieBuy.course.model.web.CalculateResponse;
import com.golfGame.GameDormieBuy.course.model.web.CreateCourseRequest;
import com.golfGame.GameDormieBuy.course.service.CourseServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class CourseController {

    @Autowired
    CourseServiceImpl courseService;

    @GetMapping("/course/all")
    public ResponseEntity<List<Course>> getCourse() {
        return ResponseEntity.ok(courseService.getAllCourses());

    }

    @GetMapping("/course")
    @ResponseBody
    public ResponseEntity<Course> getAllCourses(@RequestParam String courseName) {
        return ResponseEntity.ok(courseService.getCourseByName(courseName));
    }

    @PostMapping("/course/create")
    public ResponseEntity<?> createCourse(@RequestBody CreateCourseRequest course) {
        courseService.createCourse(course);
        return ResponseEntity.ok("Course created");
    }

    @PostMapping("/calculate")
    @ResponseBody
    public ResponseEntity<CalculateResponse> calculate(@RequestBody CalculateRequest calculateRequest) {
        CalculateResponse response = courseService.calculate(calculateRequest);
        return ResponseEntity.ok(response);
    }
}
