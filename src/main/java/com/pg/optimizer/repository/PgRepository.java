package com.pg.optimizer.repository;

import com.pg.optimizer.entity.Pg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PgRepository extends JpaRepository<Pg, Long> {
}
