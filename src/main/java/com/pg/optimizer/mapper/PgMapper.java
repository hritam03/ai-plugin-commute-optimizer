package com.pg.optimizer.mapper;

import com.pg.optimizer.dto.request.PgRequestDTO;
import com.pg.optimizer.dto.response.PgResponseDTO;
import com.pg.optimizer.entity.Pg;

public class PgMapper {

    public static Pg toEntity(PgRequestDTO dto) {

        return Pg.builder()
                .name(dto.getName())
                .area(dto.getArea())
                .roomType(dto.getRoomType())
                .rent(dto.getRent())
                .foodIncluded(dto.getFoodIncluded())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .build();
    }

    public static PgResponseDTO toResponseDTO(Pg pg) {

        return PgResponseDTO.builder()
                .id(pg.getId())
                .name(pg.getName())
                .area(pg.getArea())
                .roomType(pg.getRoomType())
                .rent(pg.getRent())
                .foodIncluded(pg.getFoodIncluded())
                .build();
    }
}
