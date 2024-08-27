package com.golfGame.GameDormieBuy.course.model.web;

import lombok.*;

import java.util.HashMap;
import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalculateResponse {

    public List<HashMap<String, Integer>> result;

}
