package com.pg.optimizer.controller;

import com.pg.optimizer.dto.request.PgRequestDTO;
import com.pg.optimizer.dto.response.PgResponseDTO;
import com.pg.optimizer.service.PgService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pgs")
@RequiredArgsConstructor
public class PgController {

    private final PgService pgService;

    @PostMapping
    public PgResponseDTO addPg(@Valid @RequestBody PgRequestDTO dto) {

        return pgService.addPg(dto);
    }

    @GetMapping("/getAllPgs")
    public List<PgResponseDTO> getAllPgs() {

        return pgService.getAllPgs();
    }

    @GetMapping("/{id}")
    public PgResponseDTO getPgById(@PathVariable Long id) {

        return pgService.getPgById(id);
    }
}
