import React, { useState, useEffect } from "react";
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "healthcare",
    description: "",
    date: new Date().toISOString().split("T")[0],
    images: [],
  });

  const categories = [
    { value: "healthcare", label: "Healthcare", icon: "🏥" },
    { value: "education", label: "Education", icon: "📚" },
    { value: "environment", label: "Environment", icon: "🌱" },
    { value: "empowerment", label: "Empowerment", icon: "💪" },
    { value: "community", label: "Community", icon: "🤝" },
    { value: "emergency", label: "Emergency Relief", icon: "🚨" },
  ];

  // Firebase connection - Uncomment for actual Firebase usage
  useEffect(() => {
    const fetchGalleryItems = () => {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setGalleryItems(items);
      });
      return unsubscribe;
    };
    const unsubscribe = fetchGalleryItems();
    return () => unsubscribe();

    // Mock data loading
  }, []);

  // Handle file selection and preview
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // Upload images to Firebase Storage
  const uploadImages = async (files) => {
    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);

      try {
        const snapshot = await uploadBytes(imageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(downloadUrl);

        // Mock upload - replace with actual Firebase upload
        uploadedUrls.push(
          `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`
        );

        setUploadProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return uploadedUrls;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.date
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      let imageUrls = formData.images;

      // Upload new images if any
      if (selectedFiles.length > 0) {
        const newImageUrls = await uploadImages(selectedFiles);
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const galleryData = {
        ...formData,
        images: imageUrls,
        updatedAt: new Date().toISOString(),
      };

      if (editingItem) {
        // Update existing item
        await updateDoc(doc(db, "gallery", editingItem.id), galleryData);
      } else {
        // Add new item
        galleryData.createdAt = new Date().toISOString();
        await addDoc(collection(db, "gallery"), galleryData);

        // Mock add
        // const newItem = { id: Date.now(), ...galleryData };
        // setGalleryItems((prev) => [newItem, ...prev]);
      }

      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving gallery item:", error);
      alert("Error saving gallery item. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // Delete gallery item
  const handleDelete = async (item) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) {
      return;
    }

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "gallery", item.id));

      // Delete images from Storage
      for (const imageUrl of item.images) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      // Mock delete
      // setGalleryItems(prev => prev.filter(galleryItem => galleryItem.id !== item.id));

      alert("Gallery item deleted successfully!");
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      alert("Error deleting gallery item. Please try again.");
    }
  };

  // Remove individual image
  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Remove preview image
  const removePreviewImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      category: "healthcare",
      description: "",
      date: new Date().toISOString().split("T")[0],
      images: [],
    });
    setSelectedFiles([]);
    setPreviewUrls([]);
    setEditingItem(null);
  };

  // Open edit modal
  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      date: item.date,
      images: item.images,
    });
    setIsModalOpen(true);
  };

  // Open add modal
  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Gallery Management
              </h1>
              <p className="text-gray-600">
                Manage your welfare society's photo gallery
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">+</span>
              Add New Event
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📸</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Events</p>
                <p className="text-2xl font-bold text-gray-800">
                  {galleryItems.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🖼️</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Photos</p>
                <p className="text-2xl font-bold text-gray-800">
                  {galleryItems.reduce(
                    (total, item) => total + item.images.length,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📂</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Categories</p>
                <p className="text-2xl font-bold text-gray-800">
                  {categories.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="text-2xl font-bold text-green-600">Live</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Items List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Gallery Events
            </h2>
          </div>

          {galleryItems.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No gallery items yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start by adding your first event with photos
              </p>
              <button
                onClick={openAddModal}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add First Event
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 mr-3">
                          {item.title}
                        </h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {
                            categories.find(
                              (cat) => cat.value === item.category
                            )?.icon
                          }{" "}
                          {
                            categories.find(
                              (cat) => cat.value === item.category
                            )?.label
                          }
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3">{item.description}</p>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className="mr-4">
                          📅 {new Date(item.date).toLocaleDateString()}
                        </span>
                        <span>📸 {item.images.length} photos</span>
                      </div>

                      {/* Image Thumbnails */}
                      <div className="flex gap-2 mb-4">
                        {item.images.slice(0, 4).map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`${item.title} ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            {index === 3 && item.images.length > 4 && (
                              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                                +{item.images.length - 4}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingItem ? "Edit Gallery Event" : "Add New Gallery Event"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="text-gray-600">×</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter event title"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Describe the event..."
                  />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">📸</span>
                      </div>
                      <p className="text-lg font-medium text-gray-700 mb-1">
                        Choose photos to upload
                      </p>
                      <p className="text-gray-500">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </label>
                  </div>
                </div>

                {/* Existing Images */}
                {formData.images.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Photos
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Current ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview New Images */}
                {previewUrls.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Photos Preview
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePreviewImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="md:col-span-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Uploading... {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading
                    ? "Saving..."
                    : editingItem
                    ? "Update Event"
                    : "Add Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
