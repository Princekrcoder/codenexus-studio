// ─────────────────────────────────────────────────────────────────────────────
// API Service — Production-ready with:
//  • Dual-storage: localStorage token + httpOnly cookie (backend sets cookie)
//  • Auto token refresh on 401 / TOKEN_EXPIRED
//  • Proactive expiry check before requests
//  • Proper credentials: 'include' for cross-domain cookies
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1000/api';

// ── Token Storage Helpers ────────────────────────────────────────────────────

const STORAGE_KEYS = {
    TOKEN:      'authToken',
    USER:       'authUser',
    EXPIRES_AT: 'authExpiresAt',
};

const storage = {
    setAuth: (token, user, expiresInSeconds) => {
        const expiresAt = Date.now() + expiresInSeconds * 1000;
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, String(expiresAt));
    },
    clearAuth: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.EXPIRES_AT);
        // Legacy keys cleanup
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
    },
    getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),
    getUser: () => {
        try {
            const u = localStorage.getItem(STORAGE_KEYS.USER);
            return u ? JSON.parse(u) : null;
        } catch { return null; }
    },
    getExpiresAt: () => {
        const v = localStorage.getItem(STORAGE_KEYS.EXPIRES_AT);
        return v ? parseInt(v, 10) : 0;
    },
    isTokenExpiredLocally: () => {
        const expiresAt = storage.getExpiresAt();
        if (!expiresAt) return true;
        // Treat as expired 30 seconds before actual expiry (proactive refresh)
        return Date.now() >= expiresAt - 30_000;
    },
};

// ── Refresh Token Logic ──────────────────────────────────────────────────────
// Singleton to prevent concurrent refresh calls
let _refreshPromise = null;

const doRefresh = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',                     // Send httpOnly refresh cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            // Fallback: some deployments may not support cookies; skip body token
        }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
        throw new Error(data.message || 'Token refresh failed');
    }
    // Save new access token from response body
    if (data.token && data.user) {
        storage.setAuth(data.token, data.user, data.expiresIn || 900);
    }
    return data;
};

const refreshAccessToken = () => {
    if (!_refreshPromise) {
        _refreshPromise = doRefresh().finally(() => { _refreshPromise = null; });
    }
    return _refreshPromise;
};

// ── Core Request Helper ──────────────────────────────────────────────────────
let _isRefreshing = false;

const apiRequest = async (endpoint, options = {}, _retry = false) => {
    // Proactively refresh if token is about to expire (within 30s)
    if (!_retry && storage.isTokenExpiredLocally() && storage.getToken()) {
        try {
            await refreshAccessToken();
        } catch {
            storage.clearAuth();
            redirectToLogin();
            throw new Error('Session expired. Please login again.');
        }
    }

    const token = storage.getToken();

    const config = {
        ...options,
        credentials: 'include',                     // Always include cookies (for httpOnly cookie auth)
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Also send in header for flexibility
            ...options.headers,
        },
    };

    let response;
    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    } catch (networkError) {
        throw new Error('Network error. Please check your connection.');
    }

    // Handle 401 — try one token refresh, then give up
    if (response.status === 401 && !_retry) {
        try {
            await refreshAccessToken();
            // Retry the original request once with new token
            return apiRequest(endpoint, options, true);
        } catch {
            storage.clearAuth();
            redirectToLogin();
            throw new Error('Session expired. Please login again.');
        }
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
};

