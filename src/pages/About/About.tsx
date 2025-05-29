import React, { useState, useEffect } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImpact, setCurrentImpact] = useState(0);

  const impactAreas = [
    "Education for All",
    "Community Development",
    "Environmental Care",
  ];

  const stats = [
    { number: "10,000+", label: "Lives Touched" },
    { number: "25+", label: "Communities Served" },
    { number: "15", label: "Years of Service" },
    { number: "500+", label: "Active Volunteers" },
  ];

  const milestones = [
    {
      year: "2009",
      title: "Foundation Established",
      description: "Started with a vision to serve the underprivileged",
    },
    {
      year: "2015",
      title: "Education Initiative",
      description: "Launched free education programs for children",
    },
    {
      year: "2018",
      title: "Healthcare Expansion",
      description: "Opened community health centers",
    },
    {
      year: "2023",
      title: "Digital Outreach",
      description: "Expanded services through technology",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImpact((prev) => (prev + 1) % impactAreas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in-on-scroll");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 text-gray-800">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 -right-4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div
          className={`max-w-5xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-700 via-blue-600 to-green-700 bg-clip-text text-transparent">
            Luton Welfare Association
          </h1>

          <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center">
            <span className="text-gray-600">Dedicated to </span>
            <span className="ml-2 text-blue-600 font-semibold min-w-max">
              {impactAreas[currentImpact]}
            </span>
          </div>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we have been committed to uplifting communities,
            empowering individuals, and creating lasting positive change in
            society through compassionate service and sustainable initiatives.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-xl">
              Join Our Mission
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-green-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transform transition-all duration-300"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower underprivileged communities through comprehensive
                welfare programs, focusing on education, healthcare, and
                sustainable development while fostering dignity, hope, and
                self-reliance among those we serve.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-green-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                A world where every individual has equal access to opportunities
                for growth, where communities thrive together, and where
                compassion drives sustainable social change for generations to
                come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-6 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 items-start group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transform transition-all duration-300">
                    {milestone.year.slice(-2)}
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 flex-1 shadow-lg border border-gray-200 group-hover:shadow-xl transform group-hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-lg font-bold text-green-600">
                      {milestone.year}
                    </span>
                    <div className="h-px bg-gradient-to-r from-green-500 to-blue-500 fle x-1"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Compassion",
                desc: "We serve with empathy and understanding",
              },
              {
                icon: "🌱",
                title: "Sustainability",
                desc: "Creating lasting positive change",
              },
              {
                icon: "🤗",
                title: "Inclusivity",
                desc: "Embracing diversity in all our programs",
              },
              {
                icon: "💪",
                title: "Empowerment",
                desc: "Building strength within communities",
              },
              {
                icon: "🔍",
                title: "Transparency",
                desc: "Open and accountable operations",
              },
              {
                icon: "🌟",
                title: "Excellence",
                desc: "Striving for the highest impact",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transform transition-all duration-300"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Be Part of the Change
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join us in our mission to create a better world. Every contribution,
            big or small, makes a meaningful difference in someone's life.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button className="px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 hover:shadow-xl">
              Volunteer With Us
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .fade-in-on-scroll {
          transition: all 1s ease-out;
        }
        .fade-in-on-scroll.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default About;
