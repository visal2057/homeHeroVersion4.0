import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Read from our newly created shared context

const normalizeRole = (role) => String(role || '').toLowerCase();

const getDashboardForRole = (role) => {
    const normalized = normalizeRole(role);
    if (normalized === 'system_admin') return '/admin/system';
    if (normalized === 'verification_admin') return '/admin/verify';
    if (normalized === 'provider' || normalized === 'service_provider') return '/provider/dashboard';
    if (normalized === 'customer' || normalized === 'client') return '/dashboard';
    return '/login';
};

const canAccess = (userRole, requiredRole, allowRoles) => {
    if (!requiredRole && !allowRoles) return true;

    const normalizedUserRole = normalizeRole(userRole);
    const allowed = allowRoles
        ? (Array.isArray(allowRoles) ? allowRoles : [allowRoles])
        : (Array.isArray(requiredRole) ? requiredRole : [requiredRole]);

    const normalizedAllowed = allowed.map(normalizeRole);

    if (normalizedAllowed.includes(normalizedUserRole)) return true;
    if (normalizedUserRole === 'system_admin') return true; // System admins get master bypass
    return false;
};

const ProtectedRoute = ({ children, requiredRole, allowRoles }) => {
    const navigate = useNavigate();
    const { user, loading, logout } = useAuth(); // Destructure state values directly from context
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // If the context is still reading the browser storage on page refresh, wait.
        if (loading) return;

        // 1. If no user state profile is found, kick them out to login
        if (!user) {
            navigate('/login');
            return;
        }

        // 2. Token Lifetime check (7-day safety check from your original setup)
        const loginTime = localStorage.getItem('loginTime');
        if (loginTime) {
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - parseInt(loginTime, 10) > sevenDays) {
                logout(); // Clears all storage keys and redirects safely
                return;
            }
        }

        // 3. Permission Role Validation Check
        if (!canAccess(user.role, requiredRole, allowRoles)) {
            // Kick them back to their designated homepage layout
            navigate(getDashboardForRole(user.role));
            return;
        }

        // Everything looks perfect, flag them as allowed!
        setAuthorized(true);
    }, [user, loading, navigate, requiredRole, logout]);

    // Show a clean loading spinner/text while checking credentials
    if (loading || !authorized) {
        return (
            <div className="flex justify-center items-center h-screen text-lg text-slate-500 font-medium">
                Verifying permissions...
            </div>
        );
    }

    // Render the dashboard children elements securely
    return children;
};

export default ProtectedRoute;