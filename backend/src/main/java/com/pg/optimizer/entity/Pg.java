package com.pg.optimizer.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pg_listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String area;

    @Column(name = "room_type")
    private String roomType;

    private Double rent;

    @Column(name = "food_included")
    private Boolean foodIncluded;

    private Double latitude;

    private Double longitude;
}