import apiClient from './apiClient';

export function fetchDashboardSummary() {
  return apiClient.get('/api/dashboard/summary');
}
