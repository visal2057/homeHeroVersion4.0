import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getDashboardForRole = (role) => {
    if (role === 'SYSTEM_ADMIN') return '/admin/system';
    if (role === 'VERIFICATION_ADMIN') return '/admin/verify';
    if (role === 'provider') return '/auth/sp-dashboard';
    if (role === 'customer' || role === 'client') return '/dashboard';
    return '/login';
};

const canAccess = (userRole, requiredRole) => {
    if (!requiredRole) return true;

    const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (allowed.includes(userRole)) return true;
    if (userRole === 'SYSTEM_ADMIN') return true;
    return false;
};

const ProtectedRoute = ({ children, requiredRole }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (!token || !user) {
            navigate('/login');
            return;
        }

        const loginTime = localStorage.getItem('loginTime');
        if (loginTime) {
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - parseInt(loginTime, 10) > sevenDays) {
                localStorage.clear();
                navigate('/login');
                return;
            }
        }

        if (!canAccess(user.role, requiredRole)) {
            navigate(getDashboardForRole(user.role));
            return;
        }

        setAuthorized(true);
        setLoading(false);
    }, [navigate, requiredRole]);

    if (loading || !authorized) {
        return (
            <div className="flex justify-center items-center h-screen text-lg text-slate-500">
                Loading...
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
