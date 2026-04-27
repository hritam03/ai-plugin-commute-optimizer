package com.pg.optimizer.service;

import com.pg.optimizer.dto.request.PgRequestDTO;
import com.pg.optimizer.dto.response.PgResponseDTO;

import java.util.List;

public interface PgService {

    PgResponseDTO addPg(PgRequestDTO dto);

    List<PgResponseDTO> getAllPgs();

    PgResponseDTO getPgById(Long id);
}
