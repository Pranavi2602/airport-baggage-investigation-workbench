import { useState, useEffect } from 'react';
import { fetchDashboardSummary } from '../api/dashboardApi';

export function useDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSummary() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDashboardSummary();
        if (!cancelled) {
          setSummary(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.isNetworkError
            ? err.message
            : 'Failed to load dashboard data. Please try again later.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, []);

  return { summary, loading, error };
}
