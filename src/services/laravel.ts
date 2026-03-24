import axios from 'axios';

/**
 * ENV
 * - VITE_API_URL should be the API base, e.g:
 *     dev:  http://127.0.0.1:8000/api
 *     prod: https://factfarm.africa/api
 */
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, '');
const API_TOKEN = import.meta.env.VITE_API_TOKEN as string | undefined;

// Fallback for local dev if env is missing
const FALLBACK_API_BASE = 'http://127.0.0.1:8000/api';
const FINAL_API_BASE = API_BASE && API_BASE.length > 0 ? API_BASE : FALLBACK_API_BASE;

// Derive site origin for absolute asset URLs (storage, uploads, etc.)
const SITE_ORIGIN = (() => {
  try {
    return new URL(FINAL_API_BASE).origin;
  } catch {
    return 'http://127.0.0.1:8000';
  }
})();

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
  price?: number | string | null;
  category?: string | null;
  unit?: string | null;

  featured?: boolean;
  in_stock?: boolean;
  stock_quantity?: number | null;

  image?: string | null;
  images?: string[] | null;

  image_urls?: string[] | null;

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
  section?: 'article' | 'insight';

  cover_image?: string | null;
  pdf_path?: string | null;

  files?: string[] | null;

  category?: string | null;
  written_by?: string | null;
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
| Gallery
|--------------------------------------------------------------------------
*/

export type GalleryCategory =
  | 'Training and Events'
  | 'Agribusiness and Enterprise Development'
  | 'Field Visits'
  | 'Agritourism'
  | 'Youth in Agriculture'
  | 'FaCT Ltd Harvests'
  | 'Success Stories';

export type GalleryImage = {
  id: number;
  title: string;
  description?: string | null;
  image: string;
  category: GalleryCategory;
  event_date?: string | null;
  featured?: boolean;
  status?: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
};

export type GalleryVideo = {
  id: number;
  title: string;
  description?: string | null;

  link?: string | null;
  embed_url?: string | null;
  video_path?: string | null;

  thumbnail?: string | null;
  thumbnail_path?: string | null;

  category: GalleryCategory;
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

  booked_count?: number | null;

  start_date?: string | null;
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
  baseURL: FINAL_API_BASE,
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

const withSiteOrigin = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SITE_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
};

const withPublicStorageOrigin = (path?: string | null): string | null => {
  if (!path) return null;

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.replace(/^\/+/, '');

  if (
    cleanPath.startsWith('storage/') ||
    cleanPath.startsWith('uploads/') ||
    cleanPath.startsWith('images/')
  ) {
    return `${SITE_ORIGIN}/${cleanPath}`;
  }

  return `${SITE_ORIGIN}/storage/${cleanPath}`;
};

const extractItems = <T>(payload: T[] | LaravelPaginator<T>): T[] => {
  if (Array.isArray(payload)) return payload;
  return Array.isArray(payload?.data) ? payload.data : [];
};

/*
|--------------------------------------------------------------------------
| Normalizers
|--------------------------------------------------------------------------
*/

const normalizeProduct = (p: MarketProduct): MarketProduct => ({
  ...p,
  image_urls: Array.isArray(p.image_urls)
    ? p.image_urls.map((img) => withSiteOrigin(img) ?? img)
    : [],
  image: withSiteOrigin(p.image ?? null),
  images: Array.isArray(p.images)
    ? p.images.map((img) => withSiteOrigin(img) ?? img)
    : [],
});

const normalizeGalleryImage = (g: GalleryImage): GalleryImage => ({
  ...g,
  image: withPublicStorageOrigin(g.image) ?? g.image,
});


const normalizeGalleryVideo = (v: GalleryVideo): GalleryVideo => ({
  ...v,
  video_path: withPublicStorageOrigin(v.video_path ?? null) ?? v.video_path ?? null,
  thumbnail_path: withPublicStorageOrigin(v.thumbnail_path ?? null) ?? v.thumbnail_path ?? null,
  thumbnail: withPublicStorageOrigin(v.thumbnail ?? null) ?? v.thumbnail ?? null,
});

const normalizePublication = (p: Publication): Publication => ({
  ...p,
  cover_image: withPublicStorageOrigin(p.cover_image ?? null) ?? p.cover_image ?? null,
  pdf_path: withPublicStorageOrigin(p.pdf_path ?? null) ?? p.pdf_path ?? null,
  files: Array.isArray(p.files)
    ? p.files.map((f) => withPublicStorageOrigin(f) ?? f)
    : [],
});

const normalizeTrainingCourse = (t: TrainingCourse): TrainingCourse => ({
  ...t,
  image: withSiteOrigin(t.image ?? null) ?? t.image ?? null,
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
    const response = await api.get<HealthResponse>('/health');
    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | Market Products
  |--------------------------------------------------------------------------
  */
  getProducts: async (category?: string | null): Promise<MarketProduct[]> => {
    const response = await api.get<LaravelPaginator<MarketProduct>>('/market-products', {
      params: { category },
    });

    return response.data.data.map(normalizeProduct);
  },

  getProductById: async (id: string | number): Promise<MarketProduct> => {
    const response = await api.get<MarketProduct>(`/market-products/${id}`);
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
    const response = await api.get<LaravelPaginator<Publication>>('/publications', {
      params,
    });

    return response.data.data.map(normalizePublication);
  },

  getPublicationById: async (id: string | number): Promise<Publication> => {
    const response = await api.get<Publication>(`/publications/${id}`);
    return normalizePublication(response.data);
  },

  /*
  |--------------------------------------------------------------------------
  | Gallery Images
  |--------------------------------------------------------------------------
  */
  getGalleryImages: async (params?: {
    q?: string;
    category?: GalleryCategory;
    per_page?: number;
  }): Promise<GalleryImage[]> => {
    const response = await api.get<GalleryImage[] | LaravelPaginator<GalleryImage>>('/gallery-images', {
      params,
    });

    return extractItems(response.data).map(normalizeGalleryImage);
  },

  getGalleryImageById: async (id: string | number): Promise<GalleryImage> => {
    const response = await api.get<GalleryImage>(`/gallery-images/${id}`);
    return normalizeGalleryImage(response.data);
  },

  /*
  |--------------------------------------------------------------------------
  | Gallery Videos
  |--------------------------------------------------------------------------
  */
  getGalleryVideos: async (params?: {
    q?: string;
    category?: GalleryCategory;
    per_page?: number;
  }): Promise<GalleryVideo[]> => {
    const response = await api.get<GalleryVideo[] | LaravelPaginator<GalleryVideo>>('/gallery-videos', {
      params,
    });

    return extractItems(response.data).map(normalizeGalleryVideo);
  },

  getGalleryVideoById: async (id: string | number): Promise<GalleryVideo> => {
    const response = await api.get<GalleryVideo>(`/gallery-videos/${id}`);
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
    const response = await api.get<LaravelPaginator<TrainingCourse>>('/training-courses', {
      params,
    });

    return response.data.data.map(normalizeTrainingCourse);
  },
};
