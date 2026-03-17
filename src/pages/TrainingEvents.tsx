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

  booked_count?: number | null;

  start_date?: string | null;
  end_date?: string | null;
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

  const formatDate = (start?: string | null, end?: string | null) => {

    if (!start) return 'TBA';

    const s = new Date(start);
    const e = end ? new Date(end) : null;

    if (Number.isNaN(s.getTime())) return start;

    const format = (d: Date) =>
      d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

    if (!e || Number.isNaN(e.getTime())) {
      return format(s);
    }

    return `${format(s)} – ${format(e)}`;
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

        <section className="border-b border-emerald-100/60 bg-white">

          <div className="container mx-auto max-w-6xl px-4 py-10">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

              <div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Training & Events
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

              {/* When */}

              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">

                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">
                  When
                </label>

                <select
                  value={when}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (isWhenFilter(v)) setWhen(v);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past_recent">Past (Last 3 Months)</option>
                  <option value="past_archived">Archived (Older)</option>
                </select>

              </div>

              {/* Delivery */}

              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">

                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">
                  Delivery Mode
                </label>

                <select
                  value={deliveryMode}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === '') setDeliveryMode('');
                    else if (isDeliveryMode(v)) setDeliveryMode(v);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">All</option>
                  <option value="in_person">In Person</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>

              </div>

              {/* Category */}

              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">

                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === '') setCategory('');
                    else if (isTrainingCategory(v)) setCategory(v);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">All</option>

                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}

                </select>

              </div>

              {/* Search */}

              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">

                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">
                  Search
                </label>

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
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
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
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-700 font-semibold">{error}</p>

                <button
                  onClick={fetchCourses}
                  className="mt-4 px-5 py-2 bg-emerald-600 text-white rounded-xl"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && courses.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                <p className="text-gray-800 font-semibold">No trainings found.</p>
              </div>
            )}

            {!loading && !error && courses.length > 0 && (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {courses.map((t) => {

                  const booked = t.booked_count ?? 0;
                  const max = t.max_participants ?? null;
                  const isFull = max !== null && booked >= max;
                  const isAvailable = t.available === true;

                  return (

                    <div key={t.id} className="bg-white border rounded-2xl shadow-sm overflow-hidden">

                      {t.image && (
                        <img src={t.image} alt={t.title} className="w-full h-48 object-cover" />
                      )}

                      <div className="p-6">

                        <div className="flex justify-between">
                          <h3 className="text-lg font-bold">{t.title}</h3>
                          {modeBadge(t.delivery_mode)}
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                          {t.description?.slice(0, 140)}...
                        </p>

                        <div className="mt-4 flex gap-3 flex-wrap text-sm">

                          <span className="flex items-center gap-2 px-3 py-1 bg-gray-50 border rounded-full">
                            <FaCalendarAlt />
                            {formatDate(t.start_date, t.end_date)}
                          </span>

                          <span className="flex items-center gap-2 px-3 py-1 bg-gray-50 border rounded-full">
                            <FaUsers />
                            {max
                              ? `${booked} / ${max} booked`
                              : 'Open'}
                          </span>

                          <span className="px-3 py-1 bg-gray-50 border rounded-full">
                            {t.category}
                          </span>

                        </div>

                        <div className="mt-5 flex justify-between items-center">

                          <div>
                            <div className="text-xs text-gray-500">Price</div>
                            <div className="font-bold">{priceLabel(t.price)}</div>
                          </div>

                          {!isAvailable ? (
                            <button
                              disabled
                              className="px-5 py-2 rounded-xl bg-gray-300 text-gray-600 font-semibold text-sm cursor-not-allowed"
                            >
                              Not Available Yet
                            </button>
                          ) : isFull ? (
                            <button
                              disabled
                              className="px-5 py-2 rounded-xl bg-gray-300 text-gray-600 font-semibold text-sm cursor-not-allowed"
                            >
                              Fully Booked
                            </button>
                          ) : (
                            <Link
                              to={`/training/${t.id}/book`}
                              className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700"
                            >
                              Book / Enroll
                            </Link>
                          )}

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}

          </div>

        </section>

      </div>
    </>
  );
};

export default TrainingEvents;