
package com.airport.baggage.dto;

import java.time.OffsetDateTime;

public class AssignmentResponse {

    private String assignmentId;
    private String flightId;
    private OffsetDateTime assignedAt;
    private Integer segmentSequence;

    public AssignmentResponse() {
    }

    public AssignmentResponse(
            String assignmentId,
            String flightId,
            OffsetDateTime assignedAt,
            Integer segmentSequence) {

        this.assignmentId = assignmentId;
        this.flightId = flightId;
        this.assignedAt = assignedAt;
        this.segmentSequence = segmentSequence;
    }

    public String getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(String assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getFlightId() {
        return flightId;
    }

    public void setFlightId(String flightId) {
        this.flightId = flightId;
    }

    public OffsetDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(OffsetDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public Integer getSegmentSequence() {
        return segmentSequence;
    }

    public void setSegmentSequence(Integer segmentSequence) {
        this.segmentSequence = segmentSequence;
    }
}
