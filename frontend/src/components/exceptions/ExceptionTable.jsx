import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';
import {
  getExceptionStatusConfig,
  getExceptionSeverityConfig,
} from '../../utils/statusConfig';

const PAGE_SIZE = 25;

export default function ExceptionTable({
  exceptions,
  loading,
  selectedId,
  currentPage,
  onPageChange,
  onSelect,
}) {
  if (loading) {
    return (
      <div className="info-card">
        <div className="loading-state">
          <div className="loading-spinner" />
          <span>Loading exception records...</span>
        </div>
      </div>
    );
  }

  if (!exceptions || exceptions.length === 0) {
    return (
      <div className="info-card">
        <div className="empty-state">
          <Inbox size={40} />
          <h3>No Exceptions Found</h3>
          <p>
            No exception records match the current filters. Try adjusting or
            resetting the filters above.
          </p>
        </div>
      </div>
    );
  }

  const totalRecords = exceptions.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageItems = exceptions.slice(startIndex, startIndex + PAGE_SIZE);
  const startRecord = startIndex + 1;
  const endRecord = Math.min(startIndex + PAGE_SIZE, totalRecords);

  return (
    <div className="info-card">
      <div className="info-card-header">
        <h3>Exception Queue</h3>
        <span className="info-card-count">
          {totalRecords.toLocaleString()} {totalRecords === 1 ? 'record' : 'records'}
        </span>
      </div>

      <div className="exceptions-table-wrapper">
        <table className="exceptions-table">
          <thead>
            <tr>
              <th>Exception ID</th>
              <th>Baggage ID</th>
              <th>Exception Type</th>
              <th>Severity</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Investigator</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((exc) => {
              const statusConf = getExceptionStatusConfig(exc.status);
              const severityConf = getExceptionSeverityConfig(exc.severity);
              const isSelected = exc.exceptionId === selectedId;

              return (
                <tr
                  key={exc.exceptionId}
                  className={isSelected ? 'selected-row' : ''}
                  onClick={() => onSelect(exc.exceptionId)}
                >
                  <td className="mono">{exc.exceptionId}</td>
                  <td className="mono">{exc.bagId}</td>
                  <td>{exc.exceptionType}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        color: severityConf.color,
                        backgroundColor: severityConf.bgColor,
                        borderColor: severityConf.borderColor,
                      }}
                    >
                      {severityConf.label}
                    </span>
                  </td>
                  <td>P{exc.priority ?? '—'}</td>
                  <td>
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
                  </td>
                  <td>{exc.assignedTo || <span className="text-muted">Unassigned</span>}</td>
                  <td>{formatDateTime(exc.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination-bar">
        <span className="pagination-info">
          Showing {startRecord.toLocaleString()}–{endRecord.toLocaleString()} of{' '}
          {totalRecords.toLocaleString()}
        </span>

        <div className="pagination-controls">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onPageChange(safePage - 1)}
            disabled={safePage <= 1}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span className="pagination-page-label">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onPageChange(safePage + 1)}
            disabled={safePage >= totalPages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
