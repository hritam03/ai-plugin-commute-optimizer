package com.pg.optimizer.service;

import com.pg.optimizer.dto.request.PgRequestDTO;
import com.pg.optimizer.dto.response.PagedResponseDTO;
import com.pg.optimizer.dto.response.PgResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PgService {

    PgResponseDTO addPg(PgRequestDTO dto);

    Page<PgResponseDTO> getAllPgs(
            int page,
            int size
    );

    PgResponseDTO getPgById(Long id);
}
