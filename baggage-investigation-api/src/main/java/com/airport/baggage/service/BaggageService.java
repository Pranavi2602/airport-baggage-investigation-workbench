
package com.airport.baggage.service;

import com.airport.baggage.dto.BaggageResponse;
import com.airport.baggage.dto.AssignmentResponse;
import com.airport.baggage.dto.ScanEventResponse;
import com.airport.baggage.dto.BaggageInvestigationResponse;
import com.airport.baggage.dto.DashboardSummaryResponse;
import com.airport.baggage.entity.Baggage;
import com.airport.baggage.entity.BaggageAssignment;
import com.airport.baggage.entity.BaggageScanEvent;
import com.airport.baggage.entity.BaggageInvestigation;

import com.airport.baggage.repository.BaggageRepository;
import com.airport.baggage.repository.BaggageAssignmentRepository;
import com.airport.baggage.repository.BaggageScanEventRepository;
import com.airport.baggage.repository.BaggageInvestigationRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BaggageService {

    private final BaggageRepository baggageRepository;
    private final BaggageAssignmentRepository assignmentRepository;
    private final BaggageScanEventRepository scanEventRepository;
    private final BaggageInvestigationRepository investigationRepository;

    public BaggageService(
            BaggageRepository baggageRepository,
            BaggageAssignmentRepository assignmentRepository,
            BaggageScanEventRepository scanEventRepository,
            BaggageInvestigationRepository investigationRepository) {

        this.baggageRepository = baggageRepository;
        this.assignmentRepository = assignmentRepository;
        this.scanEventRepository = scanEventRepository;
        this.investigationRepository = investigationRepository;
    }

    // Retrieve baggage details
    public Optional<Baggage> getBaggageById(String bagId) {
        return baggageRepository.findById(bagId);
    }

    // Retrieve baggage flight assignments
    public List<BaggageAssignment> getAssignmentsByBagId(String bagId) {
        return assignmentRepository
                .findByBagIdOrderBySegmentSequenceAsc(bagId);
    }

    // Retrieve baggage scan events
    public List<BaggageScanEvent> getScanEventsByBagId(String bagId) {
        return scanEventRepository
                .findByBagIdOrderByEventTimeAsc(bagId);
    }

    // Retrieve complete baggage investigation
    public Optional<BaggageInvestigationResponse> getBaggageInvestigation(
            String bagId) {

        Optional<Baggage> baggageOptional =
                baggageRepository.findById(bagId);

        if (baggageOptional.isEmpty()) {
            return Optional.empty();
        }

        Baggage baggage = baggageOptional.get();

        Optional<BaggageInvestigation> investigationOptional =
                investigationRepository.findById(bagId);

        BaggageResponse baggageResponse = new BaggageResponse(
                baggage.getBagId(),
                baggage.getTagNumber(),
                baggage.getBookingReference(),
                baggage.getPassengerReference()
        );

        List<AssignmentResponse> assignments =
                assignmentRepository
                        .findByBagIdOrderBySegmentSequenceAsc(bagId)
                        .stream()
                        .map(assignment -> new AssignmentResponse(
                                assignment.getAssignmentId(),
                                assignment.getFlightId(),
                                assignment.getAssignedAt(),
                                assignment.getSegmentSequence()
                        ))
                        .collect(Collectors.toList());

        List<ScanEventResponse> scanEvents =
                scanEventRepository
                        .findByBagIdOrderByEventTimeAsc(bagId)
                        .stream()
                        .map(event -> new ScanEventResponse(
                                event.getEventId(),
                                event.getEventType(),
                                event.getAirportCode(),
                                event.getTerminal(),
                                event.getFlightNumber(),
                                event.getEventTime()
                        ))
                        .collect(Collectors.toList());

        String journeyType = investigationOptional
                .map(BaggageInvestigation::getJourneyType)
                .orElse(null);

        String investigationStatus = investigationOptional
                .map(BaggageInvestigation::getInvestigationStatus)
                .orElse(null);

        BaggageInvestigationResponse response =
                new BaggageInvestigationResponse(
                        baggageResponse,
                        journeyType,
                        investigationStatus,
                        assignments,
                        scanEvents
                );

        return Optional.of(response);
    }


    public DashboardSummaryResponse getDashboardSummary() {

        long totalBaggage = baggageRepository.count();

        long directJourneys =
                investigationRepository.countByJourneyType("DIRECT");

        long connectingJourneys =
                investigationRepository.countByJourneyType("CONNECTING");

        long timingInconsistencies =
                investigationRepository.countByInvestigationStatus(
                        "TIMING_INCONSISTENCY");

        long eventPatternReviews =
                investigationRepository.countByInvestigationStatus(
                        "EVENT_PATTERN_REVIEW");

        long noIssueDetected =
                investigationRepository.countByInvestigationStatus(
                        "NO_ISSUE_DETECTED");

        return new DashboardSummaryResponse(
                totalBaggage,
                directJourneys,
                connectingJourneys,
                timingInconsistencies,
                eventPatternReviews,
                noIssueDetected
        );
    }

}
