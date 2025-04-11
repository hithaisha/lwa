import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const MemberDashboard = () => {
  const { membershipStatus } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Member Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Membership Status</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            Status: {' '}
            <span className={`font-semibold ${membershipStatus?.active ? 'text-green-600' : 'text-red-600'}`}>
              {membershipStatus?.active ? 'Active' : 'Inactive'}
            </span>
          </p>
          {membershipStatus?.expiryDate && (
            <p className="text-gray-600">
              Expires: {format(membershipStatus.expiryDate, 'PPP')}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <p className="text-gray-600">View your recent interactions and comments</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <p className="text-gray-600">Stay updated with our upcoming events</p>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;