package com.pg.optimizer.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PgResponseDTO {

    private Long id;

    private String name;

    private String area;

    private String roomType;

    private Double rent;

    private Boolean foodIncluded;
}