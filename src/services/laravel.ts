import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // e.g. http://127.0.0.1:8000
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export type HealthResponse = {
  ok: boolean;
  time: string;
};

/*
|--------------------------------------------------------------------------
| Market Products
|--------------------------------------------------------------------------
*/

export type MarketProduct = {
  id: number;
  name: string;
  slug?: string | null;
  description?: string | null;
  price?: number | null;
  category?: string | null;
  unit?: string | null;

  featured?: boolean;
  in_stock?: boolean;
  stock_quantity?: number | null;

  image?: string | null;
  images?: string[] | null;

  status?: 'draft' | 'published';
  orders_count?: number;
  created_at?: string;
  updated_at?: string;
};

/*
|--------------------------------------------------------------------------
| Publications (Articles + PDFs)
|--------------------------------------------------------------------------
*/

export type Publication = {
  id: number;
  title: string;
  slug?: string | null;

  description?: string | null;
  content?: string | null;

  type?: 'article' | 'pdf';

  cover_image?: string | null;
  pdf_path?: string | null;

  files?: string[] | null;

  category?: string | null;
  price?: number | null;
  is_free?: boolean;

  download_count?: number;

  published_date?: string | null;
  published_at?: string | null;

  status?: 'draft' | 'published';

  created_at?: string;
  updated_at?: string;
};

/*
|--------------------------------------------------------------------------
| Gallery Images
|--------------------------------------------------------------------------
*/

export type GalleryImage = {
  id: number;
  title: string;
  description?: string | null;
  image: string;
  category: 'Training Events' | 'Workshops' | 'Field Visits' | 'Farm Harvests';
  event_date?: string | null;
  featured?: boolean;
  status?: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
};

/*
|--------------------------------------------------------------------------
| Gallery Videos
|--------------------------------------------------------------------------
*/

export type GalleryVideo = {
  id: number;
  title: string;
  description?: string | null;

  link?: string | null;
  embed_url?: string | null;
  video_path?: string | null;

  thumbnail?: string | null;
  thumbnail_path?: string | null;

  category: string;
  event_date?: string | null;
  featured?: boolean;
  status?: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
};

/*
|--------------------------------------------------------------------------
| Training Courses
|--------------------------------------------------------------------------
*/

export type TrainingCourse = {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;

  category:
    | 'Livestock Production'
    | 'Horticultural Crops'
    | 'Greenhouse Systems'
    | 'Agribusiness Development';

  duration?: string | null;
  price?: number | null;

  image?: string | null;

  curriculum?: string[] | null;
  target_audience?: string | null;

  available?: boolean;
  max_participants?: number | null;

  start_date?: string | null; // Laravel cast date -> usually "YYYY-MM-DD"
  delivery_mode?: 'in_person' | 'online' | 'hybrid' | null;
  meeting_link?: string | null;

  status?: 'draft' | 'published';

  created_at?: string;
  updated_at?: string;
};

type LaravelPaginator<T> = {
  data: T[];
  links?: unknown;
  meta?: unknown;
};

/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
*/

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
  },
});

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

// Prefix relative /storage paths
const withBase = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

/*
|--------------------------------------------------------------------------
| Normalizers
|--------------------------------------------------------------------------
*/

const normalizeProduct = (p: MarketProduct): MarketProduct => ({
  ...p,
  image: withBase(p.image ?? null),
  images: Array.isArray(p.images)
    ? p.images.map((img) => withBase(img) ?? img)
    : [],
});

const normalizeGalleryImage = (g: GalleryImage): GalleryImage => ({
  ...g,
  image: withBase(g.image) ?? g.image,
});

const normalizeGalleryVideo = (v: GalleryVideo): GalleryVideo => ({
  ...v,
  video_path: withBase(v.video_path ?? null) ?? v.video_path ?? null,
  thumbnail_path: withBase(v.thumbnail_path ?? null) ?? v.thumbnail_path ?? null,
  thumbnail: withBase(v.thumbnail ?? null) ?? v.thumbnail ?? null,
});

