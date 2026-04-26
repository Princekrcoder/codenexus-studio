import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

// ── Session timeout constants ──────────────────────────────────────────────
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;     // 30 minutes of inactivity = auto logout
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

// ─────────────────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);  // true while restoring session
    const inactivityTimer       = useRef(null);

    // ── Inactivity Auto-Logout ─────────────────────────────────────────────
    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            console.warn('Session expired due to inactivity');
            performLogout(true);
        }, INACTIVITY_TIMEOUT_MS);
    }, []); // eslint-disable-line

    const startActivityTracking = useCallback(() => {
        ACTIVITY_EVENTS.forEach(e => window.addEventListener(e, resetInactivityTimer, { passive: true }));
        resetInactivityTimer();
    }, [resetInactivityTimer]);

    const stopActivityTracking = useCallback(() => {
        ACTIVITY_EVENTS.forEach(e => window.removeEventListener(e, resetInactivityTimer));
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    }, [resetInactivityTimer]);

    // ── Restore Session on Mount ───────────────────────────────────────────
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const restoredUser = await authAPI.restoreSession();
                if (restoredUser) {
                    setUser(restoredUser);
                    startActivityTracking();
                }
            } catch (error) {
                console.error('Session restore failed:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();

        return () => stopActivityTracking();
    }, []); // eslint-disable-line

    // ── Login ──────────────────────────────────────────────────────────────
    const login = useCallback(async (email, password) => {
        const response = await authAPI.login(email, password);
        if (response.user) {
            setUser(response.user);
            startActivityTracking();
        }
        return response;
    }, [startActivityTracking]);

    // ── Logout ─────────────────────────────────────────────────────────────
    const performLogout = useCallback(async (inactivityTriggered = false) => {
        stopActivityTracking();
        await authAPI.logout();          // Clears cookie on server + localStorage
        setUser(null);

        if (inactivityTriggered) {
            // Show brief message before redirect
            const path = window.location.pathname;
            const loginUrl = path.startsWith('/client') ? '/client/login' : '/login';
            window.location.href = loginUrl;
        }
    }, [stopActivityTracking]);

    const logout = useCallback(() => performLogout(false), [performLogout]);

    // ── Context Value ──────────────────────────────────────────────────────
    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user && !loading,
        /**
         * Utility: update user in context without re-login (e.g. after profile update)
         */
        updateUser: (updatedUser) => setUser(prev => ({ ...prev, ...updatedUser })),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
