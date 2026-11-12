
package com.airport.baggage.dto;

public class ExceptionSummaryResponse {

    private long totalExceptions;
    private long openExceptions;
    private long inProgressExceptions;
    private long resolvedExceptions;
    private long highPriorityExceptions;
    private long mediumPriorityExceptions;

    public ExceptionSummaryResponse(
            long totalExceptions,
            long openExceptions,
            long inProgressExceptions,
            long resolvedExceptions,
            long highPriorityExceptions,
            long mediumPriorityExceptions
    ) {
        this.totalExceptions = totalExceptions;
        this.openExceptions = openExceptions;
        this.inProgressExceptions = inProgressExceptions;
        this.resolvedExceptions = resolvedExceptions;
        this.highPriorityExceptions = highPriorityExceptions;
        this.mediumPriorityExceptions = mediumPriorityExceptions;
    }

    public long getTotalExceptions() { return totalExceptions; }
    public long getOpenExceptions() { return openExceptions; }
    public long getInProgressExceptions() { return inProgressExceptions; }
    public long getResolvedExceptions() { return resolvedExceptions; }
    public long getHighPriorityExceptions() { return highPriorityExceptions; }
    public long getMediumPriorityExceptions() { return mediumPriorityExceptions; }
}
