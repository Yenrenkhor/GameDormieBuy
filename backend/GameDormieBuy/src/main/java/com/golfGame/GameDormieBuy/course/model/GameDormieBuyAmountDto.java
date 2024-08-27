package com.golfGame.GameDormieBuy.course.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameDormieBuyAmountDto {
    public int GameAmount;
    public int DormieAmount;
    public int BuyAmount;
}
