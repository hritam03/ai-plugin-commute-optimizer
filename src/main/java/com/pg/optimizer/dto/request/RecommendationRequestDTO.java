package com.pg.optimizer.dto.request;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RecommendationRequestDTO {

    @NotNull
    private Double officeLatitude;

    @NotNull
    private Double officeLongitude;

    @NotNull
    private Double budget;
}