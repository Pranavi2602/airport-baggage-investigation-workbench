
package com.airport.baggage.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.time.OffsetDateTime;

@Entity
@Table(name = "baggage_assignment")
public class BaggageAssignment {

    @Id
    @Column(name = "assignment_id")
    private String assignmentId;

    @Column(name = "bag_id")
    private String bagId;

    @Column(name = "flight_id")
    private String flightId;

    @Column(name = "assigned_at")
    private OffsetDateTime assignedAt;

    @Column(name = "segment_sequence")
    private Integer segmentSequence;

    public BaggageAssignment() {
    }

    public String getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(String assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getBagId() {
        return bagId;
    }

    public void setBagId(String bagId) {
        this.bagId = bagId;
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
