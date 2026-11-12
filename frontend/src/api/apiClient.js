const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

async function parseErrorMessage(response) {
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (data?.message) return data.message;
      if (data?.detail) return data.detail;
      if (data?.error) return data.error;
    } else {
      const text = await response.text();
      if (text) return text;
    }
  } catch {
    // fallback to HTTP status
  }
  return `HTTP ${response.status}`;
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const message = await parseErrorMessage(response);
      const error = new Error(message);
      error.status = response.status;
      throw error;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    if (error.status) {
      throw error;
    }
    const networkError = new Error('Unable to connect to the backend. Please check whether the Spring Boot application is running.');
    networkError.isNetworkError = true;
    throw networkError;
  }
}

export function get(endpoint) {
  return request(endpoint, { method: 'GET' });
}

export function put(endpoint, data) {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export default { get, put };
