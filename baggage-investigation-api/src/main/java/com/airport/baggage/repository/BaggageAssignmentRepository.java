
package com.airport.baggage.repository;
import java.util.List;

import com.airport.baggage.entity.BaggageAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaggageAssignmentRepository extends JpaRepository<BaggageAssignment, String> {
    List<BaggageAssignment> findByBagIdOrderBySegmentSequenceAsc(String bagId);
}
