package com.pg.optimizer.util;

public class ScoreCalculator {

    public static double calculateScore(
            double rent,
            double budget,
            double distance,
            int trafficScore,
            int lifestyleScore
    ) {

        double budgetScore =
                (budget - rent) / budget;

        double commuteScore =
                1 / (1 + distance);

        double normalizedTraffic =
                1 - (trafficScore / 10.0);

        double normalizedLifestyle =
                lifestyleScore / 10.0;

        return
                (0.4 * budgetScore)
                        + (0.3 * commuteScore)
                        + (0.2 * normalizedLifestyle)
                        + (0.1 * normalizedTraffic);
    }
}