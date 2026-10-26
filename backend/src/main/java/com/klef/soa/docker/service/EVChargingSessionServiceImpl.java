package com.klef.soa.docker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.klef.soa.docker.dto.EVChargingSessionRequest;
import com.klef.soa.docker.entity.EVChargingSession;
import com.klef.soa.docker.repository.EVChargingSessionRepository;

@Service
@Transactional
public class EVChargingSessionServiceImpl
        implements EVChargingSessionService {

	@Autowired
	private EVChargingSessionRepository repository;


    public EVChargingSessionServiceImpl(
            EVChargingSessionRepository repository) {
        this.repository = repository;
    }

    @Override
    public EVChargingSession addSession(EVChargingSessionRequest request) {
        EVChargingSession session = new EVChargingSession();
        session.setStationName(request.getStationName().trim());
        session.setVehicleNumber(request.getVehicleNumber().trim());
        session.setEnergyKwh(request.getEnergyKwh());
        session.setCompleted(request.getCompleted());

        // The database generates the ID.
        return repository.save(session);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EVChargingSession> getAllSessions() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public EVChargingSession getSessionById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Session not found with ID: " + id));
    }

    @Override
    public String deleteSession(Long id) {
        EVChargingSession session = getSessionById(id);
        repository.delete(session);
        return "Session deleted successfully";
    }
}