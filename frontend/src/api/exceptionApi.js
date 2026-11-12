import apiClient from './apiClient';

export function fetchExceptions(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.severity) params.set('severity', filters.severity);
  if (filters.exceptionType) params.set('exceptionType', filters.exceptionType);
  if (filters.bagId && filters.bagId.trim()) params.set('bagId', filters.bagId.trim());

  const query = params.toString();
  return apiClient.get(`/api/exceptions${query ? `?${query}` : ''}`);
}

export function fetchExceptionById(exceptionId) {
  return apiClient.get(`/api/exceptions/${encodeURIComponent(exceptionId)}`);
}

export function fetchExceptionSummary() {
  return apiClient.get('/api/exceptions/summary');
}

export function updateExceptionStatus(exceptionId, payload) {
  return apiClient.put(
    `/api/exceptions/${encodeURIComponent(exceptionId)}/status`,
    payload
  );
}
