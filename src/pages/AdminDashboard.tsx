import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Users, Settings, BarChart, FileText, Mail, Calendar, Bell, MessageSquare, Image, Heart, Menu, X } from 'lucide-react';
import UsersManagement from './admin/UsersManagement';
import EventsManagement from './admin/EventsManagement';
import ContentManagement from './admin/ContentManagement';
import AnnouncementsManagement from './admin/AnnouncementsManagement';
import DonationsManagement from './admin/DonationsManagement';
import ResourcesManagement from './admin/ResourcesManagement';
import NewsletterManagement from './admin/NewsletterManagement';
import GalleryManagement from './admin/GalleryManagement';
import Analytics from './admin/Analytics';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingApprovals: 0,
    activeMembers: 0,
    totalDonations: 0
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const fetchDashboardStats = async () => {
    try {
      const usersQuery = query(collection(db, 'users'));
      const pendingQuery = query(collection(db, 'users'), where('registrationStatus', '==', 'pending'));
      const activeMembersQuery = query(collection(db, 'users'), where('membershipActive', '==', true));
      const donationsQuery = query(collection(db, 'donations'));

      const [usersSnap, pendingSnap, activeMembersSnap, donationsSnap] = await Promise.all([
        getDocs(usersQuery),
        getDocs(pendingQuery),
        getDocs(activeMembersQuery),
        getDocs(donationsQuery)
      ]);

      setStats({
        totalUsers: usersSnap.size,
        pendingApprovals: pendingSnap.size,
        activeMembers: activeMembersSnap.size,
        totalDonations: donationsSnap.size
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const navItems = [
    { path: '', icon: BarChart, label: 'Overview' },
    { path: 'users', icon: Users, label: 'Users' },
    { path: 'events', icon: Calendar, label: 'Events' },
    { path: 'content', icon: FileText, label: 'Content' },
    { path: 'announcements', icon: Bell, label: 'Announcements' },
    { path: 'donations', icon: Heart, label: 'Donations' },
    { path: 'resources', icon: MessageSquare, label: 'Resources' },
    { path: 'newsletter', icon: Mail, label: 'Newsletter' },
    { path: 'gallery', icon: Image, label: 'Gallery' },
    { path: 'settings', icon: Settings, label: 'Settings' }
  ];

  const NavigationLinks = () => (
    <>
      {navItems.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={`/admin/${path}`}
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
            location.pathname === `/admin/${path}`
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Icon className="h-5 w-5 mr-3" />
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900">Admin Dashboard</h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-30">
            <div className="absolute inset-0 bg-gray-600 bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
              </div>
              <nav className="p-4 space-y-1">
                <NavigationLinks />
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Admin Dashboard</h2>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            <NavigationLinks />
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                  title="Total Users"
                  value={stats.totalUsers}
                  icon={Users}
                  color="blue"
                />
                <StatCard
                  title="Pending Approvals"
                  value={stats.pendingApprovals}
                  icon={Bell}
                  color="yellow"
                />
                <StatCard
                  title="Active Members"
                  value={stats.activeMembers}
                  icon={Users}
                  color="green"
                />
                <StatCard
                  title="Total Donations"
                  value={stats.totalDonations}
                  icon={Heart}
                  color="red"
                />
              </div>
            } />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/events" element={<EventsManagement />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/announcements" element={<AnnouncementsManagement />} />
            <Route path="/donations" element={<DonationsManagement />} />
            <Route path="/resources" element={<ResourcesManagement />} />
            <Route path="/newsletter" element={<NewsletterManagement />} />
            <Route path="/gallery" element={<GalleryManagement />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;