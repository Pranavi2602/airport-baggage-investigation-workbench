import { useState, useEffect } from 'react';
import {
  X,
  AlertCircle,
  CheckCircle2,
  Play,
  RotateCcw,
  Lock,
  FileText,
} from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';
import {
  getExceptionStatusConfig,
  getExceptionSeverityConfig,
} from '../../utils/statusConfig';

export default function ExceptionDetailPanel({
  exception,
  loading,
  error,
  updating,
  updateError,
  onClearUpdateError,
  onUpdateStatus,
  onClose,
}) {
  const [assignedTo, setAssignedTo] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [confirmingResolve, setConfirmingResolve] = useState(false);

  useEffect(() => {
    if (exception) {
      setAssignedTo(exception.assignedTo || '');
      setResolutionNotes(exception.resolutionNotes || '');
      setValidationError(null);
      setConfirmingResolve(false);
    }
  }, [exception]);

  if (loading) {
    return (
      <div className="info-card exception-detail-panel">
        <div className="loading-state">
          <div className="loading-spinner" />
          <span>Loading exception details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state exception-detail-panel">
        <AlertCircle size={32} />
        <h3>Failed to Load Exception</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!exception) {
    return (
      <div className="info-card exception-detail-panel">
        <div className="empty-state">
          <FileText size={36} />
          <h3>Select an Exception</h3>
          <p>
            Click any row in the exception queue to inspect its full details,
            assign an investigator, or update its workflow status.
          </p>
        </div>
      </div>
    );
  }

  const statusConf = getExceptionStatusConfig(exception.status);
  const severityConf = getExceptionSeverityConfig(exception.severity);
  const currentStatus = exception.status;
  const isOpen = currentStatus === 'OPEN';
  const isInProgress = currentStatus === 'IN_PROGRESS';
  const isResolved = currentStatus === 'RESOLVED';

  const handleStartInvestigation = async () => {
    setValidationError(null);
    onClearUpdateError?.();
    if (!assignedTo.trim()) {
      setValidationError('An investigator must be assigned before moving to In Progress.');
      return;
    }
    try {
      await onUpdateStatus(exception.exceptionId, {
        status: 'IN_PROGRESS',
        assignedTo: assignedTo.trim(),
      });
    } catch {
      // updateError handled by hook
    }
  };

  const handleReopen = async () => {
    setValidationError(null);
    onClearUpdateError?.();
    setConfirmingResolve(false);
    try {
      await onUpdateStatus(exception.exceptionId, {
        status: 'OPEN',
        assignedTo: assignedTo.trim() || exception.assignedTo || undefined,
      });
    } catch {
      // updateError handled by hook
    }
  };

  const handleResolveClick = () => {
    setValidationError(null);
    onClearUpdateError?.();
    if (!resolutionNotes.trim()) {
      setValidationError('Resolution notes are required before resolving an exception.');
      return;
    }
    setConfirmingResolve(true);
  };

  const handleConfirmResolve = async () => {
    setValidationError(null);
    try {
      await onUpdateStatus(exception.exceptionId, {
        status: 'RESOLVED',
        assignedTo: assignedTo.trim() || exception.assignedTo || undefined,
        resolutionNotes: resolutionNotes.trim(),
      });
      setConfirmingResolve(false);
    } catch {
      // updateError handled by hook
    }
  };

  const displayError = validationError || updateError;

  return (
    <div className="info-card exception-detail-panel">
      <div className="info-card-header">
        <h3>Exception Details · {exception.exceptionId}</h3>
        <button
          type="button"
          className="detail-close-btn"
          onClick={onClose}
          title="Close detail panel"
        >
          <X size={16} />
        </button>
      </div>

      <div className="info-card-body detail-panel-body">
        <div className="detail-badges-row">
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
          <span
            className="status-badge"
            style={{
              color: severityConf.color,
              backgroundColor: severityConf.bgColor,
              borderColor: severityConf.borderColor,
            }}
          >
            Severity: {severityConf.label}
          </span>
          <span className="priority-pill">Priority P{exception.priority ?? '—'}</span>
        </div>

        <div className="detail-description-box">
          <span className="detail-label">Description</span>
          <p>{exception.exceptionDescription || 'No description provided.'}</p>
        </div>

        <div className="detail-meta-grid">
          <div className="detail-item">
            <span className="detail-label">Exception ID</span>
            <span className="detail-value">{exception.exceptionId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Baggage ID</span>
            <span className="detail-value">{exception.bagId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Exception Type</span>
            <span className="detail-value">{exception.exceptionType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Assigned Investigator</span>
            <span className="detail-value">
              {exception.assignedTo || 'Unassigned'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Created At</span>
            <span className="detail-value">{formatDateTime(exception.createdAt)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Updated At</span>
            <span className="detail-value">{formatDateTime(exception.updatedAt)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Resolved At</span>
            <span className="detail-value">{formatDateTime(exception.resolvedAt)}</span>
          </div>
        </div>

        {isResolved ? (
          <div className="detail-resolved-box">
            <div className="detail-resolved-header">
              <Lock size={16} />
              <span>Resolved (Terminal Status)</span>
            </div>
            <div className="detail-item" style={{ marginTop: 8 }}>
              <span className="detail-label">Resolution Notes</span>
              <p className="resolved-notes-text">
                {exception.resolutionNotes || '—'}
              </p>
            </div>
          </div>
        ) : (
          <div className="workflow-section">
            <h4>Workflow &amp; Status Transition</h4>

            <div className="workflow-field">
              <label htmlFor="detail-assigned-to">
                Assigned Investigator {isOpen && <span className="required-mark">*</span>}
              </label>
              <input
                id="detail-assigned-to"
                type="text"
                className="filter-input"
                placeholder="Enter investigator name (e.g. Alice Morgan)"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                disabled={updating}
              />
            </div>

            {isInProgress && (
              <div className="workflow-field">
                <label htmlFor="detail-resolution-notes">
                  Resolution Notes <span className="required-mark">* (required to resolve)</span>
                </label>
                <textarea
                  id="detail-resolution-notes"
                  className="workflow-textarea"
                  rows={3}
                  placeholder="Document investigation findings and resolution..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  disabled={updating}
                />
              </div>
            )}

            {displayError && (
              <div className="workflow-error">
                <AlertCircle size={16} />
                <span>{displayError}</span>
              </div>
            )}

            {confirmingResolve ? (
              <div className="confirm-resolve-box">
                <p>
                  Are you sure you want to mark <strong>{exception.exceptionId}</strong> as{' '}
                  <strong>RESOLVED</strong>? This status is terminal and cannot be reopened.
                </p>
                <div className="workflow-actions">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleConfirmResolve}
                    disabled={updating}
                  >
                    <CheckCircle2 size={16} />
                    {updating ? 'Resolving...' : 'Confirm Resolve'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setConfirmingResolve(false)}
                    disabled={updating}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="workflow-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleStartInvestigation}
                  disabled={!isOpen || updating}
                  title={!isOpen ? 'Only OPEN exceptions can move to In Progress' : ''}
                >
                  <Play size={16} />
                  {updating && isOpen ? 'Updating...' : 'Start Investigation'}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReopen}
                  disabled={!isInProgress || updating}
                  title={!isInProgress ? 'Only IN_PROGRESS exceptions can be reopened' : ''}
                >
                  <RotateCcw size={16} />
                  Reopen
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleResolveClick}
                  disabled={!isInProgress || updating}
                  title={!isInProgress ? 'Only IN_PROGRESS exceptions can be resolved' : ''}
                >
                  <CheckCircle2 size={16} />
                  Resolve Exception
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
