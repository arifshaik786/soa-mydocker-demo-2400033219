package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EvChargingSessionProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(EvChargingSessionProjectApplication.class, args);
		System.out.println("EV Charging Session Project is running...");
	}

}
