package com.golfGame.GameDormieBuy.course.model.web;

import com.golfGame.GameDormieBuy.course.model.GameMode;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class CreateCourseRequest {
    public String courseName;
    public List<Integer> par;
    public List<Integer> index;
    public GameMode gameMode;
}
