import React from 'react';
import { Calendar, Users, Heart, Trophy, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">Welcome to Luton Welfare Association</h1>
              <p className="text-xl mb-8">Building stronger communities through unity, support, and collective action. Join us in making a difference in Luton.</p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
                  <span>Join Our Community</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-blue-900 px-6 py-3 rounded-lg font-semibold transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Events Per Year</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Years of Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Impact in the Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80" 
                alt="Food Drive" 
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Food Drive Initiative</h3>
                <p className="text-gray-600">Supporting local families with essential nutrition and care packages.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80" 
                alt="Education Support" 
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Youth Education</h3>
                <p className="text-gray-600">Providing educational support and resources to young learners.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80" 
                alt="Community Events" 
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Community Events</h3>
                <p className="text-gray-600">Bringing people together through cultural celebrations and activities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-blue-100">Join our community and help us create positive change in Luton.</p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Become a Member
          </button>
        </div>
      </div>

      {/* Upcoming Events Preview */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((event) => (
              <div key={event} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-700 rounded-lg p-3">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Community Meetup #{event}</h3>
                    <p className="text-gray-600 mb-2">Join us for our monthly community gathering</p>
                    <p className="text-sm text-gray-500">March {event * 5}, 2024 • 6:00 PM</p>
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