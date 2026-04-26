package com.pg.optimizer.service;
import com.pg.optimizer.dto.request.RecommendationRequestDTO;
import com.pg.optimizer.dto.response.RecommendationResponseDTO;

import java.util.List;

public interface RecommendationService {

    List<RecommendationResponseDTO> recommend(
            RecommendationRequestDTO requestDTO
    );
}
