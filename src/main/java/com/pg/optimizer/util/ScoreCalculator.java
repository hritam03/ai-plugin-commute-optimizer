package com.pg.optimizer.util;

public class ScoreCalculator {

    public static double calculateScore(
            double rent,
            double budget,
            double distance
    ) {

        double rentScore = (budget - rent) / budget;

        double distanceScore = 1 / (1 + distance);

        return (0.7 * rentScore) + (0.3 * distanceScore);
    }
}