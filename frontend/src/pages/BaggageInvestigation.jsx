import { Search, AlertCircle } from 'lucide-react';
import { useBaggageInvestigation } from '../hooks/useBaggageInvestigation';
import BaggageSearch from '../components/investigation/BaggageSearch';
import BaggageDetails from '../components/investigation/BaggageDetails';
import InvestigationStatus from '../components/investigation/InvestigationStatus';
import AssignmentTable from '../components/investigation/AssignmentTable';
import ScanTimeline from '../components/investigation/ScanTimeline';
import '../styles/investigation.css';

export default function BaggageInvestigation() {
  const { investigation, loading, error, searched, search, clear } =
    useBaggageInvestigation();

  return (
    <div className="investigation-view">
      <BaggageSearch onSearch={search} onClear={clear} loading={loading} />

      {loading && (
        <div className="info-card">
          <div className="loading-state">
            <div className="loading-spinner" />
            <span>Retrieving baggage investigation record...</span>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="error-state">
          <AlertCircle size={36} />
          <h3>Investigation Lookup Failed</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && !searched && (
        <div className="info-card">
          <div className="empty-state">
            <Search size={40} />
            <h3>Search for a Baggage Record</h3>
            <p>
              Enter a Baggage ID (such as <strong>BAG00501</strong>) above to
              inspect its details, investigation status, flight assignments, and
              chronological scan events.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && investigation && (
        <div className="results-grid">
          <BaggageDetails baggage={investigation.baggage} />
          <InvestigationStatus
            journeyType={investigation.journeyType}
            investigationStatus={investigation.investigationStatus}
          />
          <AssignmentTable assignments={investigation.assignments} />
          <ScanTimeline scanEvents={investigation.scanEvents} />
        </div>
      )}
    </div>
  );
}
