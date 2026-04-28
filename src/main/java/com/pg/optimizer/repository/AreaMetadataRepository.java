package com.pg.optimizer.repository;

import com.pg.optimizer.entity.AreaMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AreaMetadataRepository extends JpaRepository<AreaMetadata, Long> {
     Optional<AreaMetadata> findByAreaName(String areaName);
}
