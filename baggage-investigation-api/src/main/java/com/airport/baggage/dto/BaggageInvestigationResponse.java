
package com.airport.baggage.dto;

import java.util.List;

public class BaggageInvestigationResponse {

    private BaggageResponse baggage;
    private String journeyType;
    private String investigationStatus;

    private List<AssignmentResponse> assignments;
    private List<ScanEventResponse> scanEvents;

    public BaggageInvestigationResponse() {
    }

    public BaggageInvestigationResponse(
            BaggageResponse baggage,
            String journeyType,
            String investigationStatus,
            List<AssignmentResponse> assignments,
            List<ScanEventResponse> scanEvents) {

        this.baggage = baggage;
        this.journeyType = journeyType;
        this.investigationStatus = investigationStatus;
        this.assignments = assignments;
        this.scanEvents = scanEvents;
    }

    public BaggageResponse getBaggage() {
        return baggage;
    }

    public void setBaggage(BaggageResponse baggage) {
        this.baggage = baggage;
    }

    public String getJourneyType() {
        return journeyType;
    }

    public void setJourneyType(String journeyType) {
        this.journeyType = journeyType;
    }

    public String getInvestigationStatus() {
        return investigationStatus;
    }

    public void setInvestigationStatus(String investigationStatus) {
        this.investigationStatus = investigationStatus;
    }

    public List<AssignmentResponse> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<AssignmentResponse> assignments) {
        this.assignments = assignments;
    }

    public List<ScanEventResponse> getScanEvents() {
        return scanEvents;
    }

    public void setScanEvents(List<ScanEventResponse> scanEvents) {
        this.scanEvents = scanEvents;
    }
}
