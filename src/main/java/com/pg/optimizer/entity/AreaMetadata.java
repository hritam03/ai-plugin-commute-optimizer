package com.pg.optimizer.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "area_metadata")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AreaMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String areaName;

    private Double latitude;

    private Double longitude;

    private Integer trafficScore;

    private Integer lifestyleScore;
}
