
package com.airport.baggage.repository;

import com.airport.baggage.entity.BaggageInvestigation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BaggageInvestigationRepository extends JpaRepository<BaggageInvestigation, String> {
    long countByJourneyType(String journeyType);

    long countByInvestigationStatus(String investigationStatus);
}
