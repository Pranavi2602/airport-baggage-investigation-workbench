import {
  Luggage,
  ArrowLeftRight,
  Plane,
  Clock,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import {
  investigationStatusConfig,
  journeyTypeConfig,
} from '../utils/statusConfig';
import MetricCard from '../components/dashboard/MetricCard';
import InvestigationStatusChart from '../components/dashboard/InvestigationStatusChart';
import JourneyTypeChart from '../components/dashboard/JourneyTypeChart';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { summary, loading, error } = useDashboard();

  if (error) {
    return (
      <div className="dashboard-error">
        <AlertTriangle size={40} />
        <h3>Unable to Load Dashboard</h3>
        <p>{error}</p>
      </div>
    );
  }

  const metrics = [
    {
      label: 'Total Baggage',
      value: summary?.totalBaggage,
      icon: Luggage,
      color: '#1e3a5f',
      bgColor: '#e0e7ff',
    },
    {
      label: 'Direct Journeys',
      value: summary?.directJourneys,
      icon: Plane,
      color: journeyTypeConfig.DIRECT.color,
      bgColor: journeyTypeConfig.DIRECT.bgColor,
    },
    {
      label: 'Connecting Journeys',
      value: summary?.connectingJourneys,
      icon: ArrowLeftRight,
      color: journeyTypeConfig.CONNECTING.color,
      bgColor: journeyTypeConfig.CONNECTING.bgColor,
    },
    {
      label: 'Timing Inconsistencies',
      value: summary?.timingInconsistencies,
      icon: Clock,
      color: investigationStatusConfig.TIMING_INCONSISTENCY.color,
      bgColor: investigationStatusConfig.TIMING_INCONSISTENCY.bgColor,
    },
    {
      label: 'Event Pattern Reviews',
      value: summary?.eventPatternReviews,
      icon: AlertTriangle,
      color: investigationStatusConfig.EVENT_PATTERN_REVIEW.color,
      bgColor: investigationStatusConfig.EVENT_PATTERN_REVIEW.bgColor,
    },
    {
      label: 'No Issue Detected',
      value: summary?.noIssueDetected,
      icon: CheckCircle,
      color: investigationStatusConfig.NO_ISSUE_DETECTED.color,
      bgColor: investigationStatusConfig.NO_ISSUE_DETECTED.bgColor,
    },
  ];

  return (
    <div className="dashboard-view">
      {/* KPI Metrics */}
      <div className="metrics-grid">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} loading={loading} />
        ))}
      </div>

      {/* Charts */}
      {!loading && summary && (
        <>
          <div className="charts-grid">
            <InvestigationStatusChart summary={summary} />
            <JourneyTypeChart summary={summary} />
          </div>

          {/* Insights */}
          <div className="insights-section">
            <div className="insights-header">
              <Lightbulb size={18} style={{ color: investigationStatusConfig.EVENT_PATTERN_REVIEW.color }} />
              <h3>Dashboard Insights</h3>
            </div>
            <div className="insights-grid">
              <div className="insight-item">
                <div className="insight-label">Total Baggage Processed</div>
                <div className="insight-value">
                  {summary.totalBaggage.toLocaleString()}
                </div>
                <div className="insight-desc">
                  Across all journeys in the dataset
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-label">Connecting Journeys</div>
                <div
                  className="insight-value"
                  style={{ color: journeyTypeConfig.CONNECTING.color }}
                >
                  {summary.connectingJourneys.toLocaleString()}
                </div>
                <div className="insight-desc">
                  {summary.totalBaggage > 0
                    ? `${((summary.connectingJourneys / summary.totalBaggage) * 100).toFixed(1)}% of total baggage`
                    : 'Multi-segment baggage journeys'}
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-label">Timing Inconsistencies</div>
                <div
                  className="insight-value"
                  style={{ color: investigationStatusConfig.TIMING_INCONSISTENCY.color }}
                >
                  {summary.timingInconsistencies.toLocaleString()}
                </div>
                <div className="insight-desc">
                  Flagged for timing-related investigation review
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
