package com.pg.optimizer.service.impl;

import com.pg.optimizer.dto.request.PgRequestDTO;
import com.pg.optimizer.dto.response.PgResponseDTO;
import com.pg.optimizer.entity.Pg;
import com.pg.optimizer.exception.PgNotFoundException;
import com.pg.optimizer.mapper.PgMapper;
import com.pg.optimizer.repository.PgRepository;
import com.pg.optimizer.service.PgService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PgServiceImpl implements PgService {

    private final PgRepository pgRepository;


    @Override
    public PgResponseDTO addPg(PgRequestDTO dto) {
        log.info("Adding PG: {}", dto.getName());

        Pg pg = PgMapper.toEntity(dto);

        Pg savedPg = pgRepository.save(pg);

        log.info("PG saved with ID: {}", savedPg.getId());

        return PgMapper.toResponseDTO(savedPg);
    }

    @Override
    public List<PgResponseDTO> getAllPgs() {

        log.info("Fetching all PGs");

        return pgRepository.findAll()
                .stream()
                .map(PgMapper::toResponseDTO)
                .toList();
    }

    @Override
    public PgResponseDTO getPgById(Long id) {

        log.info("Fetching PG with ID: {}", id);

        Pg pg = pgRepository.findById(id)
                .orElseThrow(() ->
                        new PgNotFoundException("PG not found with ID: " + id));

        return PgMapper.toResponseDTO(pg);
    }
}
