import { useState, useEffect } from 'react';
import { FaCalendar, FaUser, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { publicationsApi } from '../services/strapi'; // Fixed import path

interface Article {
  id: number;
  documentId?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  coverImage?: string;
  image?: string;
  author?: string;
  publishedDate?: string;
  category?: string;
  featured?: boolean;
  isFree?: boolean;
  [key: string]: unknown; // Add index signature to match FormattedData
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const categoryFilter = selectedCategory === 'all' ? null : selectedCategory;
      const data = await publicationsApi.getAll(categoryFilter);
      setArticles(data as unknown as Article[]); // Fixed type assertion
      setError(null);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get unique categories - fixed filter
  const categories = ['all', ...new Set(
    articles
      .map(article => article.category)
      .filter((cat): cat is string => Boolean(cat))
  )];

  // Separate featured and regular articles
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchArticles}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Articles"
        description="Read our latest articles on agriculture, farming techniques, agribusiness, and sustainable practices. Expert insights and knowledge sharing for the farming community."
        keywords="agriculture articles, farming tips, agribusiness Kenya, sustainable agriculture, farming knowledge"
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-white border-b-2 border-gray-200 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Articles & Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert knowledge, practical tips, and insights to help you succeed in agriculture and agribusiness.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        {categories.length > 1 && (
          <section className="py-8 px-4 bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-600 hover:text-emerald-600'
                    }`}
                  >
                    {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/articles/${article.slug || article.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-emerald-200"
                  >
                    {(article.coverImage || article.image) && (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={article.coverImage || article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      {article.category && (
                        <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
                          {article.category}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-emerald-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt || article.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        {article.author && (
                          <div className="flex items-center gap-1">
                            <FaUser className="text-xs" />
                            <span>{article.author}</span>
                          </div>
                        )}
                        {article.publishedDate && (
                          <div className="flex items-center gap-1">
                            <FaCalendar className="text-xs" />
                            <span>{formatDate(article.publishedDate)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 font-semibold mt-4 group-hover:gap-3 transition-all">
                        Read Article <FaArrowRight className="text-sm" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles Grid */}
        {regularArticles.length > 0 ? (
          <section className="py-12 px-4 bg-white">
            <div className="container mx-auto max-w-7xl">
              {featuredArticles.length > 0 && (
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Latest Articles</h2>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/articles/${article.slug || article.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-emerald-200"
                  >
                    {(article.coverImage || article.image) && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.coverImage || article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {article.category && (
                        <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
                          {article.category}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                        {article.excerpt || article.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 gap-3 mb-3">
                        {article.author && (
                          <div className="flex items-center gap-1">
                            <FaUser className="text-xs" />
                            <span>{article.author}</span>
                          </div>
                        )}
                        {article.publishedDate && (
                          <div className="flex items-center gap-1">
                            <FaCalendar className="text-xs" />
                            <span>{formatDate(article.publishedDate)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Read More <FaArrowRight className="text-xs" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20 px-4 bg-white">
            <div className="container mx-auto max-w-2xl text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Articles Yet</h2>
              <p className="text-gray-600">
                {selectedCategory === 'all' 
                  ? 'Check back soon for our latest articles and insights.'
                  : `No articles found in the "${selectedCategory}" category.`}
              </p>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4 bg-emerald-600 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Want to Learn More?
            </h2>
            <p className="text-lg text-emerald-100 mb-8">
              Explore our training programs and services to take your farming to the next level
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/knowledge-training"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                View Training Programs <FaArrowRight />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-colors border border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Articles;
