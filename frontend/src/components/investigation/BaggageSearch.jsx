import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function BaggageSearch({ onSearch, onClear, loading }) {
  const [bagId, setBagId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(bagId);
  };

  const handleClear = () => {
    setBagId('');
    onClear();
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <label htmlFor="bag-id-input">Baggage ID</label>
          <input
            id="bag-id-input"
            type="text"
            className="search-input"
            placeholder="e.g. BAG00501"
            value={bagId}
            onChange={(e) => setBagId(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="search-buttons" style={{ display: 'flex', gap: 8 }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            <Search size={16} />
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={loading}
          >
            <X size={16} />
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
