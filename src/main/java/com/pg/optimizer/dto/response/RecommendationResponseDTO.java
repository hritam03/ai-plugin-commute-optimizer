package com.pg.optimizer.dto.response;

import com.pg.optimizer.util.RecommendationLabel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecommendationResponseDTO {

    private Long id;

    private String name;

    private String area;

    private String roomType;

    private Double rent;

    private Double distance;

    private Double score;

    private String budgetFit;

    private String commuteBurden;

    private String trafficInsight;

    private String lifestyleFit;

    private String recommendationReason;

    private String overallRecommendation;

    private List<RecommendationLabel> labels;
}


