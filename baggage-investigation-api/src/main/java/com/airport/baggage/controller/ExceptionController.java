
package com.airport.baggage.controller;

import com.airport.baggage.dto.ExceptionResponse;
import com.airport.baggage.dto.ExceptionStatusUpdateRequest;
import com.airport.baggage.dto.ExceptionSummaryResponse;
import com.airport.baggage.service.ExceptionRecordService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exceptions")
public class ExceptionController {

    private final ExceptionRecordService exceptionService;

    public ExceptionController(
            ExceptionRecordService exceptionService) {
        this.exceptionService = exceptionService;
    }

    // 1. Get all exceptions with optional filters

    @GetMapping
    public ResponseEntity<List<ExceptionResponse>> getAllExceptions(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) String exceptionType,
            @RequestParam(required = false) String bagId) {

        return ResponseEntity.ok(
                exceptionService.getAllExceptions(
                        status, severity, exceptionType, bagId
                )
        );
    }

    // 2. Get exception by ID

    @GetMapping("/{exceptionId}")
    public ResponseEntity<ExceptionResponse> getExceptionById(
            @PathVariable String exceptionId) {

        return ResponseEntity.ok(
                exceptionService.getExceptionById(exceptionId)
        );
    }

    // 3. Get exception dashboard summary

    @GetMapping("/summary")
    public ResponseEntity<ExceptionSummaryResponse> getExceptionSummary() {

        return ResponseEntity.ok(
                exceptionService.getExceptionSummary()
        );
    }

    // 4. Update exception status

    @PutMapping("/{exceptionId}/status")
    public ResponseEntity<ExceptionResponse> updateExceptionStatus(
            @PathVariable String exceptionId,
            @Valid @RequestBody ExceptionStatusUpdateRequest request) {

        return ResponseEntity.ok(
                exceptionService.updateExceptionStatus(
                        exceptionId, request
                )
        );
    }
}
