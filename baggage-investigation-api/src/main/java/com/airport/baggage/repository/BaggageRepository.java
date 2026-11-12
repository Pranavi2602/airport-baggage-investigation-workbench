
package com.airport.baggage.repository;

import com.airport.baggage.entity.Baggage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaggageRepository
        extends JpaRepository<Baggage, String> {

}
