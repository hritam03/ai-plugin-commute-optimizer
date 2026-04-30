package com.pg.optimizer.repository;

import com.pg.optimizer.entity.Pg;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PgRepository extends JpaRepository<Pg, Long> {

    Page<Pg> findByAreaContainingIgnoreCase(
            String area,
            Pageable pageable
    );

    Page<Pg> findByRentLessThanEqual(
            Double rent,
            Pageable pageable
    );

    Page<Pg> findByAreaContainingIgnoreCaseAndRentLessThanEqual(
            String area,
            Double rent,
            Pageable pageable
    );
}
