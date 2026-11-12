
package com.airport.baggage.dto;

public class BaggageResponse {

    private String bagId;
    private String tagNumber;
    private String bookingReference;
    private String passengerReference;

    public BaggageResponse() {
    }

    public BaggageResponse(
            String bagId,
            String tagNumber,
            String bookingReference,
            String passengerReference) {

        this.bagId = bagId;
        this.tagNumber = tagNumber;
        this.bookingReference = bookingReference;
        this.passengerReference = passengerReference;
    }

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
}
