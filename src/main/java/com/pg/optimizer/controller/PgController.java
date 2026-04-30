package com.pg.optimizer.controller;

import com.pg.optimizer.dto.request.PgRequestDTO;
import com.pg.optimizer.dto.response.ApiResponse;
import com.pg.optimizer.dto.response.PagedResponse;
import com.pg.optimizer.dto.response.PgResponseDTO;
import com.pg.optimizer.service.PgService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;



@RestController
@RequestMapping("/pgs")
@RequiredArgsConstructor
@Tag(name = "PG Management", description = "Endpoints for managing PG listings")
public class PgController {

    private final PgService pgService;

    @PostMapping
    public ApiResponse<PgResponseDTO> addPg(@Valid @RequestBody PgRequestDTO dto) {

        PgResponseDTO response = pgService.addPg(dto);

        return ApiResponse.<PgResponseDTO>builder()
                .success(true)
                .message("PG created successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
    }

    @GetMapping("/getAllPg")
    public ApiResponse<PagedResponse<PgResponseDTO>> getAllPgs(
                    @RequestParam(defaultValue = "0")
                    int page,
                    @RequestParam(defaultValue = "5")
                    int size,
                    @RequestParam(required = false)
                    String area,
                    @RequestParam(required = false)
                    Double maxRent )
    {
        PagedResponse<PgResponseDTO> response = pgService.getAllPgs(page, size, area, maxRent);

        return ApiResponse.<PagedResponse<PgResponseDTO>>builder()
                .success(true)
                .message("PGs fetched successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<PgResponseDTO> getPgById(@PathVariable Long id) {

       PgResponseDTO response = pgService.getPgById(id);
        return ApiResponse.<PgResponseDTO>builder()
                .success(true)
                .message("PG fetched successfully")
                .data(response)
                .timestamp(LocalDateTime.now())
                .build();
    }
}


