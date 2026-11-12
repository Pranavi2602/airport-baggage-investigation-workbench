import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { journeyTypeConfig } from '../../utils/statusConfig';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', margin: 0 }}>{name}</p>
        <p style={{ fontSize: 13, color: '#475569', margin: '2px 0 0' }}>{value.toLocaleString()} journeys</p>
      </div>
    );
  }
  return null;
};

export default function JourneyTypeChart({ summary }) {
  if (!summary) return null;

  const data = [
    {
      name: journeyTypeConfig.DIRECT.label,
      value: summary.directJourneys,
      fill: journeyTypeConfig.DIRECT.color,
    },
    {
      name: journeyTypeConfig.CONNECTING.label,
      value: summary.connectingJourneys,
      fill: journeyTypeConfig.CONNECTING.color,
    },
  ];

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3>Journey Type Distribution</h3>
        <p>Direct vs connecting baggage journeys</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barSize={60}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: '#64748b' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        {data.map((entry) => (
          <div className="chart-legend-item" key={entry.name}>
            <span className="chart-legend-dot" style={{ background: entry.fill }} />
            <span>{entry.name} ({entry.value.toLocaleString()})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
