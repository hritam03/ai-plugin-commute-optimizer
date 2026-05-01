package com.pg.optimizer.service.impl;

import com.pg.optimizer.dto.request.RecommendationRequestDTO;
import com.pg.optimizer.dto.response.RecommendationResponseDTO;
import com.pg.optimizer.entity.AreaMetadata;
import com.pg.optimizer.entity.Pg;
import com.pg.optimizer.exception.AreaNotFoundException;
import com.pg.optimizer.exception.OfficeLocationNotFoundException;
import com.pg.optimizer.repository.AreaMetadataRepository;
import com.pg.optimizer.repository.PgRepository;
import com.pg.optimizer.service.RecommendationService;
import com.pg.optimizer.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationServiceImpl
        implements RecommendationService {

    private final PgRepository pgRepository;
    private final AreaMetadataRepository areaMetadataRepository;

    @Override
    public List<RecommendationResponseDTO> recommend(
            RecommendationRequestDTO requestDTO
    ) {

        log.info("Generating smart recommendations");

        AreaMetadata office =
                Constants.OFFICE_LOCATIONS.get(
                        requestDTO.getOfficeLocation()
                );

        if(office == null){
            throw new OfficeLocationNotFoundException("Invalid office location: " + requestDTO.getOfficeLocation());
        }
        return pgRepository.findAll()
                .stream()
                .map(pg -> buildRecommendation(
                        pg,
                        requestDTO,
                        office
                ))
                .sorted(
                        Comparator.comparingDouble(
                                RecommendationResponseDTO::getScore
                        ).reversed()
                )
                .toList();
    }

    private RecommendationResponseDTO buildRecommendation(
            Pg pg,
            RecommendationRequestDTO requestDTO,
            AreaMetadata office
    ) {

        AreaMetadata areaMetadata =
                areaMetadataRepository.findByAreaName(
                        pg.getArea()
                ).orElse(null);

        if(areaMetadata == null){
            throw new AreaNotFoundException(
                    "Area metadata not found for area: "
                            + pg.getArea()
            );
        }

        boolean preferredAreaMatch =
                requestDTO.getPreferredArea() != null
                        &&
                        requestDTO.getPreferredArea()
                                .equalsIgnoreCase(
                                        pg.getArea()
                                );

        double distance =
                DistanceCalculator.calculateDistance(
                        office.getLatitude(),
                        office.getLongitude(),
                        areaMetadata.getLatitude(),
                        areaMetadata.getLongitude()
                );

        double score =
                ScoreCalculator.calculateScore(
                        pg.getRent(),
                        requestDTO.getBudget(),
                        distance,
                        areaMetadata.getTrafficScore(),
                        areaMetadata.getLifestyleScore(),
                        preferredAreaMatch
                );

        if(Double.isNaN(score) || Double.isInfinite(score)){

            log.warn(
                    "Score calculation resulted in invalid value for PG ID: {}",
                    pg.getId()
            );

            score = 0.0;
        }

        // ✅ Generate Insights
        String budgetFit =
                RecommendationInsightGenerator.getBudgetFit(
                        pg.getRent(),
                        requestDTO.getBudget()
                );

        String commuteBurden =
                RecommendationInsightGenerator.getCommuteBurden(
                        distance
                );

        String trafficInsight =
                RecommendationInsightGenerator.getTrafficInsight(
                        areaMetadata.getTrafficScore()
                );

        String lifestyleFit =
                RecommendationInsightGenerator.getLifestyleFit(
                        areaMetadata.getLifestyleScore()
                );

        String recommendationReason =
                RecommendationInsightGenerator.buildRecommendationReason(
                        budgetFit,
                        commuteBurden,
                        trafficInsight
                );

        String overallRecommendation =
                RecommendationInsightGenerator
                        .buildOverallRecommendation(
                                budgetFit,
                                commuteBurden,
                                lifestyleFit,
                                requestDTO.getPreferredArea(),
                                pg.getArea()
                        );

        List<RecommendationLabel> labels =
                RecommendationLabelGenerator.generateLabels(

                        pg.getRent(),
                        requestDTO.getBudget(),
                        distance,
                        areaMetadata.getTrafficScore(),
                        areaMetadata.getLifestyleScore(),
                        preferredAreaMatch
                );

        return RecommendationResponseDTO.builder()
                .id(pg.getId())
                .name(pg.getName())
                .area(pg.getArea())
                .roomType(pg.getRoomType())
                .rent(pg.getRent())
                .distance(distance)
                .score(score)
                .budgetFit(budgetFit)
                .commuteBurden(commuteBurden)
                .trafficInsight(trafficInsight)
                .lifestyleFit(lifestyleFit)
                .recommendationReason(recommendationReason)
                .overallRecommendation(overallRecommendation)
                .labels(labels)
                .build();
    }
}