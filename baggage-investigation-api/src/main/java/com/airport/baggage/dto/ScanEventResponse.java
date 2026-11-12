
package com.airport.baggage.dto;

import java.time.OffsetDateTime;

public class ScanEventResponse {

    private String eventId;
    private String eventType;
    private String airportCode;
    private String terminal;
    private String flightNumber;
    private OffsetDateTime eventTime;

    public ScanEventResponse() {
    }

    public ScanEventResponse(
            String eventId,
            String eventType,
            String airportCode,
            String terminal,
            String flightNumber,
            OffsetDateTime eventTime) {

        this.eventId = eventId;
        this.eventType = eventType;
        this.airportCode = airportCode;
        this.terminal = terminal;
        this.flightNumber = flightNumber;
        this.eventTime = eventTime;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getAirportCode() {
        return airportCode;
    }

    public void setAirportCode(String airportCode) {
        this.airportCode = airportCode;
    }

    public String getTerminal() {
        return terminal;
    }

    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public OffsetDateTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(OffsetDateTime eventTime) {
        this.eventTime = eventTime;
    }
}
