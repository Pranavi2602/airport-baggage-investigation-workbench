import { useState, useEffect, useCallback } from 'react';
import { fetchHealthStatus } from '../api/baggageApi';

export function useHealthCheck(intervalMs = 30000) {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');

  const checkHealth = useCallback(async () => {
    try {
      const response = await fetchHealthStatus();
      setStatus('connected');
      setMessage(typeof response === 'string' ? response : 'Connected');
    } catch {
      setStatus('disconnected');
      setMessage('Backend unavailable');
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, intervalMs);
    return () => clearInterval(interval);
  }, [checkHealth, intervalMs]);

  return { status, message, checkHealth };
}
