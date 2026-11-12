import { useState, useEffect } from 'react';
import { Search, RotateCcw } from 'lucide-react';

export default function ExceptionFilters({
  filters,
  exceptionTypes,
  onApply,
  onReset,
  loading,
}) {
  const [bagIdInput, setBagIdInput] = useState(filters.bagId || '');

  useEffect(() => {
    setBagIdInput(filters.bagId || '');
  }, [filters.bagId]);

  const handleSelectChange = (field, value) => {
    onApply({
      ...filters,
      [field]: value,
    });
  };

  const handleBagSearch = (e) => {
    e.preventDefault();
    onApply({
      ...filters,
      bagId: bagIdInput.trim(),
    });
  };

  const handleReset = () => {
    setBagIdInput('');
    onReset();
  };

  const hasActiveFilters =
    filters.status ||
    filters.severity ||
    filters.exceptionType ||
    filters.bagId;

  return (
    <div className="exceptions-filters-card">
      <div className="exceptions-filters-grid">
        <div className="filter-field">
          <label htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            className="filter-select"
            value={filters.status}
            onChange={(e) => handleSelectChange('status', e.target.value)}
            disabled={loading}
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-severity">Severity</label>
          <select
            id="filter-severity"
            className="filter-select"
            value={filters.severity}
            onChange={(e) => handleSelectChange('severity', e.target.value)}
            disabled={loading}
          >
            <option value="">All Severities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-type">Exception Type</label>
          <select
            id="filter-type"
            className="filter-select"
            value={filters.exceptionType}
            onChange={(e) => handleSelectChange('exceptionType', e.target.value)}
            disabled={loading}
          >
            <option value="">All Types</option>
            {exceptionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <form className="filter-bag-form" onSubmit={handleBagSearch}>
          <div className="filter-field" style={{ flex: 1 }}>
            <label htmlFor="filter-bag-id">Baggage ID</label>
            <input
              id="filter-bag-id"
              type="text"
              className="filter-input"
              placeholder="Exact ID (e.g. BAG00501)"
              value={bagIdInput}
              onChange={(e) => setBagIdInput(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            <Search size={16} />
            Search
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={loading || (!hasActiveFilters && !bagIdInput)}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
