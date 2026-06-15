import React from 'react';
import { Link } from 'react-router-dom';

const EmailVerified = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h1>
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <Link 
          to="/login" 
          className="inline-block w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 text-center transition-all"
        >
          Login Now
        </Link>
      </div>
    </div>
  );
};

export default EmailVerified;