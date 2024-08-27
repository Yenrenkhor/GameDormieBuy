package com.golfGame.GameDormieBuy.course.model.web;

import com.golfGame.GameDormieBuy.course.model.GameDormieBuyAmountDto;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@Data
@Builder
@Setter
public class CalculateRequest {

    public List<Integer> coursePar;
    public List<Integer> courseIndex;
    public HashMap<String, List<Integer>> playerScores;
    public HashMap<String, List<Integer>> strokes;
    public Integer gameMode;
    public GameDormieBuyAmountDto gameAmount;
}
