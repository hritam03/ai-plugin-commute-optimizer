package com.pg.optimizer.controller;

import com.pg.optimizer.dto.request.RecommendationRequestDTO;
import com.pg.optimizer.dto.response.RecommendationResponseDTO;
import com.pg.optimizer.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping
    public List<RecommendationResponseDTO> recommend(
            @Valid @RequestBody
            RecommendationRequestDTO requestDTO
    ) {

        return recommendationService.recommend(requestDTO);
    }
}
