package com.golfGame.GameDormieBuy.course.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Course {
    @Id
    @Column(name = "course_id")
    public UUID courseId;
    @Column(name = "course_name")
    public String courseName;
    @Column(name = "par")
    public List<Integer> par;
    @Column(name = "index")
    public List<Integer> index;
    @Column(name = "game_mode")
    @Enumerated(EnumType.STRING)
    public GameMode gameMode;

}
