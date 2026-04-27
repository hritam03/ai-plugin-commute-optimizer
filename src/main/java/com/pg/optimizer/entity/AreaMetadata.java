package com.pg.optimizer.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AreaMetadata {

    private String areaName;

    private Double latitude;

    private Double longitude;

    private Integer trafficScore;

    private Integer lifestyleScore;
}
