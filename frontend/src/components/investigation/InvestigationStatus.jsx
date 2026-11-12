import { ShieldCheck } from 'lucide-react';
import { getInvestigationStatusConfig, getJourneyTypeConfig } from '../../utils/statusConfig';

export default function InvestigationStatus({ journeyType, investigationStatus }) {
  const statusConf = getInvestigationStatusConfig(investigationStatus);
  const journeyConf = getJourneyTypeConfig(journeyType);

  return (
    <div className="info-card">
      <div className="info-card-header">
        <ShieldCheck size={18} />
        <h3>Investigation Status</h3>
      </div>
      <div className="info-card-body">
        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">Journey Type</span>
            <span
              className="status-badge"
              style={{
                color: journeyConf.color,
                backgroundColor: journeyConf.bgColor,
                borderColor: journeyConf.borderColor,
              }}
            >
              {journeyConf.label}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Investigation Status</span>
            <span
              className="status-badge"
              style={{
                color: statusConf.color,
                backgroundColor: statusConf.bgColor,
                borderColor: statusConf.borderColor,
              }}
            >
              {statusConf.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
