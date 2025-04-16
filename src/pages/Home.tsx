import React from 'react';
import { Calendar, Users, Heart, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[400px] md:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white w-full max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Welcome to Luton Welfare Association</h1>
              <p className="text-lg md:text-xl mb-6 md:mb-8">Building stronger communities through unity, support, and collective action. Join us in making a difference in Luton.</p>
              {!user && (
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link 
                    to="/register" 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors text-center"
                  >
                    <span>Join Our Community</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link 
                    to="/login"
                    className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-blue-900 px-6 py-3 rounded-lg font-semibold transition-all text-center"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4">
              <Users className="h-8 w-8 md:h-12 md:w-12 text-blue-600 mx-auto mb-3 md:mb-4" />
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">500+</h3>
              <p className="text-sm md:text-base text-gray-600">Active Members</p>
            </div>
            <div className="text-center p-4">
              <Calendar className="h-8 w-8 md:h-12 md:w-12 text-blue-600 mx-auto mb-3 md:mb-4" />
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">50+</h3>
              <p className="text-sm md:text-base text-gray-600">Events Per Year</p>
            </div>
            <div className="text-center p-4">
              <Heart className="h-8 w-8 md:h-12 md:w-12 text-blue-600 mx-auto mb-3 md:mb-4" />
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">1000+</h3>
              <p className="text-sm md:text-base text-gray-600">Lives Impacted</p>
            </div>
            <div className="text-center p-4">
              <Trophy className="h-8 w-8 md:h-12 md:w-12 text-blue-600 mx-auto mb-3 md:mb-4" />
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">15+</h3>
              <p className="text-sm md:text-base text-gray-600">Years of Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">Our Impact in the Community</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80" 
                alt="Food Drive" 
                className="h-48 w-full object-cover"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Food Drive Initiative</h3>
                <p className="text-sm md:text-base text-gray-600">Supporting local families with essential nutrition and care packages.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80" 
                alt="Education Support" 
                className="h-48 w-full object-cover"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Youth Education</h3>
                <p className="text-sm md:text-base text-gray-600">Providing educational support and resources to young learners.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 sm:col-span-2 md:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80" 
                alt="Community Events" 
                className="h-48 w-full object-cover"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Community Events</h3>
                <p className="text-sm md:text-base text-gray-600">Bringing people together through cultural celebrations and activities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">Join our community and help us create positive change in Luton.</p>
          {!user && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/register"
                className="w-full sm:w-auto bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Become a Member
              </Link>
              <Link 
                to="/login"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events Preview */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((event) => (
              <div key={event} className="bg-gray-50 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-700 rounded-lg p-3">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-2">Community Meetup #{event}</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-2">Join us for our monthly community gathering</p>
                    <p className="text-xs md:text-sm text-gray-500">March {event * 5}, 2024 • 6:00 PM</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;