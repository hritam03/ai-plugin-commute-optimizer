package com.pg.optimizer.controller;

import com.pg.optimizer.dto.request.PgRequestDTO;
import com.pg.optimizer.dto.response.PagedResponse;
import com.pg.optimizer.dto.response.PgResponseDTO;
import com.pg.optimizer.service.PgService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pgs")
@RequiredArgsConstructor
@Tag(name = "PG Management", description = "Endpoints for managing PG listings")
public class PgController {

    private final PgService pgService;

    @PostMapping
    public PgResponseDTO addPg(@Valid @RequestBody PgRequestDTO dto) {

        return pgService.addPg(dto);
    }

    @GetMapping("/getAllPg")
    public PagedResponse<PgResponseDTO> getAllPgs(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size

    ) {

        return pgService.getAllPgs(page, size);
    }

    @GetMapping("/{id}")
    public PgResponseDTO getPgById(@PathVariable Long id) {

        return pgService.getPgById(id);
    }
}


