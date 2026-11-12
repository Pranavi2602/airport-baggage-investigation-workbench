import apiClient from './apiClient';

export function fetchBaggageInvestigation(bagId) {
  return apiClient.get(`/api/baggage/${encodeURIComponent(bagId)}/investigation`);
}

export function fetchHealthStatus() {
  return apiClient.get('/api/health');
}
