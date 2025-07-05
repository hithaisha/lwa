import React, { useEffect } from "react";

const Contact: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 text-gray-800 px-4 py-12">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute top-3/4 -right-4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000" />
      </div>
      {/* <div className="mb-8">
  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1">
    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
      <svg
        className="w-10 h-10 text-green-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M2.003 5.884a2.25 2.25 0 011.766-2.197l1.937-.387a1.25 1.25 0 011.44.903l.48 1.922a1.25 1.25 0 01-.362 1.233l-.933.934a11.037 11.037 0 005.292 5.292l.934-.933a1.25 1.25 0 011.233-.362l1.922.48a1.25 1.25 0 01.903 1.44l-.387 1.937a2.25 2.25 0 01-2.197 1.766A15.75 15.75 0 012.003 5.884z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
</div> */}


      {/* Title Section */}
      <div className="text-center fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000 mb-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700  to-blue-700 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg mt-4 text-blue-700 font-medium italic">
          We’d love to hear from you.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        {/* Contact Form */}
        <form className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-md border border-blue-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name*"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              placeholder="Last Name*"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email*"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number*"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            placeholder="Message*"
            rows={5}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-full hover:scale-105 transform transition-all duration-300 shadow-md"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-md border border-green-100 text-gray-700 space-y-6 text-lg">
          <div>
            <span className="font-semibold text-blue-700">Address:</span>
            <br />
            29 High Town, Luton, LU2 0BW, United Kingdom
          </div>
          <div>
            <span className="font-semibold text-blue-700"> Mobile:</span>
            <br />
            07770 519 723
          </div>
          <div>
            <span className="font-semibold text-blue-700"> Email:</span>
            <br />
            <a href="mailto:lutonsrilankanWA@gmail.com" className="text-blue-600 hover:underline">

              lutonsrilankanWA@gmail.com
            </a>
          </div>
          <div>
            <span className="font-semibold text-blue-700"> Facebook:</span>
            <br />
            <a href="https://www.facebook.com/LutonSriLankanWelfareAssociation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">

              Luton Sri Lankan Welfare Association
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Fade Styles */}
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

export default Contact;
