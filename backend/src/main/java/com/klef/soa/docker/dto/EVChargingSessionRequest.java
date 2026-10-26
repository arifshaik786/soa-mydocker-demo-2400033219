package com.klef.soa.docker.dto;

import jakarta.validation.constraints.*;

public class EVChargingSessionRequest {

    @NotBlank(message = "Station name is required")
    @Size(max = 100)
    private String stationName;

    @NotBlank(message = "Vehicle number is required")
    @Size(max = 20)
    private String vehicleNumber;

    @NotNull(message = "Energy consumption is required")
    @Positive(message = "Energy must be greater than zero")
    @DecimalMax(value = "100000.0")
    private Double energyKwh;

    @NotNull(message = "Completed status is required")
    private Boolean completed;

    public EVChargingSessionRequest() {
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public Double getEnergyKwh() {
        return energyKwh;
    }

    public void setEnergyKwh(Double energyKwh) {
        this.energyKwh = energyKwh;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}