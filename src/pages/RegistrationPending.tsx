import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const RegistrationPending = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Pending</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering! Your application is currently under review by our administrators.
            We'll notify you once your account has been approved.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPending;