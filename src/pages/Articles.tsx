import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFilePdf,
  FaNewspaper,
  FaTag,
  FaCalendar,
  FaSearch,
  FaTimes,
  FaArrowRight,
} from 'react-icons/fa';
import SEO from '../components/common/SEO';
import { laravelApi, type Publication } from '../services/laravel';

type Article = Publication;

/*
|--------------------------------------------------------------------------
| FIXED CATEGORY ORDER
|--------------------------------------------------------------------------
*/
const ARTICLE_CATEGORY_ORDER = [
  'Climate Smart Agriculture',
  'Knowledge and Training',
  'Agribusiness and Enterprise Development',
  'Sustainable Agriculture and Development',
  'Agritourism',
  'Youth In Agriculture',
  'Success Stories',
];

const Articles = () => {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'article' | 'pdf'>('all');
  const [selectedSection, setSelectedSection] = useState<'all' | 'article' | 'insight'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
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

  /*
  |--------------------------------------------------------------------------
  | FILTER ARTICLES
  |--------------------------------------------------------------------------
  */
  const filtered = useMemo(() => {
    return allArticles
      .filter((a) => selectedSection === 'all' || (a.section ?? 'article') === selectedSection)
      .filter((a) => selectedCategory === 'all' || a.category === selectedCategory)
      .filter((a) => selectedType === 'all' || (a.type ?? 'article') === selectedType)
      .filter((a) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();

        return (
          a.title.toLowerCase().includes(q) ||
          (a.description ?? '').toLowerCase().includes(q) ||
          (a.written_by ?? '').toLowerCase().includes(q) ||
          (a.category ?? '').toLowerCase().includes(q)
        );
      });
  }, [allArticles, selectedSection, selectedCategory, selectedType, searchQuery]);

  const articlesOnly = useMemo(() => {
    return filtered.filter((a) => (a.section ?? 'article') === 'article');
  }, [filtered]);

  const insightsOnly = useMemo(() => {
    return filtered.filter((a) => (a.section ?? 'article') === 'insight');
  }, [filtered]);

  /*
  |--------------------------------------------------------------------------
  | CATEGORY ORDER FIX
  |--------------------------------------------------------------------------
  */
  const categories = useMemo(() => {
    const available = new Set(
      allArticles.map((a) => a.category).filter((c): c is string => Boolean(c))
    );

    const ordered = ARTICLE_CATEGORY_ORDER.filter((c) => available.has(c));
    return ['all', ...ordered];
  }, [allArticles]);

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */
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

  const getCardActionLabel = (p: Article) => {
    const free = isFree(p);
    const pdf = (p.type ?? 'article') === 'pdf';
    const section = p.section ?? 'article';

    if (pdf && free) return 'View PDF';
    if (pdf && !free) return 'View Details';
    if (section === 'insight' && free) return 'Read Insight';
    if (section === 'insight' && !free) return 'View Details';
    if (!pdf && free) return 'Read Article';

    return 'View Details';
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedSection('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedType !== 'all' ||
    selectedSection !== 'all' ||
    !!searchQuery.trim();

  /*
  |--------------------------------------------------------------------------
  | LOADING STATE
  |--------------------------------------------------------------------------
  */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-emerald-50/40">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4" />
          <p className="text-gray-500">Loading publications...</p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR STATE
  |--------------------------------------------------------------------------
  */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-emerald-50/40">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center text-3xl">
            ⚠️
          </div>
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

  return (
    <>
      <SEO
        title="Articles & Publications"
        description="Read our latest articles and PDF publications on agriculture, farming techniques, agribusiness, and sustainable practices."
        keywords="agriculture articles, farming tips, agribusiness Kenya, sustainable agriculture, farming knowledge"
      />

      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
        {/* HEADER */}
        <section className="relative overflow-hidden border-b border-emerald-100 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.10),_transparent_45%)]" />
          <div className="container relative mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 mb-4">
                Knowledge Hub
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl leading-tight">
                Articles & Insights
              </h1>

              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Expert knowledge, practical tips, and publications to help you succeed in
                agriculture and agribusiness.
              </p>

              <div className="mt-8 max-w-2xl mx-auto relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search articles, publications, authors, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-emerald-100 bg-white pl-11 pr-4 py-4 text-sm shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
                <div className="rounded-full bg-white border border-gray-200 px-4 py-2 text-gray-600 shadow-sm">
                  <span className="font-semibold text-gray-900">{allArticles.length}</span> total publications
                </div>
                <div className="rounded-full bg-white border border-gray-200 px-4 py-2 text-gray-600 shadow-sm">
                  <span className="font-semibold text-gray-900">{insightsOnly.length}</span> insights
                </div>
                <div className="rounded-full bg-white border border-gray-200 px-4 py-2 text-gray-600 shadow-sm">
                  <span className="font-semibold text-gray-900">{articlesOnly.length}</span> articles
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="sticky top-0 z-20 border-b border-emerald-100 bg-white/90 backdrop-blur">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-3 shadow-sm">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {(['all', 'article', 'insight'] as const).map((section) => (
                      <button
                        key={section}
                        onClick={() => setSelectedSection(section)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedSection === section
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                        }`}
                      >
                        {section === 'all'
                          ? 'All'
                          : section === 'article'
                          ? 'Articles'
                          : 'Insights'}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {(['all', 'article', 'pdf'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedType === type
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                        }`}
                      >
                        {type === 'pdf' && <FaFilePdf className="text-xs" />}
                        {type === 'article' && <FaNewspaper className="text-xs" />}
                        {type === 'all' ? 'All Types' : type === 'pdf' ? 'PDFs' : 'Articles'}
                      </button>
                    ))}
                  </div>

                  {categories.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                              ? 'bg-emerald-600 text-white shadow'
                              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                          }`}
                        >
                          {category !== 'all' && <FaTag className="text-[10px]" />}
                          {category === 'all' ? 'All Categories' : category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 xl:flex-col xl:items-end">
                  <span className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">{filtered.length}</span>{' '}
                    {filtered.length === 1 ? 'result' : 'results'}
                  </span>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition"
                    >
                      <FaTimes className="text-xs" />
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS GRID */}
        {filtered.length > 0 ? (
          <section className="px-4 py-12">
            <div className="container mx-auto max-w-7xl">
              {insightsOnly.length > 0 && (
                <div className="mb-14">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Insights</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Featured stories and deeper perspectives from the knowledge hub.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    {insightsOnly.map((article) => {
                      const isPdf = (article.type ?? 'article') === 'pdf';

                      return (
                        <Link
                          key={article.id}
                          to={`/articles/${article.slug || article.id}`}
                          className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
                        >
                          <div className="relative">
                            {article.cover_image ? (
                              <div className="h-64 overflow-hidden md:h-72">
                                <img
                                  src={article.cover_image}
                                  alt={article.title}
                                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                              </div>
                            ) : (
                              <div className="h-64 md:h-72 bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                                <FaNewspaper className="text-5xl text-emerald-300" />
                              </div>
                            )}

                            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                                Insight
                              </span>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                                  isFree(article)
                                    ? 'bg-emerald-50/95 text-emerald-700'
                                    : 'bg-amber-50/95 text-amber-700'
                                }`}
                              >
                                {isFree(article) ? 'Free' : 'Premium'}
                              </span>

                              {isPdf && (
                                <span className="rounded-full bg-red-50/95 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm">
                                  PDF
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-6">
                            {article.category && (
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                                {article.category}
                              </p>
                            )}

                            <h3 className="mb-3 text-xl font-bold text-gray-900 transition group-hover:text-emerald-600">
                              {article.title}
                            </h3>

                            {article.description && (
                              <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
                                {article.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between gap-3 pt-2">
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <FaCalendar className="text-[10px]" />
                                <span>{formatDate(article)}</span>
                              </div>

                              <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                                {getCardActionLabel(article)}
                                <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {articlesOnly.length > 0 && (
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Practical reads, updates, and publication resources.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {articlesOnly.map((article) => {
                      const isPdf = (article.type ?? 'article') === 'pdf';
                      const free = isFree(article);

                      return (
                        <Link
                          key={article.id}
                          to={`/articles/${article.slug || article.id}`}
                          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                          {article.cover_image ? (
                            <div className="relative h-52 overflow-hidden">
                              <img
                                src={article.cover_image}
                                alt={article.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />

                              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                                <span
                                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
                                    free
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-amber-50 text-amber-700'
                                  }`}
                                >
                                  {free ? 'Free' : 'Premium'}
                                </span>

                                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-sm">
                                  {isPdf ? 'PDF' : 'Article'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="relative h-52 bg-gradient-to-br from-emerald-100 via-emerald-50 to-white flex items-center justify-center">
                              <FaNewspaper className="text-4xl text-emerald-300" />

                              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                                <span
                                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
                                    free
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-amber-50 text-amber-700'
                                  }`}
                                >
                                  {free ? 'Free' : 'Premium'}
                                </span>

                                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-sm">
                                  {isPdf ? 'PDF' : 'Article'}
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-1 flex-col p-5">
                            {article.category && (
                              <div className="mb-3">
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                                  <FaTag className="text-[9px]" />
                                  {article.category}
                                </span>
                              </div>
                            )}

                            <h3 className="mb-2 text-lg font-bold text-gray-900 transition group-hover:text-emerald-600 line-clamp-2">
                              {article.title}
                            </h3>

                            {article.description && (
                              <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-500">
                                {article.description}
                              </p>
                            )}

                            <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <FaCalendar className="text-[10px]" />
                                <span>{formatDate(article)}</span>
                              </div>

                              <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                                {getCardActionLabel(article)}
                                <FaArrowRight className="text-[11px] transition group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="px-4 py-24">
            <div className="container mx-auto max-w-md text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-4xl">
                🔍
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>

              <p className="text-sm leading-6 text-gray-500 mb-6">
                {searchQuery
                  ? `No publications matching "${searchQuery}".`
                  : selectedCategory !== 'all'
                  ? `No publications in the "${selectedCategory}" category.`
                  : 'No publications available yet. Check back soon.'}
              </p>

              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                <FaTimes className="text-xs" />
                Clear all filters
              </button>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Articles;
