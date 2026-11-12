
package com.airport.baggage.repository;

import com.airport.baggage.entity.ExceptionRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExceptionRecordRepository
        extends JpaRepository<ExceptionRecord, String> {

    List<ExceptionRecord> findByStatus(String status);

    List<ExceptionRecord> findBySeverity(String severity);

    List<ExceptionRecord> findByExceptionType(String exceptionType);

    List<ExceptionRecord> findByBagId(String bagId);

    List<ExceptionRecord> findByStatusAndSeverity(
            String status,
            String severity
    );

    long countByStatus(String status);

    long countBySeverity(String severity);
}
