import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaNewspaper, FaTag, FaCalendar, FaSearch } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import { laravelApi, type Publication } from '../services/laravel';

type Article = Publication;

const Articles = () => {
  const [allArticles, setAllArticles] = useState<Article[]>([]); // ✅ full list for category extraction
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'article' | 'pdf'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Fetch once on mount — client-side filter for categories/type/search
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);

      // ✅ Fetch ALL publications (articles + PDFs)
      const data = await laravelApi.getPublications({ per_page: 50 });
      const all = data ?? [];

      setAllArticles(all);
      setError(null);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Client-side filtering: category + type + search
  const filtered = useMemo(() => {
    return allArticles
      .filter((a) => selectedCategory === 'all' || a.category === selectedCategory)
      .filter((a) => selectedType === 'all' || (a.type ?? 'article') === selectedType)
      .filter((a) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          (a.description ?? '').toLowerCase().includes(q)
        );
      });
  }, [allArticles, selectedCategory, selectedType, searchQuery]);

  // ✅ Categories persist regardless of active filter
  const categories = useMemo(() => {
    const unique = new Set(
      allArticles.map((a) => a.category).filter((c): c is string => Boolean(c))
    );
    return ['all', ...Array.from(unique)];
  }, [allArticles]);

  const formatDate = (p: Article) => {
    const dateString = p.published_at ?? p.published_date ?? p.created_at ?? undefined;
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isFree = (p: Article) =>
    p.is_free === true || (p.is_free as unknown as number) === 1;

  // ─── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4" />
          <p className="text-gray-500">Loading publications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={fetchArticles}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ─── Main ─────────────────────────────────────────────────────────────────

  return (
    <>
      <SEO
        title="Articles & Publications"
        description="Read our latest articles and PDF publications on agriculture, farming techniques, agribusiness, and sustainable practices."
        keywords="agriculture articles, farming tips, agribusiness Kenya, sustainable agriculture, farming knowledge"
      />

      <div className="bg-white min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-white border-b border-gray-100 py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-emerald-100">
              Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
              Articles & Insights
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Expert knowledge, practical tips, and publications to help you succeed in agriculture and agribusiness.
            </p>

            {/* ✅ Search bar */}
            <div className="mt-8 max-w-md mx-auto relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search articles and publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>
        </section>

        {/* ── Filters ── */}
        <section className="py-5 px-4 bg-gray-50 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto max-w-7xl flex flex-wrap items-center gap-4 justify-between">

            {/* Type toggle */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
              {(['all', 'article', 'pdf'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  {type === 'pdf' && <FaFilePdf className="text-xs" />}
                  {type === 'article' && <FaNewspaper className="text-xs" />}
                  {type === 'all' ? 'All' : type === 'pdf' ? 'PDFs' : 'Articles'}
                </button>
              ))}
            </div>

            {/* Category pills */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-400 hover:text-emerald-600'
                    }`}
                  >
                    {category !== 'all' && <FaTag className="text-[10px]" />}
                    {category === 'all'
                      ? 'All Categories'
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* Result count */}
            <span className="text-xs text-gray-400 ml-auto">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </span>
          </div>
        </section>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <section className="py-12 px-4 bg-white">
            <div className="container mx-auto max-w-7xl">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article) => {
                  const isPdf = (article.type ?? 'article') === 'pdf';
                  const free = isFree(article);

                  return (
                    <Link
                      key={article.id}
                      to={`/articles/${article.slug || article.id}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all border border-gray-100 hover:border-emerald-200 flex flex-col"
                    >
                      {/* Cover image or placeholder */}
                      {article.cover_image ? (
                        <div className="h-48 overflow-hidden bg-gray-100">
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className={`h-48 flex items-center justify-center ${
                          isPdf
                            ? 'bg-gradient-to-br from-red-50 to-orange-50'
                            : 'bg-gradient-to-br from-emerald-50 to-teal-100'
                        }`}>
                          {isPdf
                            ? <FaFilePdf className="text-5xl text-red-300" />
                            : <FaNewspaper className="text-5xl text-emerald-300" />
                          }
                        </div>
                      )}

                      {/* Card body */}
                      <div className="p-5 flex flex-col flex-1">

                        {/* Top badges row */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {/* Type badge */}
                          {isPdf ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full">
                              <FaFilePdf className="text-[9px]" /> PDF
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                              <FaNewspaper className="text-[9px]" /> Article
                            </span>
                          )}

                          {/* Access badge */}
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                            free
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            {free ? '✓ Free' : '★ Premium'}
                          </span>

                          {/* Category */}
                          {article.category && (
                            <span className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold ml-auto">
                              {article.category}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>

                        {/* Description */}
                        {article.description && (
                          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-3">
                            {article.description}
                          </p>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <FaCalendar className="text-[9px]" />
                            {formatDate(article)}
                          </span>
                          <span className="text-emerald-600 font-semibold text-xs group-hover:underline">
                            {isPdf ? 'View PDF →' : 'Read More →'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-24 px-4 bg-white">
            <div className="container mx-auto max-w-md text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
              <p className="text-gray-500 text-sm mb-6">
                {searchQuery
                  ? `No publications matching "${searchQuery}".`
                  : selectedCategory !== 'all'
                  ? `No publications in the "${selectedCategory}" category.`
                  : 'No publications available yet. Check back soon.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="text-emerald-600 font-semibold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Learn More?</h2>
            <p className="text-emerald-100 text-lg mb-8">
              Explore our training programs and services to take your farming to the next level
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/knowledge-training"
                className="inline-flex items-center justify-center bg-white text-emerald-700 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                View Training Programs →
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-colors border-2 border-white/30"
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
