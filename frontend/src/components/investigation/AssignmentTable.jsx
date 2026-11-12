import { Plane } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

export default function AssignmentTable({ assignments }) {
  if (!assignments || assignments.length === 0) {
    return (
      <div className="info-card">
        <div className="info-card-header">
          <Plane size={18} />
          <h3>Flight Assignments</h3>
        </div>
        <div className="info-card-body">
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            No flight assignments found.
          </p>
        </div>
      </div>
    );
  }

  const sorted = [...assignments].sort(
    (a, b) => (a.segmentSequence || 0) - (b.segmentSequence || 0)
  );

  return (
    <div className="info-card">
      <div className="info-card-header">
        <Plane size={18} />
        <h3>Flight Assignments</h3>
      </div>
      <div className="info-card-body">
        <div className="assignment-table-wrapper">
          <table className="assignment-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Assignment ID</th>
                <th>Flight ID</th>
                <th>Assigned At</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((a) => (
                <tr key={a.assignmentId}>
                  <td>
                    <span className="segment-badge">
                      {a.segmentSequence}
                    </span>
                  </td>
                  <td className="mono">{a.assignmentId}</td>
                  <td className="mono">{a.flightId}</td>
                  <td>{formatDateTime(a.assignedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
