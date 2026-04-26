package com.pg.optimizer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PgRequestDTO {

    @NotBlank(message = "PG name is required")
    private String name;

    @NotBlank(message = "Area is required")
    private String area;

    @NotBlank(message = "Room type is required")
    private String roomType;

    @NotNull(message = "Rent is required")
    private Double rent;

    @NotNull(message = "Food Included field is required")
    private Boolean foodIncluded;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;
}