import { useState, useEffect, useCallback } from 'react';
import {
  fetchExceptions,
  fetchExceptionById,
  fetchExceptionSummary,
  updateExceptionStatus,
} from '../api/exceptionApi';

const INITIAL_FILTERS = {
  status: '',
  severity: '',
  exceptionType: '',
  bagId: '',
};

export function useExceptions() {
  const [exceptions, setExceptions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [exceptionTypes, setExceptionTypes] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedException, setSelectedException] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const data = await fetchExceptionSummary();
      setSummary(data);
    } catch {
      // Main list error handles backend unavailability
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadExceptions = useCallback(async (activeFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExceptions(activeFilters);
      const list = Array.isArray(data) ? data : [];
      setExceptions(list);

      // Preserve discovered exception types so dropdown stays populated when filtered
      setExceptionTypes((prev) => {
        const merged = new Set(prev);
        for (const item of list) {
          if (item.exceptionType) merged.add(item.exceptionType);
        }
        return Array.from(merged).sort();
      });
    } catch (err) {
      setError(
        err.isNetworkError
          ? err.message
          : err.message || 'Failed to load exception records.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadExceptions(filters);
  }, [filters, loadExceptions]);

  const selectException = useCallback(async (exceptionId) => {
    if (!exceptionId) return;
    setDetailLoading(true);
    setDetailError(null);
    setUpdateError(null);
    try {
      const data = await fetchExceptionById(exceptionId);
      setSelectedException(data);
    } catch (err) {
      setDetailError(
        err.status === 404
          ? `Exception "${exceptionId}" was not found.`
          : err.isNetworkError
          ? err.message
          : err.message || 'Failed to load exception details.'
      );
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const clearSelectedException = useCallback(() => {
    setSelectedException(null);
    setDetailError(null);
    setUpdateError(null);
  }, []);

  const updateStatus = useCallback(
    async (exceptionId, payload) => {
      setUpdating(true);
      setUpdateError(null);
      try {
        const updated = await updateExceptionStatus(exceptionId, payload);
        setSelectedException(updated);
        await Promise.all([loadExceptions(filters), loadSummary()]);
        return updated;
      } catch (err) {
        const message = err.isNetworkError
          ? err.message
          : err.message || 'Failed to update exception status.';
        setUpdateError(message);
        throw err;
      } finally {
        setUpdating(false);
      }
    },
    [filters, loadExceptions, loadSummary]
  );

  const applyFilters = useCallback((nextFilters) => {
    setFilters(nextFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  return {
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
  };
}
