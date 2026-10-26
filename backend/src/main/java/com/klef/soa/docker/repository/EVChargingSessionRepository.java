package com.klef.soa.docker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.soa.docker.entity.EVChargingSession;

public interface EVChargingSessionRepository
        extends JpaRepository<EVChargingSession, Long> {
}