const normalizePublication = (p: Publication): Publication => ({
  ...p,
  cover_image: withBase(p.cover_image ?? null) ?? p.cover_image ?? null,
  pdf_path: withBase(p.pdf_path ?? null) ?? p.pdf_path ?? null,
  files: Array.isArray(p.files)
    ? p.files.map((f) => withBase(f) ?? f)
    : [],
});

const normalizeTrainingCourse = (t: TrainingCourse): TrainingCourse => ({
  ...t,
  image: withBase(t.image ?? null) ?? t.image ?? null,
});

/*
|--------------------------------------------------------------------------
| API Methods
|--------------------------------------------------------------------------
*/

export const laravelApi = {
  /*
  |--------------------------------------------------------------------------
  | Health
  |--------------------------------------------------------------------------
  */
  health: async (): Promise<HealthResponse> => {
    const response = await api.get<HealthResponse>('/api/health');
    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | Market Products
  |--------------------------------------------------------------------------
  */
  getProducts: async (category?: string | null): Promise<MarketProduct[]> => {
    const response = await api.get<LaravelPaginator<MarketProduct>>(
      '/api/market-products',
      { params: { category } }
    );

    return response.data.data.map(normalizeProduct);
  },

  getProductById: async (id: string | number): Promise<MarketProduct> => {
    const response = await api.get<MarketProduct>(`/api/market-products/${id}`);
    return normalizeProduct(response.data);
  },

  /*
  |--------------------------------------------------------------------------
  | Publications
  |--------------------------------------------------------------------------
  */
  getPublications: async (params?: {
    q?: string;
    category?: string | null;
    per_page?: number;
  }): Promise<Publication[]> => {
    const response = await api.get<LaravelPaginator<Publication>>(
      '/api/publications',
      { params }
    );

    return response.data.data.map(normalizePublication);
  },

  getPublicationById: async (id: string | number): Promise<Publication> => {
    const response = await api.get<Publication>(`/api/publications/${id}`);
    return normalizePublication(response.data);
  },

  /*
  |--------------------------------------------------------------------------
  | Gallery Images
  |--------------------------------------------------------------------------
  */
  getGalleryImages: async (params?: {
    q?: string;
    category?: GalleryImage['category'];
    per_page?: number;
  }): Promise<GalleryImage[]> => {
    const response = await api.get<LaravelPaginator<GalleryImage>>(
      '/api/gallery-images',
      { params }
    );

    return response.data.data.map(normalizeGalleryImage);
  },

  getGalleryImageById: async (id: string | number): Promise<GalleryImage> => {
    const response = await api.get<GalleryImage>(`/api/gallery-images/${id}`);
    return normalizeGalleryImage(response.data);
  },

  /*
  |--------------------------------------------------------------------------
  | Gallery Videos
  |--------------------------------------------------------------------------
  */
  getGalleryVideos: async (params?: {
    q?: string;
    category?: string;
    per_page?: number;
  }): Promise<GalleryVideo[]> => {
    const response = await api.get<LaravelPaginator<GalleryVideo>>(
      '/api/gallery-videos',
      { params }
    );

    return response.data.data.map(normalizeGalleryVideo);
  },

  getGalleryVideoById: async (id: string | number): Promise<GalleryVideo> => {
    const response = await api.get<GalleryVideo>(`/api/gallery-videos/${id}`);
    return normalizeGalleryVideo(response.data);
  },

  /*
  |--------------------------------------------------------------------------
  | Training Courses
  |--------------------------------------------------------------------------
  */
  getTrainingCourses: async (params?: {
    q?: string;
    category?: TrainingCourse['category'];
    when?: 'upcoming' | 'past_recent' | 'past_archived';
    delivery_mode?: 'in_person' | 'online' | 'hybrid';
    per_page?: number;
  }): Promise<TrainingCourse[]> => {
    const response = await api.get<LaravelPaginator<TrainingCourse>>(
      '/api/training-courses',
      { params }
    );

    return response.data.data.map(normalizeTrainingCourse);
  },
};