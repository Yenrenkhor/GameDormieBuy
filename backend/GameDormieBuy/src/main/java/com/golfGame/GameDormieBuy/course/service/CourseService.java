package com.golfGame.GameDormieBuy.course.service;

import com.golfGame.GameDormieBuy.course.model.Course;
import com.golfGame.GameDormieBuy.course.model.GameDormieBuyAmountDto;
import com.golfGame.GameDormieBuy.course.model.web.CalculateRequest;
import com.golfGame.GameDormieBuy.course.model.web.CalculateResponse;
import com.golfGame.GameDormieBuy.course.model.web.CreateCourseRequest;
import com.golfGame.GameDormieBuy.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CourseService implements CourseServiceImpl {

    @Autowired
    CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseByName(String courseName) {
        Course course = courseRepository.findByCourseName(courseName);
        if (course == null) {
            throw new RuntimeException("Course not found");
        }
        return course;
    }

    public void createCourse(CreateCourseRequest courseDto) {
        Course course = Course.builder()
                .courseId(UUID.randomUUID())
                .courseName(courseDto.getCourseName())
                .par(courseDto.getPar())
                .index(courseDto.getIndex())
                .gameMode(courseDto.getGameMode())
                .build();
        courseRepository.save(course);
    }

    public CalculateResponse calculate(CalculateRequest calculateRequest) {
        CalculateResponse response = new CalculateResponse();
        int[][] strokeMatrix = preprocessStroke(calculateRequest.strokes);
        CalculateResponse output = calculateScore(calculateRequest.getPlayerScores(), calculateRequest.coursePar,
                calculateRequest.courseIndex, calculateRequest.gameAmount, strokeMatrix);
        response.setResult(output.result);
        return response;
    }

    private int[][] preprocessStroke(HashMap<String, List<Integer>> strokes) {
        int numPlayers = strokes.size();
        int[][] strokeMatrix = new int[numPlayers][numPlayers];
        int i = 0;
        for (List<Integer> strokeList : strokes.values()) {
            for (int j = 0; j < numPlayers; j++) {
                if (strokeList.get(j) == null) {
                    strokeMatrix[i][j] = 0;
                }
                else {
                    strokeMatrix[i][j] = strokeList.get(j);
                }
            }
            i += 1;
        }
        return strokeMatrix;
    }

    private static CalculateResponse calculateScore(HashMap<String, List<Integer>> playerScores, List<Integer> par,
                                                    List<Integer> index, GameDormieBuyAmountDto gameDormieBuyAmount,
                                                    int[][] strokes) {
        List<HashMap<String, Integer>> results = new ArrayList<>();
        int gameAmount = gameDormieBuyAmount.GameAmount;
        int numHoles = index.size();
        List<String> players = new ArrayList<>(playerScores.keySet());

        for (int i = 0; i < players.size(); i++) {
            for (int j = i + 1; j < players.size(); j++) {
                String playerA = players.get(i);
                String playerB = players.get(j);
                HashMap<String, Integer> playerTotalScores = new HashMap<>();
                playerTotalScores.put(playerA, 0);
                playerTotalScores.put(playerB, 0);
                int winCount = 0;
                int strokeAdvantages = strokes[i][j];
                for (int hole = 0; hole < numHoles; hole++) {
                    int scoreA = playerScores.get(playerA).get(hole);
                    int scoreB = playerScores.get(playerB).get(hole);
                    int dormie = numHoles - hole + 1;
                    int currentIndex = index.get(hole);
                    int extraStrokes = 0;
                    if (strokeAdvantages != 0) {
                        extraStrokes = strokeAdvantageCalculation(numHoles, strokeAdvantages, currentIndex);
                    }

                    boolean dormieInPlay = false;
                    if (strokeAdvantages > 0) {
                        scoreB += extraStrokes;
                    }
                    else {
                        scoreA += extraStrokes;
                    }
                    // Dormie in play
                    if (Math.abs(winCount) == dormie && !dormieInPlay) {
                        gameAmount = gameDormieBuyAmount.DormieAmount;
                        dormieInPlay = true;
                        winCount = 0;
                    }
                    // Buy in play
                    else if (Math.abs(winCount) > dormie && dormieInPlay) {
                        gameAmount += gameDormieBuyAmount.BuyAmount;
                    }

                    if (scoreA < scoreB) {
                        int bonus = achievementBonusWaterfall(scoreA, par.get(hole));
                        playerTotalScores.put(playerA, playerTotalScores.get(playerA) + (gameAmount * bonus));
                        playerTotalScores.put(playerB, playerTotalScores.get(playerB) - (gameAmount * bonus));
                        winCount += 1;
                    } else if (scoreA > scoreB) {
                        int bonus = achievementBonusWaterfall(scoreB, par.get(hole));
                        playerTotalScores.put(playerA, playerTotalScores.get(playerA) - (gameAmount * bonus));
                        playerTotalScores.put(playerB, playerTotalScores.get(playerB) + (gameAmount * bonus));
                        winCount -= 1;
                    }
                }
                results.add(playerTotalScores);
            }
        }
        return CalculateResponse.builder().result(results).build();

    }

    private static int achievementBonusWaterfall(int score, int par) {
        if (score == par - 1)
            return 2;
        if (par == 4 && score == 2)
            return 3;
        return 1;
    }

    private static int strokeAdvantageCalculation(int numHoles, int strokeAdvantages, int currentIndex) {
        int extraStrokes = 0;
        int absStokeAdvantage = Math.abs(strokeAdvantages);
        int additionalStroke = absStokeAdvantage / numHoles;
        int remaining = absStokeAdvantage % numHoles;
        if (currentIndex <= absStokeAdvantage) {
            extraStrokes += additionalStroke;
            if (remaining > 0 && currentIndex <= remaining) {
                extraStrokes += 1;
            }
        }
        return extraStrokes;
    }
}
