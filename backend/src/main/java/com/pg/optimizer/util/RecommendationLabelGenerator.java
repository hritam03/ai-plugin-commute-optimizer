package com.pg.optimizer.util;

import java.util.ArrayList;
import java.util.List;

public class RecommendationLabelGenerator {

    public static List<RecommendationLabel> generateLabels(

            double rent,
            double budget,
            double distance,
            int trafficScore,
            int lifestyleScore,
            boolean preferredAreaMatch

    ) {

        List<RecommendationLabel> labels =
                new ArrayList<>();

        /*
         * Budget Friendly
         */
        if (rent <= (budget * 0.6)
                &&
                distance <= 10) {

            labels.add(
                    RecommendationLabel
                            .BEST_BUDGET_CHOICE
            );
        }

        /*
         * Lifestyle
         */
        if (lifestyleScore >= 8) {

            labels.add(
                    RecommendationLabel
                            .BEST_LIFESTYLE_CHOICE
            );
        }

        /*
         * Commute
         */
        if (distance <= 5) {

            labels.add(
                    RecommendationLabel
                            .BEST_COMMUTE_CHOICE
            );
        }

        /*
         * Traffic Warning
         */
        if (trafficScore >= 8) {

            labels.add(
                    RecommendationLabel
                            .TRAFFIC_HEAVY_AREA
            );
        }

        /*
         * Preferred Area
         */
        if (preferredAreaMatch) {

            labels.add(
                    RecommendationLabel
                            .PREFERRED_AREA_MATCH
            );
        }

        return labels;
    }
}
