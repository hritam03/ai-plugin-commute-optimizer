package com.pg.optimizer.service.impl;

import com.pg.optimizer.dto.request.RecommendationRequestDTO;
import com.pg.optimizer.dto.response.RecommendationResponseDTO;
import com.pg.optimizer.entity.AreaMetadata;
import com.pg.optimizer.entity.Pg;
import com.pg.optimizer.repository.PgRepository;
import com.pg.optimizer.service.RecommendationService;
import com.pg.optimizer.util.Constants;
import com.pg.optimizer.util.DistanceCalculator;
import com.pg.optimizer.util.ScoreCalculator;
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

    @Override
    public List<RecommendationResponseDTO> recommend(
            RecommendationRequestDTO requestDTO
    ) {

        log.info("Generating smart recommendations");

        AreaMetadata office =
                Constants.OFFICE_LOCATIONS.get(
                        requestDTO.getOfficeLocation()
                );

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
                Constants.AREA_METADATA.get(pg.getArea());

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
                        areaMetadata.getLifestyleScore()
                );

        String recommendationReason =
                buildRecommendationReason(
                        requestDTO,
                        areaMetadata,
                        distance
                );

        return RecommendationResponseDTO.builder()
                .id(pg.getId())
                .name(pg.getName())
                .area(pg.getArea())
                .roomType(pg.getRoomType())
                .rent(pg.getRent())
                .distance(distance)
                .score(score)
                .recommendationReason(recommendationReason)
                .build();
    }

    private String buildRecommendationReason(
            RecommendationRequestDTO requestDTO,
            AreaMetadata areaMetadata,
            double distance
    ) {

        if (requestDTO.getPreferredArea() != null
                && requestDTO.getPreferredArea()
                .equalsIgnoreCase(areaMetadata.getAreaName())) {

            if (distance > 7) {

                return "Preferred area has higher commute burden and traffic. Nearby areas may offer better daily travel experience.";
            }

            return "Preferred area matches well with office commute and lifestyle.";
        }

        if (distance < 5) {

            return "Recommended due to shorter commute and balanced affordability.";
        }

        return "Recommended for better budget utilization despite moderate commute.";
    }
}