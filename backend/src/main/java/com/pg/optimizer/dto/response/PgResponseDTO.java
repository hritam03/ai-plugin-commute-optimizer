package com.pg.optimizer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PgResponseDTO {

    private Long id;

    private String name;

    private String area;

    private String roomType;

    private Double rent;

    private Boolean foodIncluded;
}