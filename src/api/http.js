const TOKEN_STORAGE_KEY = 'hiremate_token';

export const tokenStorage = {
  get() {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  set(token) {
    try {
      if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
};

export function authHeaders(token = tokenStorage.get()) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Fetch JSON with optional JWT Authorization header.
 * - `auth`: 'none' | 'optional' | 'required'
 * - Automatically JSON-stringifies plain-object bodies and sets Content-Type.
 */
export async function fetchJson(url, options = {}, { auth = 'none' } = {}) {
  const {
    headers: inputHeaders = {},
    body: inputBody,
    ...rest
  } = options;

  const headers = { ...inputHeaders };

  if (auth === 'optional' || auth === 'required') {
    const token = tokenStorage.get();
    if (!token && auth === 'required') {
      throw new Error('Not authenticated');
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let body = inputBody;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  if (body !== undefined && body !== null && !isFormData && typeof body === 'object' && !(body instanceof Blob)) {
    if (!headers['Content-Type'] && !headers['content-type']) {
      headers['Content-Type'] = 'application/json';
    }
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...rest,
    headers,
    body
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  const data = isJson
    ? await response.json().catch(() => null)
    : await response.text().catch(() => '');

  if (!response.ok) {
    const message = (data && typeof data === 'object' && data.message)
      ? data.message
      : `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
