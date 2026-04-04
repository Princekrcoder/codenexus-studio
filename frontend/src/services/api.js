// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1000/api';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Helper function to make API requests with automatic token refresh
const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        // Handle 401 Unauthorized - token might be expired
        if (response.status === 401 && token) {
            // Clear auth and redirect to login
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');

            // Redirect based on current path
            const currentPath = window.location.pathname;
            if (currentPath.startsWith('/client')) {
                window.location.href = '/client/login';
            } else {
                window.location.href = '/login';
            }
            throw new Error('Session expired. Please login again.');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Authentication API
export const authAPI = {
    login: async (email, password) => {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    register: async (userData) => {
        const data = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        const token = getAuthToken();
        // Return user only if both user data and token exist
        return (user && token) ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        const token = getAuthToken();
        const user = localStorage.getItem('user');
        return !!(token && user);
    },

    forgotPassword: async (email) => {
        return await apiRequest('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },

    resetPassword: async (token, password) => {
        return await apiRequest(`/auth/reset-password/${token}`, {
            method: 'PUT',
            body: JSON.stringify({ password }),
        });
    },
};

// Clients API
export const clientsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/clients?${queryString}`);
    },

    getById: async (id) => {
        return await apiRequest(`/clients/${id}`);
    },

    create: async (clientData) => {
        return await apiRequest('/clients', {
            method: 'POST',
            body: JSON.stringify(clientData),
        });
    },

    update: async (id, clientData) => {
        return await apiRequest(`/clients/${id}`, {
            method: 'PUT',
            body: JSON.stringify(clientData),
        });
    },

    delete: async (id) => {
        return await apiRequest(`/clients/${id}`, {
            method: 'DELETE',
        });
    },
};

// Projects API
export const projectsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/projects?${queryString}`);
    },

    getById: async (id) => {
        return await apiRequest(`/projects/${id}`);
    },

    create: async (projectData) => {
        return await apiRequest('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData),
        });
    },

    update: async (id, projectData) => {
        return await apiRequest(`/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(projectData),
        });
    },

    delete: async (id) => {
        return await apiRequest(`/projects/${id}`, {
            method: 'DELETE',
        });
    },
};

// Leads API
export const leadsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/leads?${queryString}`);
    },

    getById: async (id) => {
        return await apiRequest(`/leads/${id}`);
    },

    create: async (leadData) => {
        return await apiRequest('/leads', {
            method: 'POST',
            body: JSON.stringify(leadData),
        });
    },

    update: async (id, leadData) => {
        return await apiRequest(`/leads/${id}`, {
            method: 'PUT',
            body: JSON.stringify(leadData),
        });
    },

    convert: async (id) => {
        return await apiRequest(`/leads/${id}/convert`, {
            method: 'POST',
        });
    },

    delete: async (id) => {
        return await apiRequest(`/leads/${id}`, {
            method: 'DELETE',
        });
    },
};

// Invoices API
export const invoicesAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/invoices?${queryString}`);
    },

    getById: async (id) => {
        return await apiRequest(`/invoices/${id}`);
    },

    create: async (invoiceData) => {
        return await apiRequest('/invoices', {
            method: 'POST',
            body: JSON.stringify(invoiceData),
        });
    },

    update: async (id, invoiceData) => {
        return await apiRequest(`/invoices/${id}`, {
            method: 'PUT',
            body: JSON.stringify(invoiceData),
        });
    },

    markAsPaid: async (id, paymentData) => {
        return await apiRequest(`/invoices/${id}/mark-paid`, {
            method: 'POST',
            body: JSON.stringify(paymentData),
        });
    },

    getRevenueStats: async () => {
        return await apiRequest('/invoices/stats/revenue');
    },

    delete: async (id) => {
        return await apiRequest(`/invoices/${id}`, {
            method: 'DELETE',
        });
    },
};

// Dashboard API
export const dashboardAPI = {
    getData: async () => {
        return await apiRequest('/dashboard');
    },

    getActivityFeed: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/dashboard/activity?${queryString}`);
    },
};

// Communications API
export const communicationsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/communications?${queryString}`);
    },

    create: async (commData) => {
        return await apiRequest('/communications', {
            method: 'POST',
            body: JSON.stringify(commData),
        });
    },

    getFollowUps: async () => {
        return await apiRequest('/communications/follow-ups');
    },

    update: async (id, commData) => {
        return await apiRequest(`/communications/${id}`, {
            method: 'PUT',
            body: JSON.stringify(commData),
        });
    },

    delete: async (id) => {
        return await apiRequest(`/communications/${id}`, {
            method: 'DELETE',
        });
    },
};

// Team API
export const teamAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/team?${queryString}`);
    },

    getById: async (id) => {
        return await apiRequest(`/team/${id}`);
    },

    create: async (memberData) => {
        return await apiRequest('/team', {
            method: 'POST',
            body: JSON.stringify(memberData),
        });
    },

    update: async (id, memberData) => {
        return await apiRequest(`/team/${id}`, {
            method: 'PUT',
            body: JSON.stringify(memberData),
        });
    },

    deactivate: async (id) => {
        return await apiRequest(`/team/${id}/deactivate`, {
            method: 'POST',
        });
    },

    delete: async (id) => {
        return await apiRequest(`/team/${id}`, {
            method: 'DELETE',
        });
    },
};

// Contact API
export const contactAPI = {
    submit: async (formData) => {
        return await apiRequest('/contact/submit', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
    },

    getInquiries: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/contact?${queryString}`);
    },

    updateStatus: async (id, status) => {
        return await apiRequest(`/contact/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },
};

// Files API
export const filesAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/files?${queryString}`);
    },

    getById: async (id) => {
        return await apiRequest(`/files/${id}`);
    },

    create: async (fileData) => {
        return await apiRequest('/files', {
            method: 'POST',
            body: JSON.stringify(fileData),
        });
    },

    delete: async (id) => {
        return await apiRequest(`/files/${id}`, {
            method: 'DELETE',
        });
    },
};

// Messages API
export const messagesAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/messages?${queryString}`);
    },

    getById: async (id) => {
        return await apiRequest(`/messages/${id}`);
    },

    create: async (messageData) => {
        return await apiRequest('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData),
        });
    },

    markAsRead: async (id) => {
        return await apiRequest(`/messages/${id}/read`, {
            method: 'PUT',
        });
    },

    delete: async (id) => {
        return await apiRequest(`/messages/${id}`, {
            method: 'DELETE',
        });
    },
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
