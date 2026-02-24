import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // e.g. http://127.0.0.1:8000
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export type HealthResponse = {
  ok: boolean;
  time: string;
};

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

export type GalleryImage = {
  id: number;
  title: string;
  description?: string | null;
  image: string; // stored as string in DB (often relative /storage/...)
  category: 'Training Events' | 'Workshops' | 'Field Visits' | 'Farm Harvests';
  event_date?: string | null;
  featured?: boolean;
  status?: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
};

type LaravelPaginator<T> = {
  data: T[];
  links?: unknown;
  meta?: unknown;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
  },
});

// ✅ helper to prefix relative URLs (e.g. /storage/..)
const withBase = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

const normalizeProduct = (p: MarketProduct): MarketProduct => {
  return {
    ...p,
    image: withBase(p.image ?? null),
    images: Array.isArray(p.images) ? p.images.map((img) => withBase(img) ?? img) : [],
  };
};

const normalizeGalleryImage = (g: GalleryImage): GalleryImage => {
  return {
    ...g,
    image: withBase(g.image) ?? g.image,
  };
};

export const laravelApi = {
  health: async (): Promise<HealthResponse> => {
    const response = await api.get<HealthResponse>('/api/health');
    return response.data;
  },

  // -------- Market Products --------
  getProducts: async (category?: string | null): Promise<MarketProduct[]> => {
    const response = await api.get<LaravelPaginator<MarketProduct>>('/api/market-products', {
      params: { category },
    });

    return response.data.data.map(normalizeProduct);
  },

  getProductById: async (id: string | number): Promise<MarketProduct> => {
    const response = await api.get<MarketProduct>(`/api/market-products/${id}`);
    return normalizeProduct(response.data);
  },

  // -------- Gallery Images --------
  getGalleryImages: async (params?: {
    q?: string;
    category?: GalleryImage['category'];
    per_page?: number;
  }): Promise<GalleryImage[]> => {
    const response = await api.get<LaravelPaginator<GalleryImage>>('/api/gallery-images', {
      params,
    });

    return response.data.data.map(normalizeGalleryImage);
  },

  getGalleryImageById: async (id: string | number): Promise<GalleryImage> => {
    const response = await api.get<GalleryImage>(`/api/gallery-images/${id}`);
    return normalizeGalleryImage(response.data);
  },
};