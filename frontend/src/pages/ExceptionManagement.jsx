import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useExceptions } from '../hooks/useExceptions';
import ExceptionSummaryBar from '../components/exceptions/ExceptionSummaryBar';
import ExceptionFilters from '../components/exceptions/ExceptionFilters';
import ExceptionTable from '../components/exceptions/ExceptionTable';
import ExceptionDetailPanel from '../components/exceptions/ExceptionDetailPanel';
import '../styles/dashboard.css';
import '../styles/investigation.css';
import '../styles/exceptions.css';

export default function ExceptionManagement() {
  const {
    exceptions,
    summary,
    exceptionTypes,
    filters,
    loading,
    summaryLoading,
    error,
    selectedException,
    detailLoading,
    detailError,
    updating,
    updateError,
    setUpdateError,
    applyFilters,
    resetFilters,
    selectException,
    clearSelectedException,
    updateStatus,
  } = useExceptions();

  const [currentPage, setCurrentPage] = useState(1);

  const handleApplyFilters = (nextFilters) => {
    setCurrentPage(1);
    applyFilters(nextFilters);
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    resetFilters();
  };

  if (error) {
    return (
      <div className="dashboard-error">
        <AlertTriangle size={40} />
        <h3>Unable to Load Exceptions</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="exceptions-view">
      <ExceptionSummaryBar summary={summary} loading={summaryLoading} />

      <ExceptionFilters
        filters={filters}
        exceptionTypes={exceptionTypes}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        loading={loading}
      />

      <div className="exceptions-workspace">
        <div className="exceptions-table-column">
          <ExceptionTable
            exceptions={exceptions}
            loading={loading}
            selectedId={selectedException?.exceptionId}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onSelect={selectException}
          />
        </div>

        <div className="exceptions-detail-column">
          <ExceptionDetailPanel
            exception={selectedException}
            loading={detailLoading}
            error={detailError}
            updating={updating}
            updateError={updateError}
            onClearUpdateError={() => setUpdateError(null)}
            onUpdateStatus={updateStatus}
            onClose={clearSelectedException}
          />
        </div>
      </div>
    </div>
  );
}
