package com.pg.optimizer.service.impl;

import com.pg.optimizer.dto.request.RecommendationRequestDTO;
import com.pg.optimizer.dto.response.RecommendationResponseDTO;
import com.pg.optimizer.entity.Pg;
import com.pg.optimizer.repository.PgRepository;
import com.pg.optimizer.service.RecommendationService;
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

        log.info("Generating recommendations");

        return pgRepository.findAll()
                .stream()
                .map(pg -> buildRecommendation(pg, requestDTO))
                .sorted(
                        Comparator.comparingDouble(
                                RecommendationResponseDTO::getScore
                        ).reversed()
                )
                .toList();
    }

    private RecommendationResponseDTO buildRecommendation(
            Pg pg,
            RecommendationRequestDTO requestDTO
    ) {

        double distance =
                DistanceCalculator.calculateDistance(
                        requestDTO.getOfficeLatitude(),
                        requestDTO.getOfficeLongitude(),
                        pg.getLatitude(),
                        pg.getLongitude()
                );

        double score =
                ScoreCalculator.calculateScore(
                        pg.getRent(),
                        requestDTO.getBudget(),
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
                .build();
    }
}
