package com.klef.soa.docker.service;

import java.util.List;
import com.klef.soa.docker.dto.EVChargingSessionRequest;
import com.klef.soa.docker.entity.EVChargingSession;

public interface EVChargingSessionService {

    EVChargingSession addSession(EVChargingSessionRequest request);

    List<EVChargingSession> getAllSessions();

    EVChargingSession getSessionById(Long id);

    String deleteSession(Long id);
}