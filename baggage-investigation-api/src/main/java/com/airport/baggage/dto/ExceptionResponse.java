
package com.airport.baggage.dto;

import java.time.OffsetDateTime;

public class ExceptionResponse {

    private String exceptionId;
    private String bagId;
    private String exceptionType;
    private String exceptionDescription;
    private String severity;
    private Integer priority;
    private String status;
    private String assignedTo;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private OffsetDateTime resolvedAt;
    private String resolutionNotes;

    public ExceptionResponse() {
    }

    public ExceptionResponse(
            String exceptionId,
            String bagId,
            String exceptionType,
            String exceptionDescription,
            String severity,
            Integer priority,
            String status,
            String assignedTo,
            OffsetDateTime createdAt,
            OffsetDateTime updatedAt,
            OffsetDateTime resolvedAt,
            String resolutionNotes
    ) {
        this.exceptionId = exceptionId;
        this.bagId = bagId;
        this.exceptionType = exceptionType;
        this.exceptionDescription = exceptionDescription;
        this.severity = severity;
        this.priority = priority;
        this.status = status;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.resolvedAt = resolvedAt;
        this.resolutionNotes = resolutionNotes;
    }

    public String getExceptionId() { return exceptionId; }
    public String getBagId() { return bagId; }
    public String getExceptionType() { return exceptionType; }
    public String getExceptionDescription() { return exceptionDescription; }
    public String getSeverity() { return severity; }
    public Integer getPriority() { return priority; }
    public String getStatus() { return status; }
    public String getAssignedTo() { return assignedTo; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public OffsetDateTime getResolvedAt() { return resolvedAt; }
    public String getResolutionNotes() { return resolutionNotes; }
}
