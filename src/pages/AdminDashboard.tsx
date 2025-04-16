import React, { useState, useEffect } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, doc, updateDoc, getDocs, query, where, orderBy, deleteDoc, addDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-hot-toast';
import { Pencil, Trash, Check, X, Upload, Calendar, Users, MessageSquare, Image } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
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
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', imageUrl: '' });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: ''
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
      const docSnap = await getDoc(docRef);
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

  const handleImageUpload = async (file, path) => {
    try {
      const storageRef = ref(storage, `${path}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'announcements'), {
        ...newAnnouncement,
        createdAt: new Date()
      });
      toast.success('Announcement created successfully');
      setNewAnnouncement({ title: '', content: '', imageUrl: '' });
    } catch (error) {
      toast.error('Failed to create announcement');
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'events'), {
        ...newEvent,
        createdAt: new Date()
      });
      toast.success('Event created successfully');
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        imageUrl: ''
      });
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="inline-block w-5 h-5 mr-2" />
            Users
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('content')}
          >
            <Pencil className="inline-block w-5 h-5 mr-2" />
            Content
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar className="inline-block w-5 h-5 mr-2" />
            Events
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'announcements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('announcements')}
          >
            <MessageSquare className="inline-block w-5 h-5 mr-2" />
            Announcements
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div>
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
          )}

          {activeTab === 'content' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Home Page Content</h2>
              <div className="space-y-6">
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
          )}

          {activeTab === 'events' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="datetime-local"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files?.[0]) {
                        try {
                          const url = await handleImageUpload(e.target.files[0], 'events');
                          setNewEvent({ ...newEvent, imageUrl: url });
                        } catch (error) {
                          toast.error('Failed to upload image');
                        }
                      }
                    }}
                    className="mt-1 block w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Create Event
                </button>
              </form>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Create New Announcement</h2>
              <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files?.[0]) {
                        try {
                          const url = await handleImageUpload(e.target.files[0], 'announcements');
                          setNewAnnouncement({ ...newAnnouncement, imageUrl: url });
                        } catch (error) {
                          toast.error('Failed to upload image');
                        }
                      }
                    }}
                    className="mt-1 block w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Create Announcement
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;