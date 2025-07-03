import React, { useEffect } from "react";
import img3 from "../../assests/imgs/3.jpg";

const Team: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in-on-scroll");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
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
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute top-3/4 -right-4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000" />
      </div>

      {/* Icon */}
      <div className="mt-5 py-10">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4zM8 11c1.657 0 3-1.79 3-4S9.657 3 8 3 5 4.79 5 7s1.343 4 3 4zM8 13c-2.67 0-8 1.34-8 4v2h8v-2.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5V19h8v-2c0-2.66-5.33-4-8-4H8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-700 via-green-600 to-blue-700 bg-clip-text text-transparent">
          Our Team
        </h1>
        <p className="text-blue-600 mt-4 italic text-xl font-medium mb-8">
          “STRENGTHENING OUR COMMUNITY, EMBRACING OUR HERITAGE”
        </p>
      </div>

      {/* President's Message */}
      <section className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 mb-20 border border-blue-100 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <p>Dear Sponsors, Members, and Friends,</p>
        <p className="mt-4">
          It is a pleasure to share this update from the Luton Sri Lankan Welfare Association
          (LSLWA) as we continue to dedicate our efforts towards strengthening our community,
          preserving our heritage, and empowering the younger generation.
        </p>
        <p className="mt-4">
          Since our establishment, LSLWA has successfully organised a wide range of cultural
          celebrations, welfare initiatives, and educational programmes—fostering unity,
          wellbeing, and mutual support among Sri Lankans and other communities living in
          Luton and the surrounding areas.
        </p>
        <p className="mt-4">
          Our mission remains to provide an inclusive platform for connection, assistance, and
          cultural enrichment, ensuring all members feel valued, supported, and inspired.
        </p>
        <p className="mt-4">
          A heartfelt thank you goes to our Executive Committee, generous sponsors, and
          dedicated volunteers. Your continued commitment and support enable LSLWA to thrive,
          reach those in need, and proudly celebrate the richness of our shared traditions.
        </p>
        <p className="mt-4">
          As we look ahead, let us remain united, engaged, and forward-thinking, building a strong
          and inclusive network that will benefit not only our generation but also those to come.
        </p>
        <p className="mt-4">
          We look forward to welcoming you to our upcoming events and initiatives. Let us continue
          to work hand in hand to build a resilient, vibrant, and connected Sri Lankan community in
          Luton—non-political, multi-religious, and rich in multi-ethnicity.
        </p>
        <div className="mt-8 font-semibold">
          Warm regards,
          <br />
          Ernest Arrawwalage
          <br />
          President – LSLWA
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="text-center px-6 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Executive Team – 2025</h2>
        <p className="text-gray-600 mb-8">Meet the leaders behind LSLWA</p>

        {/* Team Group Photo */}
        <img
          src={img3}
          alt="Executive Team 2025"
          className="w-full max-w-4xl mx-auto rounded-xl shadow-lg mb-16"
        />

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-4">
          {[
            {
              name: "Ernest Arrawwalage",
              role: "President",
              img: "/path-to-profile1.jpg",
            },
            {
              name: "Member Name",
              role: "Secretary",
              img: "/path-to-profile2.jpg",
            },
            {
              name: "Member Name",
              role: "Treasurer",
              img: "/path-to-profile3.jpg",
            },
            // Add more members as needed
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-xl transform transition-all duration-300 hover:scale-105 text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 mx-auto mb-4 shadow"
              />
              <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fade-In CSS */}
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

export default Team;
