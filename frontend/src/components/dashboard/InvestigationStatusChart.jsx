import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { investigationStatusConfig } from '../../utils/statusConfig';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', margin: 0 }}>{name}</p>
        <p style={{ fontSize: 13, color: '#475569', margin: '2px 0 0' }}>{value.toLocaleString()} baggage</p>
      </div>
    );
  }
  return null;
};

export default function InvestigationStatusChart({ summary }) {
  if (!summary) return null;

  const data = [
    {
      name: investigationStatusConfig.NO_ISSUE_DETECTED.label,
      value: summary.noIssueDetected,
      color: investigationStatusConfig.NO_ISSUE_DETECTED.color,
    },
    {
      name: investigationStatusConfig.EVENT_PATTERN_REVIEW.label,
      value: summary.eventPatternReviews,
      color: investigationStatusConfig.EVENT_PATTERN_REVIEW.color,
    },
    {
      name: investigationStatusConfig.TIMING_INCONSISTENCY.label,
      value: summary.timingInconsistencies,
      color: investigationStatusConfig.TIMING_INCONSISTENCY.color,
    },
  ];

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3>Investigation Status Distribution</h3>
        <p>Breakdown of investigation outcomes</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        {data.map((entry) => (
          <div className="chart-legend-item" key={entry.name}>
            <span className="chart-legend-dot" style={{ background: entry.color }} />
            <span>{entry.name} ({entry.value.toLocaleString()})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
