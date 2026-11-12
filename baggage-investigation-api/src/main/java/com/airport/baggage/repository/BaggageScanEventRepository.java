
package com.airport.baggage.repository;
import java.util.List;
import com.airport.baggage.entity.BaggageScanEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaggageScanEventRepository extends JpaRepository<BaggageScanEvent, String> {
    List<BaggageScanEvent> findByBagIdOrderByEventTimeAsc(String bagId);
}
