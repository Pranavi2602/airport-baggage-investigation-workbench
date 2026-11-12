import { useState, useCallback } from 'react';
import { fetchBaggageInvestigation } from '../api/baggageApi';

export function useBaggageInvestigation() {
  const [investigation, setInvestigation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (bagId) => {
    if (!bagId || !bagId.trim()) {
      setError('Please enter a Baggage ID to search.');
      return;
    }

    setLoading(true);
    setError(null);
    setInvestigation(null);
    setSearched(true);

    try {
      const data = await fetchBaggageInvestigation(bagId.trim());
      setInvestigation(data);
    } catch (err) {
      if (err.status === 404) {
        setError(`No baggage record found for ID "${bagId.trim()}".`);
      } else if (err.isNetworkError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setInvestigation(null);
    setError(null);
    setSearched(false);
  }, []);

  return { investigation, loading, error, searched, search, clear };
}
