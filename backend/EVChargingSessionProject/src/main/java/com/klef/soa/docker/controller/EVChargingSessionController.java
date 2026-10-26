package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.klef.soa.docker.dto.EVChargingSessionRequest;
import com.klef.soa.docker.entity.EVChargingSession;
import com.klef.soa.docker.service.EVChargingSessionService;

@CrossOrigin("*")
@RestController
@RequestMapping()
public class EVChargingSessionController {

	@Autowired
	private EVChargingSessionService service;
    
    @GetMapping("/")
	private String home()
	{
		
		return "EV Charging Session Controller is working";
	}
	

    @PostMapping("/Add")
    public ResponseEntity<EVChargingSession> addSession(
            @Valid @RequestBody EVChargingSessionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.addSession(request));
    }

    @GetMapping("/DisplayAll")
    public List<EVChargingSession> getAllSessions() {
        return service.getAllSessions();
    }

    @GetMapping("/{id}")
    public EVChargingSession getSessionById(@PathVariable Long id) {
        return service.getSessionById(id);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<String> deleteSession(@PathVariable Long id) {
        return ResponseEntity.ok(service.deleteSession(id));
    }
}