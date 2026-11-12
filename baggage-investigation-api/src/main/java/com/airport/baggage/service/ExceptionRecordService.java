
package com.airport.baggage.service;

import com.airport.baggage.dto.ExceptionResponse;
import com.airport.baggage.dto.ExceptionStatusUpdateRequest;
import com.airport.baggage.dto.ExceptionSummaryResponse;
import com.airport.baggage.entity.ExceptionRecord;
import com.airport.baggage.repository.ExceptionRecordRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class ExceptionRecordService {

    private final ExceptionRecordRepository exceptionRepository;

    public ExceptionRecordService(
            ExceptionRecordRepository exceptionRepository) {
        this.exceptionRepository = exceptionRepository;
    }

    // 1. Retrieve exceptions with optional filters

    public List<ExceptionResponse> getAllExceptions(
            String status,
            String severity,
            String exceptionType,
            String bagId) {

        return exceptionRepository.findAll()
                .stream()
                .filter(e -> status == null ||
                        e.getStatus().equalsIgnoreCase(status))
                .filter(e -> severity == null ||
                        e.getSeverity().equalsIgnoreCase(severity))
                .filter(e -> exceptionType == null ||
                        e.getExceptionType().equalsIgnoreCase(exceptionType))
                .filter(e -> bagId == null ||
                        e.getBagId().equalsIgnoreCase(bagId))
                .sorted(
                        Comparator.comparing(ExceptionRecord::getPriority)
                                .thenComparing(ExceptionRecord::getCreatedAt)
                )
                .map(this::convertToResponse)
                .toList();
    }

    // 2. Retrieve an exception by ID

    public ExceptionResponse getExceptionById(String exceptionId) {

        ExceptionRecord exception = exceptionRepository
                .findById(exceptionId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Exception not found: " + exceptionId
                ));

        return convertToResponse(exception);
    }

    // 3. Calculate dashboard summary

    public ExceptionSummaryResponse getExceptionSummary() {

        long total = exceptionRepository.count();

        long open = exceptionRepository.countByStatus("OPEN");

        long inProgress =
                exceptionRepository.countByStatus("IN_PROGRESS");

        long resolved =
                exceptionRepository.countByStatus("RESOLVED");

        long high =
                exceptionRepository.countBySeverity("HIGH");

        long medium =
                exceptionRepository.countBySeverity("MEDIUM");

        return new ExceptionSummaryResponse(
                total,
                open,
                inProgress,
                resolved,
                high,
                medium
        );
    }

    // 4. Update exception status

    @Transactional
    public ExceptionResponse updateExceptionStatus(
            String exceptionId,
            ExceptionStatusUpdateRequest request) {

        ExceptionRecord exception = exceptionRepository
                .findById(exceptionId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Exception not found: " + exceptionId
                ));

        String currentStatus = exception.getStatus();

        String newStatus = request.getStatus()
                .trim()
                .toUpperCase(Locale.ROOT);

        String assignedTo = request.getAssignedTo();
        String resolutionNotes = request.getResolutionNotes();

        if (!List.of("OPEN", "IN_PROGRESS", "RESOLVED")
                .contains(newStatus)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid exception status"
            );
        }

        boolean validTransition =
                (currentStatus.equals("OPEN") &&
                        newStatus.equals("IN_PROGRESS"))
                        ||
                        (currentStatus.equals("IN_PROGRESS") &&
                                (newStatus.equals("OPEN") ||
                                        newStatus.equals("RESOLVED")));

        if (!validTransition) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid status transition: " +
                            currentStatus + " to " + newStatus
            );
        }

        if (assignedTo != null && !assignedTo.isBlank()) {
            exception.setAssignedTo(assignedTo.trim());
        }

        if (newStatus.equals("IN_PROGRESS") &&
                (exception.getAssignedTo() == null ||
                        exception.getAssignedTo().isBlank())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "An investigator must be assigned before starting"
            );
        }

        if (newStatus.equals("RESOLVED")) {

            if (resolutionNotes == null ||
                    resolutionNotes.isBlank()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Resolution notes are required"
                );
            }

            exception.setResolutionNotes(resolutionNotes.trim());
            exception.setResolvedAt(
                    OffsetDateTime.now(ZoneOffset.UTC)
            );
        }

        exception.setStatus(newStatus);
        exception.setUpdatedAt(
                OffsetDateTime.now(ZoneOffset.UTC)
        );

        ExceptionRecord updatedException =
                exceptionRepository.save(exception);

        return convertToResponse(updatedException);
    }

    // Convert database entity into API response DTO

    private ExceptionResponse convertToResponse(
            ExceptionRecord exception) {

        return new ExceptionResponse(
                exception.getExceptionId(),
                exception.getBagId(),
                exception.getExceptionType(),
                exception.getExceptionDescription(),
                exception.getSeverity(),
                exception.getPriority(),
                exception.getStatus(),
                exception.getAssignedTo(),
                exception.getCreatedAt(),
                exception.getUpdatedAt(),
                exception.getResolvedAt(),
                exception.getResolutionNotes()
        );
    }
}
