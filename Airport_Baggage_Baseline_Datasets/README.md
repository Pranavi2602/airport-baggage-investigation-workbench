# Airport Baggage Misroute Investigation – Baseline Dataset

These files are simulated learning data, not real airline operational records.

## Files
- baggage.csv: 1,000 records
- flight.csv: 250 records
- baggage_assignment.csv: 1,500 records
- baggage_scan_event.csv: 9,000 records

## Notes
- Four CSVs follow the Phase 1 logical data model.
- bag_id links baggage, assignments, and scan events.
- flight_id links assignments to flight occurrences.
- segment_sequence orders expected flight segments.
- event_time is when the event occurred; received_at is when it was received.
- This is the clean baseline. Apply fault injection only to a separate working copy.
