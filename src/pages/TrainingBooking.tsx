import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';

type TrainingCourse = {
  id: number;
  title: string;
  description?: string | null;
  start_date?: string | null;
  max_participants?: number | null;
  booked_count?: number | null;
};

const TrainingBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [training, setTraining] = useState<TrainingCourse | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [participants, setParticipants] = useState(1);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Training Details
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const loadTraining = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/training-courses/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch training.');
        }

        const data: TrainingCourse = await response.json();
        setTraining(data);

      } catch (err: unknown) {

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load training.');
        }

      } finally {
        setLoading(false);
      }
    };

    loadTraining();
  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | Submit Booking
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/training-courses/${id}/book`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            participants,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Booking failed');
      }

      setSuccess(true);

      setTimeout(() => {
        navigate('/training-events');
      }, 2500);

    } catch (err: unknown) {

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Booking failed.');
      }

    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading training…
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Not Found
  |--------------------------------------------------------------------------
  */
  if (!training) {
    return (
      <div className="p-10 text-center text-gray-600">
        Training not found.
      </div>
    );
  }

  const booked = training.booked_count ?? 0;
  const max = training.max_participants ?? null;
  const remaining = max ? max - booked : null;

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */
  return (
    <>
      <SEO
        title={`Book ${training.title}`}
        description={`Reserve your slot for the ${training.title} training event.`}
      />

      <div className="max-w-xl mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold mb-4">
          {training.title}
        </h1>

        {training.start_date && (
          <p className="text-gray-600 mb-4">
            Date: {new Date(training.start_date).toLocaleDateString()}
          </p>
        )}

        {max && (
          <p className="text-gray-700 mb-6">
            {booked} / {max} booked • {remaining} slots left
          </p>
        )}

        {success ? (

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-green-700">
            Booking successful! Redirecting…
          </div>

        ) : (

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              required
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              required
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              required
              type="text"
              placeholder="Phone"
              className="w-full border rounded-lg px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="number"
              min="1"
              max="50"
              className="w-full border rounded-lg px-3 py-2"
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
            />

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700"
            >
              Confirm Booking
            </button>

          </form>

        )}
      </div>
    </>
  );
};

export default TrainingBooking;