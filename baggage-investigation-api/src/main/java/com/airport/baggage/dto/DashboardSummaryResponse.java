
package com.airport.baggage.dto;

public class DashboardSummaryResponse {

    private long totalBaggage;
    private long directJourneys;
    private long connectingJourneys;
    private long timingInconsistencies;
    private long eventPatternReviews;
    private long noIssueDetected;

    public DashboardSummaryResponse() {
    }

    public DashboardSummaryResponse(
            long totalBaggage,
            long directJourneys,
            long connectingJourneys,
            long timingInconsistencies,
            long eventPatternReviews,
            long noIssueDetected) {

        this.totalBaggage = totalBaggage;
        this.directJourneys = directJourneys;
        this.connectingJourneys = connectingJourneys;
        this.timingInconsistencies = timingInconsistencies;
        this.eventPatternReviews = eventPatternReviews;
        this.noIssueDetected = noIssueDetected;
    }

    public long getTotalBaggage() {
        return totalBaggage;
    }

    public void setTotalBaggage(long totalBaggage) {
        this.totalBaggage = totalBaggage;
    }

    public long getDirectJourneys() {
        return directJourneys;
    }

    public void setDirectJourneys(long directJourneys) {
        this.directJourneys = directJourneys;
    }

    public long getConnectingJourneys() {
        return connectingJourneys;
    }

    public void setConnectingJourneys(long connectingJourneys) {
        this.connectingJourneys = connectingJourneys;
    }

    public long getTimingInconsistencies() {
        return timingInconsistencies;
    }

    public void setTimingInconsistencies(long timingInconsistencies) {
        this.timingInconsistencies = timingInconsistencies;
    }

    public long getEventPatternReviews() {
        return eventPatternReviews;
    }

    public void setEventPatternReviews(long eventPatternReviews) {
        this.eventPatternReviews = eventPatternReviews;
    }

    public long getNoIssueDetected() {
        return noIssueDetected;
    }

    public void setNoIssueDetected(long noIssueDetected) {
        this.noIssueDetected = noIssueDetected;
    }
}
