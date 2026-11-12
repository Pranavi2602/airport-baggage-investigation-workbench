
package com.airport.baggage.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.time.OffsetDateTime;

@Entity
@Table(name = "baggage")
public class Baggage {

    @Id
    @Column(name = "bag_id")
    private String bagId;

    @Column(name = "tag_number")
    private String tagNumber;

    @Column(name = "booking_reference")
    private String bookingReference;

    @Column(name = "passenger_reference")
    private String passengerReference;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    public Baggage() {
    }

    // Getters and Setters

    public String getBagId() {
        return bagId;
    }

    public void setBagId(String bagId) {
        this.bagId = bagId;
    }

    public String getTagNumber() {
        return tagNumber;
    }

    public void setTagNumber(String tagNumber) {
        this.tagNumber = tagNumber;
    }

    public String getBookingReference() {
        return bookingReference;
    }

    public void setBookingReference(String bookingReference) {
        this.bookingReference = bookingReference;
    }

    public String getPassengerReference() {
        return passengerReference;
    }

    public void setPassengerReference(String passengerReference) {
        this.passengerReference = passengerReference;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
