package com.pg.optimizer.util;

public class RecommendationInsightGenerator {

    public static String getBudgetFit(
            double rent,
            double budget
    ) {

        double ratio = rent / budget;

        if (ratio <= 0.6) {
            return "Excellent budget fit";
        }

        if (ratio <= 0.8) {
            return "Moderate budget fit";
        }

        return "Expensive for selected budget";
    }

    public static String getCommuteBurden(
            double distance
    ) {

        if (distance <= 5) {
            return "Low commute burden";
        }

        if (distance <= 12) {
            return "Moderate commute burden";
        }

        return "High commute burden";
    }

    public static String getTrafficInsight(
            int trafficScore
    ) {

        if (trafficScore <= 4) {
            return "Low traffic congestion";
        }

        if (trafficScore <= 7) {
            return "Moderate traffic congestion";
        }

        return "High traffic congestion";
    }

    public static String getLifestyleFit(
            int lifestyleScore
    ) {

        if (lifestyleScore >= 8) {
            return "Excellent lifestyle options";
        }

        if (lifestyleScore >= 5) {
            return "Balanced lifestyle options";
        }

        return "Limited lifestyle options";
    }

    public static String buildRecommendationReason(
            String budgetFit,
            String commuteBurden,
            String trafficInsight
    ) {

        return budgetFit
                + " with "
                + commuteBurden.toLowerCase()
                + " and "
                + trafficInsight.toLowerCase()
                + ".";
    }
    public static String buildOverallRecommendation(
            String budgetFit,
            String commuteBurden,
            String lifestyleFit,
            String preferredArea,
            String currentArea
    ) {

        if (preferredArea != null
                && preferredArea.equalsIgnoreCase(currentArea)) {

            return "Matches your preferred area preference with balanced living experience.";
        }

        if (budgetFit.contains("Excellent")
                && commuteBurden.contains("Low")) {

            return "Highly recommended for affordability and minimal daily travel stress.";
        }

        if (lifestyleFit.contains("Excellent")) {

            return "Recommended for strong lifestyle and social accessibility.";
        }

        if (commuteBurden.contains("High")) {

            return "Suitable for budget-conscious users despite longer commute burden.";
        }

        return "Provides balanced affordability and commute optimization.";
    }
}