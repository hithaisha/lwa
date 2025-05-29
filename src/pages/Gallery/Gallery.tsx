import React, { useState, useEffect } from "react";

// Mock Firebase data - Replace with actual Firebase imports
// import { db } from '../firebase/config';
// import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Mock data - Replace with Firebase data
  const mockGalleryData = [
    {
      id: 1,
      title: "Community Health Camp",
      category: "healthcare",
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop",
      ],
      date: "2024-01-15",
      description:
        "Free health checkups and medical consultations for rural communities",
    },
    {
      id: 2,
      title: "Education Drive 2024",
      category: "education",
      images: [
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop",
      ],
      date: "2024-02-20",
      description:
        "Distributing books and educational materials to underprivileged children",
    },
    {
      id: 3,
      title: "Tree Plantation Drive",
      category: "environment",
      images: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=600&fit=crop",
      ],
      date: "2024-03-10",
      description: "Planting 1000+ trees across various locations in the city",
    },
    {
      id: 4,
      title: "Women Empowerment Workshop",
      category: "empowerment",
      images: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      ],
      date: "2024-04-05",
      description: "Skills training and entrepreneurship workshops for women",
    },
    {
      id: 5,
      title: "Food Distribution",
      category: "community",
      images: [
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      ],
      date: "2024-05-12",
      description:
        "Providing nutritious meals to families in need during difficult times",
    },
    {
      id: 6,
      title: "Disaster Relief Operations",
      category: "emergency",
      images: [
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      ],
      date: "2024-05-20",
      description:
        "Emergency response and relief distribution during natural disasters",
    },
  ];

  const categories = [
    { id: "all", name: "All Events", icon: "🌟" },
    { id: "healthcare", name: "Healthcare", icon: "🏥" },
    { id: "education", name: "Education", icon: "📚" },
    { id: "environment", name: "Environment", icon: "🌱" },
    { id: "empowerment", name: "Empowerment", icon: "💪" },
    { id: "community", name: "Community", icon: "🤝" },
    { id: "emergency", name: "Emergency", icon: "🚨" },
  ];

  // Firebase connection - Uncomment and modify for actual Firebase usage
  useEffect(() => {
    const fetchGalleryData = () => {
      const q = query(collection(db, "gallery"), orderBy("date", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setGalleryData(data);
        setFilteredData(data);
        setLoading(false);
        setIsVisible(true);
      });
      return unsubscribe;
    };
    const unsubscribe = fetchGalleryData();
    return () => unsubscribe();

    // Mock data loading
    // setTimeout(() => {
    //   setGalleryData(mockGalleryData);
    //   setFilteredData(mockGalleryData);
    //   setLoading(false);
    //   setIsVisible(true);
    // }, 1000);
  }, []);

  // Filter gallery by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredData(galleryData);
    } else {
      setFilteredData(
        galleryData.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory, galleryData]);

  // Scroll animations
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

  const openLightbox = (image, title, description) => {
    setSelectedImage({ url: image, title, description });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 text-gray-800">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 -right-4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div
          className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-700 via-blue-600 to-green-700 bg-clip-text text-transparent">
            Our Gallery
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Capturing moments of hope, transformation, and community impact.
            Witness the stories of change through our photographic journey.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                    : "bg-white/80 text-gray-700 hover:bg-white border border-gray-200 hover:shadow-md"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredData.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                No Images Found
              </h3>
              <p className="text-gray-500">
                Check back later for updates to this category.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredData.map((event, eventIndex) => (
                <div
                  key={event.id}
                  className="fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000"
                >
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {event.title}
                    </h2>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {event.images.map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                        onClick={() =>
                          openLightbox(image, event.title, event.description)
                        }
                      >
                        <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                          <img
                            src={image}
                            alt={`${event.title} - Image ${imageIndex + 1}`}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 text-white">
                              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM12 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            <div className="absolute -bottom-16 left-0 right-0 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <section className="py-20 px-6 fade-in-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            Gallery Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {galleryData.length}
              </div>
              <div className="text-gray-600">Total Events</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {galleryData.reduce(
                  (total, event) => total + event.images.length,
                  0
                )}
              </div>
              <div className="text-gray-600">Total Photos</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">Live</div>
              <div className="text-gray-600">Updates</div>
            </div>
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

export default Gallery;
