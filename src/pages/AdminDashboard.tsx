import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, doc, updateDoc, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Pencil, Trash, Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [homeContent, setHomeContent] = useState({
    stats: {
      members: '500+',
      events: '50+',
      impact: '1000+',
      years: '15+'
    },
    featuredProjects: []
  });

  useEffect(() => {
    fetchPendingUsers();
    fetchHomeContent();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('registrationStatus', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      setPendingUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching pending users:', error);
      toast.error('Failed to load pending registrations');
    }
  };

  const fetchHomeContent = async () => {
    try {
      const docRef = doc(db, 'content', 'home');
      const docSnap = await getDocs(docRef);
      if (docSnap.exists()) {
        setHomeContent(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching home content:', error);
    }
  };

  const handleUserApproval = async (userId, approved) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        registrationStatus: approved ? 'approved' : 'rejected',
        approved: approved
      });
      toast.success(`User ${approved ? 'approved' : 'rejected'} successfully`);
      fetchPendingUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const updateHomeContent = async (newContent) => {
    try {
      await updateDoc(doc(db, 'content', 'home'), newContent);
      toast.success('Home page content updated successfully');
      setHomeContent(newContent);
    } catch (error) {
      console.error('Error updating home content:', error);
      toast.error('Failed to update home content');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {/* Pending Registrations */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Registrations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUserApproval(user.id, true)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleUserApproval(user.id, false)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Home Page Content Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Home Page Content</h2>
        <div className="space-y-6">
          {/* Stats Editor */}
          <div>
            <h3 className="text-lg font-medium mb-3">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(homeContent.stats).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setHomeContent({
                      ...homeContent,
                      stats: {
                        ...homeContent.stats,
                        [key]: e.target.value
                      }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => updateHomeContent(homeContent)}
            className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;