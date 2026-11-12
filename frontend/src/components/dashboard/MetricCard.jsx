export default function MetricCard({ label, value, icon: Icon, color, bgColor, loading }) {
  if (loading) {
    return (
      <div className="metric-card skeleton">
        <div className="metric-icon" />
        <div className="metric-content">
          <div className="metric-label" />
          <div className="metric-value" />
        </div>
      </div>
    );
  }

  return (
    <div className="metric-card" style={{ borderTopColor: color }}>
      <div className="metric-icon" style={{ backgroundColor: bgColor, color }}>
        {Icon && <Icon size={22} />}
      </div>
      <div className="metric-content">
        <div className="metric-label" title={label}>{label}</div>
        <div className="metric-value">{value != null ? value.toLocaleString() : '—'}</div>
      </div>
    </div>
  );
}
