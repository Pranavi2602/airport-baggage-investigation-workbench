
package com.airport.baggage.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "baggage_investigation")
public class BaggageInvestigation {

    @Id
    @Column(name = "bag_id")
    private String bagId;

    @Column(name = "unexpected_airport_detected")
    private Boolean unexpectedAirportDetected;

    @Column(name = "incorrect_flight_detected")
    private Boolean incorrectFlightDetected;

    @Column(name = "incorrect_airport_flight_detected")
    private Boolean incorrectAirportFlightDetected;

    @Column(name = "segment_event_investigation_required")
    private Boolean segmentEventInvestigationRequired;

    @Column(name = "connection_gap_minutes")
    private Double connectionGapMinutes;

    @Column(name = "impossible_connection")
    private Boolean impossibleConnection;

    @Column(name = "handoff_gap_minutes")
    private Double handoffGapMinutes;

    @Column(name = "loaded_before_transfer")
    private Boolean loadedBeforeTransfer;

    @Column(name = "journey_type")
    private String journeyType;

    @Column(name = "event_sequence_matches")
    private Boolean eventSequenceMatches;

    @Column(name = "investigation_status")
    private String investigationStatus;

    public BaggageInvestigation() {
    }

    // Getters and Setters

    public String getBagId() {
        return bagId;
    }

    public void setBagId(String bagId) {
        this.bagId = bagId;
    }

    public Boolean getUnexpectedAirportDetected() {
        return unexpectedAirportDetected;
    }

    public void setUnexpectedAirportDetected(Boolean unexpectedAirportDetected) {
        this.unexpectedAirportDetected = unexpectedAirportDetected;
    }

    public Boolean getIncorrectFlightDetected() {
        return incorrectFlightDetected;
    }

    public void setIncorrectFlightDetected(Boolean incorrectFlightDetected) {
        this.incorrectFlightDetected = incorrectFlightDetected;
    }

    public Boolean getIncorrectAirportFlightDetected() {
        return incorrectAirportFlightDetected;
    }

    public void setIncorrectAirportFlightDetected(Boolean incorrectAirportFlightDetected) {
        this.incorrectAirportFlightDetected = incorrectAirportFlightDetected;
    }

    public Boolean getSegmentEventInvestigationRequired() {
        return segmentEventInvestigationRequired;
    }

    public void setSegmentEventInvestigationRequired(Boolean segmentEventInvestigationRequired) {
        this.segmentEventInvestigationRequired = segmentEventInvestigationRequired;
    }

    public Double getConnectionGapMinutes() {
        return connectionGapMinutes;
    }

    public void setConnectionGapMinutes(Double connectionGapMinutes) {
        this.connectionGapMinutes = connectionGapMinutes;
    }

    public Boolean getImpossibleConnection() {
        return impossibleConnection;
    }

    public void setImpossibleConnection(Boolean impossibleConnection) {
        this.impossibleConnection = impossibleConnection;
    }

    public Double getHandoffGapMinutes() {
        return handoffGapMinutes;
    }

    public void setHandoffGapMinutes(Double handoffGapMinutes) {
        this.handoffGapMinutes = handoffGapMinutes;
    }

    public Boolean getLoadedBeforeTransfer() {
        return loadedBeforeTransfer;
    }

    public void setLoadedBeforeTransfer(Boolean loadedBeforeTransfer) {
        this.loadedBeforeTransfer = loadedBeforeTransfer;
    }

    public String getJourneyType() {
        return journeyType;
    }

    public void setJourneyType(String journeyType) {
        this.journeyType = journeyType;
    }

    public Boolean getEventSequenceMatches() {
        return eventSequenceMatches;
    }

    public void setEventSequenceMatches(Boolean eventSequenceMatches) {
        this.eventSequenceMatches = eventSequenceMatches;
    }

    public String getInvestigationStatus() {
        return investigationStatus;
    }

    public void setInvestigationStatus(String investigationStatus) {
        this.investigationStatus = investigationStatus;
    }
}
