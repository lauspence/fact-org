import { useEffect, useMemo, useState } from 'react';
import { FaImage, FaSearch, FaTimes, FaVideo, FaPlay, FaChevronDown } from 'react-icons/fa';
import { laravelApi } from '../services/laravel';

type PhotoCategory = 'Training Events' | 'Workshops' | 'Field Visits' | 'Farm Harvests';

interface Photo {
  id: number;
  title: string;
  description?: string | null;
  image: string; // normalized by laravelApi to full URL if needed
  category: PhotoCategory;
  event_date?: string | null;
  featured?: boolean;
}

interface Video {
  id: number;
  title: string;
  link: string;
  category: string;
  description?: string;
  featured?: boolean;
  thumbnail?: string;
}

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  // Photos state
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<'All' | PhotoCategory>('All');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Lightbox
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const photoCategories: Array<'All' | PhotoCategory> = [
    'All',
    'Training Events',
    'Farm Harvests',
    'Workshops',
    'Field Visits',
  ];

  const videoCategories = [
    'All',
    'Climate-Smart Agriculture',
    'Training & Workshops',
    'Smart Technology',
    'Irrigation & Water',
    'Value Addition'
  ];

  // Placeholder videos (categorized) - can be moved to API later
  const videos: Video[] = [
    {
      id: 1,
      title: 'Climate-Smart Agriculture',
      link: '#',
      category: 'Climate-Smart Agriculture',
      description: 'Practical approaches to climate resilience on the farm.',
      thumbnail:
        'https://images.unsplash.com/photo-1592982537447-6b17a4b1a8a7?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 2,
      title: 'Value Addition Training',
      link: '#',
      category: 'Value Addition',
      description: 'Processing and packaging to increase farm income.',
      thumbnail:
        'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 3,
      title: 'Smart Irrigation Demo',
      link: '#',
      category: 'Irrigation & Water',
      description: 'Efficient irrigation methods and basic system demos.',
      thumbnail:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 4,
      title: 'Farm Data & Sensors Overview',
      link: '#',
      category: 'Smart Technology',
      description: 'Intro to sensors, data loggers, and farm monitoring.',
      thumbnail:
        'https://images.unsplash.com/photo-1581091870622-3d4b3a6f1b58?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 5,
      title: 'Practical Farmer Training Session',
      link: '#',
      category: 'Training & Workshops',
      description: 'Highlights from hands-on training with farmers.',
      thumbnail:
        'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=60'
    }
  ];

  // Reset filters when switching tabs
  useEffect(() => {
    setQuery('');
    if (activeTab === 'photos') setSelectedCategory('All');
    if (activeTab === 'videos') setSelectedVideoCategory('All');
    setLightboxPhoto(null);
    setShowCategoryDropdown(false);
  }, [activeTab]);

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

      const categoryParam =
        selectedCategory === 'All' ? undefined : selectedCategory;

      const data = await laravelApi.getGalleryImages({
        category: categoryParam,
      });

      setPhotos((data as unknown as Photo[]) || []);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery. Please check if the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter((p) => {
      const hay = `${p.title} ${p.description ?? ''} ${p.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [photos, query]);

  const filteredVideos = useMemo(() => {
    const byCategory =
      selectedVideoCategory === 'All'
        ? videos
        : videos.filter((v) => v.category === selectedVideoCategory);

    const q = query.trim().toLowerCase();
    if (!q) return byCategory;

    return byCategory.filter((v) => {
      const hay = `${v.title} ${v.description ?? ''} ${v.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [videos, selectedVideoCategory, query]);

  const activeCategories = activeTab === 'photos' ? photoCategories : videoCategories;
  const activeSelectedCategory = activeTab === 'photos' ? selectedCategory : selectedVideoCategory;

  const setActiveSelectedCategory = (cat: string) => {
    if (activeTab === 'photos') setSelectedCategory(cat as 'All' | PhotoCategory);
    else setSelectedVideoCategory(cat);
    setShowCategoryDropdown(false);
  };

  const formatEventDate = (value?: string | null) => {
    if (!value) return null;
    try {
      return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header & Tabs */}
      <section className="bg-white border-b border-gray-200 pt-8 md:pt-12 pb-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Gallery</h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl">
            Explore our work in action — training sessions, farm visits, demonstrations, and success stories.
          </p>

          <div className="flex gap-3 md:gap-4">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-md font-medium transition-colors text-sm md:text-base ${
                activeTab === 'photos'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaImage className="text-sm md:text-base" />
              <span>Photos</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-md font-medium transition-colors text-sm md:text-base ${
                activeTab === 'videos'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaVideo className="text-sm md:text-base" />
              <span>Videos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-md border-b border-gray-200 py-3 md:py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row md:gap-4 md:justify-between md:items-center">

            {/* Categories */}
            <div className="w-full md:w-auto">
              {/* Mobile Dropdown */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-emerald-700 font-semibold">{activeSelectedCategory}</span>
                  </span>
                  <FaChevronDown className={`text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showCategoryDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowCategoryDropdown(false)}
                    />

                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                      {activeCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveSelectedCategory(category)}
                          className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0 ${
                            activeSelectedCategory === category
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Desktop Pills */}
              <div className="hidden md:flex gap-2 flex-wrap">
                {activeCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveSelectedCategory(category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      activeSelectedCategory === category
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72 flex-shrink-0">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-sm" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="container mx-auto max-w-6xl px-4 mt-6 md:mt-8">
        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <>
            {loading ? (
              <div className="text-center py-16 md:py-20 text-gray-500">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mb-3"></div>
                <p>Loading photos...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 md:py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchPhotos}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Try Again
                </button>
              </div>
            ) : filteredPhotos.length === 0 ? (
              <div className="text-center py-16 md:py-20">
                <div className="text-gray-400 text-5xl mb-4">📷</div>
                <p className="text-gray-500 text-lg">No photos found.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setLightboxPhoto(photo)}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                          {photo.category}
                        </span>
                        {photo.featured && (
                          <span className="text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{photo.title}</h3>
                      {photo.description && (
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{photo.description}</p>
                      )}
                      {photo.event_date && (
                        <p className="text-xs text-gray-400 mt-3">{formatEventDate(photo.event_date)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <>
            {filteredVideos.length === 0 ? (
              <div className="text-center py-16 md:py-20">
                <div className="text-gray-400 text-5xl mb-4">🎥</div>
                <p className="text-gray-500 text-lg">No videos found.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredVideos.map((video) => (
                  <a
                    key={video.id}
                    href={video.link}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow block group"
                  >
                    <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                      <img
                        src={video.thumbnail || 'https://via.placeholder.com/600x400?text=Video'}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                      <div className="absolute flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                        <FaPlay className="text-emerald-600 ml-1 text-sm md:text-base" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                          {video.category}
                        </span>
                        {video.featured && (
                          <span className="text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{video.title}</h3>
                      {video.description && (
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{video.description}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          onClick={() => setLightboxPhoto(null)}
        >
          <div className="flex justify-end p-3 md:p-4">
            <button
              onClick={() => setLightboxPhoto(null)}
              className="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <FaTimes className="text-xl md:text-2xl" />
            </button>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-3 md:p-4">
            <div
              className="max-w-5xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                className="w-full max-h-[60vh] md:max-h-[70vh] object-contain bg-gray-100"
              />
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    {lightboxPhoto.category}
                  </span>
                  {lightboxPhoto.featured && (
                    <span className="text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                  {lightboxPhoto.event_date && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      {formatEventDate(lightboxPhoto.event_date)}
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{lightboxPhoto.title}</h3>
                {lightboxPhoto.description && (
                  <p className="text-sm md:text-base text-gray-600">{lightboxPhoto.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;