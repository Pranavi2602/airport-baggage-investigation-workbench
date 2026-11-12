
package com.airport.baggage.controller;

import com.airport.baggage.dto.DashboardSummaryResponse;
import com.airport.baggage.service.BaggageService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final BaggageService baggageService;

    public DashboardController(BaggageService baggageService) {
        this.baggageService = baggageService;
    }

    @GetMapping("/summary")
    public DashboardSummaryResponse getDashboardSummary() {
        return baggageService.getDashboardSummary();
    }
}
