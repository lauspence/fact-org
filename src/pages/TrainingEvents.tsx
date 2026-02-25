import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaVideo, FaUsers, FaSearch } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import { laravelApi } from '../services/laravel';

type WhenFilter = 'upcoming' | 'past_recent' | 'past_archived';
type DeliveryMode = 'in_person' | 'online' | 'hybrid';
type DeliveryFilter = DeliveryMode | '';

type TrainingCategory =
  | 'Livestock Production'
  | 'Horticultural Crops'
  | 'Greenhouse Systems'
  | 'Agribusiness Development';

type TrainingCourse = {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;

  category: TrainingCategory;

  duration?: string | null;
  price?: number | null;

  image?: string | null;

  curriculum?: string[] | null;
  target_audience?: string | null;

  available?: boolean;
  max_participants?: number | null;

  start_date?: string | null;
  delivery_mode?: DeliveryMode | null;
  meeting_link?: string | null;

  status?: 'draft' | 'published';

  created_at?: string;
  updated_at?: string;
};

const isWhenFilter = (v: string): v is WhenFilter =>
  v === 'upcoming' || v === 'past_recent' || v === 'past_archived';

const isDeliveryMode = (v: string): v is DeliveryMode =>
  v === 'in_person' || v === 'online' || v === 'hybrid';

const isTrainingCategory = (v: string): v is TrainingCategory =>
  v === 'Livestock Production' ||
  v === 'Horticultural Crops' ||
  v === 'Greenhouse Systems' ||
  v === 'Agribusiness Development';

const TrainingEvents = () => {
  const categories: TrainingCategory[] = useMemo(
    () => [
      'Livestock Production',
      'Horticultural Crops',
      'Greenhouse Systems',
      'Agribusiness Development',
    ],
    []
  );

  const [when, setWhen] = useState<WhenFilter>('upcoming');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryFilter>('');
  const [category, setCategory] = useState<TrainingCategory | ''>('');
  const [q, setQ] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<TrainingCourse[]>([]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await laravelApi.getTrainingCourses({
        when,
        ...(deliveryMode ? { delivery_mode: deliveryMode } : {}),
        ...(category ? { category } : {}),
        ...(q.trim() ? { q: q.trim() } : {}),
        per_page: 50,
      });

      setCourses(data);
    } catch {
        setCourses([]);
         setError('Failed to load trainings at the moment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [when, deliveryMode, category]);

  const formatDate = (value?: string | null) => {
    if (!value) return 'TBA';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const modeLabel = (m?: DeliveryMode | null) => {
    if (!m) return 'In Person';
    if (m === 'in_person') return 'In Person';
    if (m === 'online') return 'Online';
    return 'Hybrid';
  };

  const modeBadge = (m?: DeliveryMode | null) => {
    const label = modeLabel(m);
    const Icon = m === 'online' ? FaVideo : FaMapMarkerAlt;
    return (
      <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
        <Icon className="text-[0.75rem]" />
        {label}
      </span>
    );
  };

  const priceLabel = (price?: number | null) => {
    if (price == null) return 'Contact for pricing';
    if (Number(price) === 0) return 'Free';
    return `KSh ${Number(price).toLocaleString()}`;
  };

  return (
    <>
      <SEO
        title="Training & Events"
        description="Browse upcoming trainings and events. Filter by category and delivery mode, then book or enroll."
        keywords="agriculture training, workshops, webinars, Kenya"
        image="/images/knowledge---training-1920.webp"
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="border-b border-emerald-100/60 bg-white">
          <div className="container mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Training &amp; Events
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl text-sm sm:text-base">
                  Browse available trainings, workshops, and webinars. Use filters to find what fits, then proceed to booking.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
              >
                Contact for Custom Training
              </Link>
            </div>

            {/* Filters */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">When</label>
                <select
                  value={when}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (isWhenFilter(v)) setWhen(v);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past_recent">Past (Last 3 Months)</option>
                  <option value="past_archived">Archived (Older)</option>
                </select>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Delivery Mode</label>
                <select
                  value={deliveryMode}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === '') setDeliveryMode('');
                    else if (isDeliveryMode(v)) setDeliveryMode(v);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">All</option>
                  <option value="in_person">In Person</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === '') setCategory('');
                    else if (isTrainingCategory(v)) setCategory(v);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">All</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Search</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1">
                    <FaSearch className="text-gray-400" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Title keywords…"
                      className="w-full text-sm outline-none"
                    />
                  </div>
                  <button
                    onClick={fetchCourses}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            {loading && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-600">
                Loading trainings…
              </div>
            )}

            {!loading && error && (
              <div className="bg-white border border-red-200 rounded-2xl p-8">
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                  onClick={fetchCourses}
                  className="mt-4 inline-flex items-center justify-center bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && courses.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                <p className="text-gray-800 font-semibold">No trainings found.</p>
                <p className="text-gray-600 mt-2 text-sm">
                  Try changing filters, or check back later as new trainings are published.
                </p>
              </div>
            )}

            {!loading && !error && courses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-emerald-600 to-emerald-800" />
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                          {t.title}
                        </h3>
                        {modeBadge(t.delivery_mode ?? null)}
                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {t.description
                          ? t.description.slice(0, 150) + (t.description.length > 150 ? '…' : '')
                          : 'No description provided.'}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700">
                          <FaCalendarAlt />
                          {formatDate(t.start_date)}
                        </span>

                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700">
                          <FaUsers />
                          {t.max_participants ? `Max ${t.max_participants}` : 'Open'}
                        </span>

                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700">
                          {t.category}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div className="text-sm">
                          <div className="text-gray-500">Price</div>
                          <div className="font-bold text-gray-900">{priceLabel(t.price ?? null)}</div>
                        </div>

                        <div className="flex gap-2">
                          {t.delivery_mode === 'online' && t.meeting_link ? (
                            <a
                              href={t.meeting_link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition text-sm"
                            >
                              Join Link
                            </a>
                          ) : null}

                          <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition text-sm"
                          >
                            Book / Enroll
                          </Link>
                        </div>
                      </div>

                      <div className="mt-4 text-xs text-gray-500">
                        Tip: If you need a tailored version of this training, use “Contact for Custom Training” above.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default TrainingEvents;