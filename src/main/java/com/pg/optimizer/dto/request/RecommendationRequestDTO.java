package com.pg.optimizer.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RecommendationRequestDTO {

    @NotBlank(message = "Office location is required")
    private String officeLocation;

    private String preferredArea;

    @NotNull(message = "Budget is required")
    private Double budget;
}