
package com.airport.baggage.controller;

import com.airport.baggage.dto.BaggageInvestigationResponse;
import com.airport.baggage.service.BaggageService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/baggage")
public class BaggageController {

    private final BaggageService baggageService;

    public BaggageController(BaggageService baggageService) {
        this.baggageService = baggageService;
    }

    // Get complete baggage investigation
    @GetMapping("/{bagId}/investigation")
    public ResponseEntity<BaggageInvestigationResponse> getBaggageInvestigation(
            @PathVariable String bagId) {

        return baggageService.getBaggageInvestigation(bagId)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
