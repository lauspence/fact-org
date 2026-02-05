import { useState } from 'react';
import { FaImage, FaVideo } from 'react-icons/fa';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  // Placeholder data - replace with actual images
  const photos = [
    { id: 1, title: "Training Session", category: "Training" },
    { id: 2, title: "Farm Visit", category: "Field Work" },
    { id: 3, title: "Workshop", category: "Training" },
    { id: 4, title: "Youth Program", category: "Events" },
    { id: 5, title: "Technology Demo", category: "Innovation" },
    { id: 6, title: "Community Gathering", category: "Events" },
  ];

  const videos = [
    { id: 1, title: "Climate-Smart Agriculture", link: "#" },
    { id: 2, title: "Value Addition Training", link: "#" },
    { id: 3, title: "Smart Irrigation Demo", link: "#" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl text-emerald-50">
            Explore our work in action - training sessions, farm visits, and success stories.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-12 space-x-4">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'photos'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaImage className="mr-2" />
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'videos'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaVideo className="mr-2" />
              Videos
            </button>
          </div>

          {/* Photos Grid */}
          {activeTab === 'photos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <FaImage className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{photo.title}</h3>
                    <p className="text-sm text-gray-600">{photo.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos Grid */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <FaVideo className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{video.title}</h3>
                    <a href={video.link} className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                      Watch Video →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Placeholder message */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 italic">
              More photos and videos will be added soon. Check back regularly!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
