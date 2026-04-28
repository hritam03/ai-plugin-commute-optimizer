package com.pg.optimizer.util;

public class ScoreCalculator {

    public static double calculateScore(
            double rent,
            double budget,
            double distance,
            int trafficScore,
            int lifestyleScore,
            boolean preferredAreaMatch
    ) {

        /*
         * Budget Score
         */
        double budgetScore =
                Math.max(
                        0,
                        (budget - rent) / budget
                );

        /*
         * Commute Score
         */
        double commuteScore =
                1 / (1 + distance);

        /*
         * Lifestyle Score
         */
        double lifestyleNormalized =
                lifestyleScore / 10.0;

        /*
         * Traffic Penalty
         */
        double trafficPenalty =
                trafficScore / 10.0;

        /*
         * Preferred Area Bonus
         */
        double preferredAreaBonus =
                preferredAreaMatch ? 1.0 : 0.0;

        /*
         * Final Weighted Score
         */
        return
                (0.35 * budgetScore)
                        + (0.25 * commuteScore)
                        + (0.20 * lifestyleNormalized)
                        + (0.10 * preferredAreaBonus)
                        - (0.10 * trafficPenalty);
    }
}