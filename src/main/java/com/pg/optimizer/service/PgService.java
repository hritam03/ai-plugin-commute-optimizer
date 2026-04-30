package com.pg.optimizer.service;

import com.pg.optimizer.dto.request.PgRequestDTO;
import com.pg.optimizer.dto.response.PagedResponse;
import com.pg.optimizer.dto.response.PgResponseDTO;

public interface PgService {

    PgResponseDTO addPg(PgRequestDTO dto);

    PagedResponse<PgResponseDTO> getAllPgs(
            int page, int size,
            String area, Double maxRent);

    PgResponseDTO getPgById(Long id);
}
