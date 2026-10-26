const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

async function readResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const body = await response.text();
  if (!body) return null;

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(body);
    } catch {
      throw new Error('The server returned invalid JSON.');
    }
  }
  return body;
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
    });
  } catch {
    throw new Error('Unable to reach the backend. Please check that it is running on port 8080.');
  }

  const data = await readResponse(response);
  if (!response.ok) {
    const detail = typeof data === 'string' ? data : data?.message || data?.error;
    throw new Error(detail || `Request failed with status ${response.status}.`);
  }
  return data;
}

export const checkBackend = () => request('/');
export const getAllSessions = () => request('/DisplayAll');
export const getSessionById = (id) => request(`/${encodeURIComponent(id)}`);
export const addSession = (sessionData) =>
  request('/Add', { method: 'POST', body: JSON.stringify(sessionData) });
export const deleteSession = (id) =>
  request(`/Delete/${encodeURIComponent(id)}`, { method: 'DELETE' });