// ── Redirect Helper ──────────────────────────────────────────────────────────
const redirectToLogin = () => {
    const path = window.location.pathname;
    const loginUrl = path.startsWith('/client') ? '/client/login' : '/login';
    if (!window.location.pathname.includes('login')) {
        window.location.href = loginUrl;
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTH API
// ─────────────────────────────────────────────────────────────────────────────
export const authAPI = {
    /**
     * Login — stores token + user in localStorage, backend sets httpOnly cookie
     */
    login: async (email, password) => {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (data.token && data.user) {
            storage.setAuth(data.token, data.user, data.expiresIn || 900);
        }
        return data;
    },

    /**
     * Register — same as login
     */
    register: async (userData) => {
        const data = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        if (data.token && data.user) {
            storage.setAuth(data.token, data.user, data.expiresIn || 900);
        }
        return data;
    },

    /**
     * Logout — calls backend to clear httpOnly cookie + clears localStorage
     */
    logout: async () => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e) {
            // Don't block logout if network fails
            console.warn('Logout request failed:', e.message);
        }
        storage.clearAuth();
    },

    /**
     * Restore session — fetch current user from server using stored token/cookie.
     * Use on app mount to verify session is still valid.
     */
    restoreSession: async () => {
        const token = storage.getToken();
        if (!token) {
            // Try cookie-based auth (httpOnly cookie might be present)
            try {
                const response = await fetch(`${API_BASE_URL}/auth/me`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.user) return data.user;
                }
            } catch { /* ignore */ }
            return null;
        }

        // We have a localStorage token — verify with server
        try {
            const data = await apiRequest('/auth/me');
            if (data.success && data.user) {
                // Sync user data (role might have changed)
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
                return data.user;
            }
        } catch {
            storage.clearAuth();
        }
        return null;
    },

    /**
     * Refresh access token manually
     */
    refreshToken: async () => {
        return refreshAccessToken();
    },

    getCurrentUser: () => storage.getUser(),

    isAuthenticated: () => {
        const token = storage.getToken();
        const user = storage.getUser();
        return !!(token && user);
    },

    forgotPassword: async (email) => {
        return apiRequest('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },

    resetPassword: async (token, password) => {
        return apiRequest(`/auth/reset-password/${token}`, {
            method: 'PUT',
            body: JSON.stringify({ password }),
        });
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// CLIENTS API
// ─────────────────────────────────────────────────────────────────────────────
export const clientsAPI = {
    getAll:   (params = {}) => apiRequest(`/clients?${new URLSearchParams(params)}`),
    getById:  (id)          => apiRequest(`/clients/${id}`),
    create:   (data)        => apiRequest('/clients', { method: 'POST', body: JSON.stringify(data) }),
    update:   (id, data)    => apiRequest(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete:   (id)          => apiRequest(`/clients/${id}`, { method: 'DELETE' }),
};

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS API
// ─────────────────────────────────────────────────────────────────────────────
export const projectsAPI = {
    getAll:   (params = {}) => apiRequest(`/projects?${new URLSearchParams(params)}`),
    getById:  (id)          => apiRequest(`/projects/${id}`),
    create:   (data)        => apiRequest('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update:   (id, data)    => apiRequest(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete:   (id)          => apiRequest(`/projects/${id}`, { method: 'DELETE' }),
};

// ─────────────────────────────────────────────────────────────────────────────
// LEADS API
// ─────────────────────────────────────────────────────────────────────────────
export const leadsAPI = {
    getAll:   (params = {}) => apiRequest(`/leads?${new URLSearchParams(params)}`),
    getById:  (id)          => apiRequest(`/leads/${id}`),
    create:   (data)        => apiRequest('/leads', { method: 'POST', body: JSON.stringify(data) }),
    update:   (id, data)    => apiRequest(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    convert:  (id)          => apiRequest(`/leads/${id}/convert`, { method: 'POST' }),
    delete:   (id)          => apiRequest(`/leads/${id}`, { method: 'DELETE' }),
};

// ─────────────────────────────────────────────────────────────────────────────
// INVOICES API
// ─────────────────────────────────────────────────────────────────────────────
export const invoicesAPI = {
    getAll:          (params = {}) => apiRequest(`/invoices?${new URLSearchParams(params)}`),
    getById:         (id)          => apiRequest(`/invoices/${id}`),
    create:          (data)        => apiRequest('/invoices', { method: 'POST', body: JSON.stringify(data) }),
    update:          (id, data)    => apiRequest(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    markAsPaid:      (id, data)    => apiRequest(`/invoices/${id}/mark-paid`, { method: 'POST', body: JSON.stringify(data) }),
    getRevenueStats: ()            => apiRequest('/invoices/stats/revenue'),
    delete:          (id)          => apiRequest(`/invoices/${id}`, { method: 'DELETE' }),
};

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD API
// ─────────────────────────────────────────────────────────────────────────────
export const dashboardAPI = {
    getData:         ()            => apiRequest('/dashboard'),
    getActivityFeed: (params = {}) => apiRequest(`/dashboard/activity?${new URLSearchParams(params)}`),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMMUNICATIONS API
// ─────────────────────────────────────────────────────────────────────────────
export const communicationsAPI = {
    getAll:       (params = {}) => apiRequest(`/communications?${new URLSearchParams(params)}`),
    create:       (data)        => apiRequest('/communications', { method: 'POST', body: JSON.stringify(data) }),
    getFollowUps: ()            => apiRequest('/communications/follow-ups'),
    update:       (id, data)    => apiRequest(`/communications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete:       (id)          => apiRequest(`/communications/${id}`, { method: 'DELETE' }),
};

// ─────────────────────────────────────────────────────────────────────────────
// TEAM API
// ─────────────────────────────────────────────────────────────────────────────
export const teamAPI = {
    getAll:      (params = {}) => apiRequest(`/team?${new URLSearchParams(params)}`),
    getById:     (id)          => apiRequest(`/team/${id}`),
    create:      (data)        => apiRequest('/team', { method: 'POST', body: JSON.stringify(data) }),
    update:      (id, data)    => apiRequest(`/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deactivate:  (id)          => apiRequest(`/team/${id}/deactivate`, { method: 'POST' }),
    delete:      (id)          => apiRequest(`/team/${id}`, { method: 'DELETE' }),
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT API
// ─────────────────────────────────────────────────────────────────────────────
export const contactAPI = {
    submit:        (data)        => apiRequest('/contact/submit', { method: 'POST', body: JSON.stringify(data) }),
    getInquiries:  (params = {}) => apiRequest(`/contact?${new URLSearchParams(params)}`),
    updateStatus:  (id, status)  => apiRequest(`/contact/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// ─────────────────────────────────────────────────────────────────────────────
// FILES API
// ─────────────────────────────────────────────────────────────────────────────
export const filesAPI = {
    getAll:   (params = {}) => apiRequest(`/files?${new URLSearchParams(params)}`),
    getById:  (id)          => apiRequest(`/files/${id}`),
    create:   (data)        => apiRequest('/files', { method: 'POST', body: JSON.stringify(data) }),
    delete:   (id)          => apiRequest(`/files/${id}`, { method: 'DELETE' }),
};

// ─────────────────────────────────────────────────────────────────────────────
// MESSAGES API
// ─────────────────────────────────────────────────────────────────────────────
export const messagesAPI = {
    getAll:     (params = {}) => apiRequest(`/messages?${new URLSearchParams(params)}`),
    getById:    (id)          => apiRequest(`/messages/${id}`),
    create:     (data)        => apiRequest('/messages', { method: 'POST', body: JSON.stringify(data) }),
    markAsRead: (id)          => apiRequest(`/messages/${id}/read`, { method: 'PUT' }),
    delete:     (id)          => apiRequest(`/messages/${id}`, { method: 'DELETE' }),
};

export default {
    auth: authAPI,
    clients: clientsAPI,
    projects: projectsAPI,
    leads: leadsAPI,
    invoices: invoicesAPI,
    dashboard: dashboardAPI,
    communications: communicationsAPI,
    team: teamAPI,
    contact: contactAPI,
    files: filesAPI,
    messages: messagesAPI,
};
