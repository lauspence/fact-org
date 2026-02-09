import { useState, useEffect } from 'react';
import { FaImage, FaVideo } from 'react-icons/fa';
import { galleryApi } from '../services/strapi';

interface Photo {
  id: number;
  title: string;
  description?: string;
  image: string;
  category: string;
  eventDate?: string;
  featured?: boolean;
}

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Training Events',
    'Farm Harvests',
    'Workshops',
    'Field Visits',
    'Success Stories'
  ];

  // Placeholder videos - can be moved to Strapi later if needed
  const videos = [
    { id: 1, title: "Climate-Smart Agriculture", link: "#" },
    { id: 2, title: "Value Addition Training", link: "#" },
    { id: 3, title: "Smart Irrigation Demo", link: "#" },
  ];

  useEffect(() => {
    if (activeTab === 'photos') {
      fetchPhotos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, selectedCategory]);

const fetchPhotos = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await galleryApi.getAll(selectedCategory === 'All' ? null : selectedCategory);
    setPhotos((data as unknown as Photo[]) || []);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    setError('Failed to load gallery. Please check if Strapi is running.');
  } finally {
    setLoading(false);
  }
};

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
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'photos'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
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
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <FaVideo className="mr-2" />
              Videos
            </button>
          </div>

          {/* Category Filter - Only show for photos tab */}
          {activeTab === 'photos' && (
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all text-sm ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Photos Grid */}
          {activeTab === 'photos' && (
            <>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading photos...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <div className="text-red-500 text-5xl mb-4">⚠️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Gallery</h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button 
                    onClick={fetchPhotos}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              ) : photos.length === 0 ? (
                <div className="text-center py-20">
                  <FaImage className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Photos Yet</h3>
                  <p className="text-gray-600 text-lg">
                    {selectedCategory === 'All' 
                      ? 'Photos will be added soon. Check back later!'
                      : `No photos found in "${selectedCategory}" category.`}
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <p className="text-gray-600">
                      Showing <span className="font-bold text-emerald-600">{photos.length}</span> {photos.length === 1 ? 'photo' : 'photos'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo) => (
                      <div 
                        key={photo.id} 
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                      >
                        <div className="relative aspect-video overflow-hidden bg-gray-200">
                          <img 
                            src={photo.image}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                            }}
                          />
                          {/* Category Badge */}
                          <div className="absolute top-3 right-3">
                            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                              {photo.category}
                            </span>
                          </div>
                          {/* Featured Badge */}
                          {photo.featured && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                ⭐ Featured
                              </span>
                            </div>
                          )}
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                            {photo.title}
                          </h3>
                          {photo.description && (
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {photo.description}
                            </p>
                          )}
                          {photo.eventDate && (
                            <div className="flex items-center text-gray-500 text-xs mt-2">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              {new Date(photo.eventDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Videos Grid */}
          {activeTab === 'videos' && (
            <>
              {videos.length === 0 ? (
                <div className="text-center py-20">
                  <FaVideo className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Videos Yet</h3>
                  <p className="text-gray-600 text-lg">
                    Videos will be added soon. Check back later!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <div 
                      key={video.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all group"
                    >
                      <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center relative overflow-hidden">
                        <FaVideo className="w-16 h-16 text-emerald-600 group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-3">{video.title}</h3>
                        <a 
                          href={video.link} 
                          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                        >
                          <span>Watch Video</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Placeholder message for videos */}
              <div className="mt-12 text-center">
                <p className="text-gray-500 italic">
                  More videos will be added soon. Check back regularly!
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
