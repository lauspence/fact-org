import axios from 'axios';

// Base URL - Update for production
const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API_BASE = `${API_URL}/api`;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error('403 Forbidden: Check Strapi permissions or API token');
    }
    if (error.response?.status === 401) {
      console.error('401 Unauthorized: Invalid or missing API token');
    }
    return Promise.reject(error);
  }
);

// Types for Strapi 5
interface StrapiData {
  id: number;
  documentId?: string;
  [key: string]: unknown;
}

interface FormattedData {
  id: number;
  documentId?: string;
  [key: string]: unknown;
}

// Helper to format Strapi 5 response
const formatStrapiData = (data: StrapiData | StrapiData[] | null): FormattedData | FormattedData[] | null => {
  if (!data) return null;
  
  if (Array.isArray(data)) {
    return data
      .filter(item => item && item.id)
      .map(item => {
        const result = { ...item } as FormattedData;

        // Helper function to format URL (handles both local and Cloudinary)
        const formatUrl = (url: string): string => {
          if (!url) return '';
          // If URL already starts with http/https, return as-is (Cloudinary)
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
          }
          // Otherwise, prepend API_URL (local uploads)
          return `${API_URL}${url}`;
        };

        // Strapi 5: Image is a direct object
        if (item.image && typeof item.image === 'object') {
          const imageData = item.image as { url?: string };
          if (imageData.url) {
            result.image = formatUrl(imageData.url);
          }
        }

        // Format multiple images
        if (item.images && Array.isArray(item.images)) {
          result.images = item.images
            .filter((img: { url?: string }) => img?.url)
            .map((img: { id: number; url: string; name: string; width: number; height: number }) => ({
              id: img.id,
              url: formatUrl(img.url),
              name: img.name,
              width: img.width,
              height: img.height
            }));
        }

        // Format cover image
        if (item.coverImage && typeof item.coverImage === 'object') {
          const coverData = item.coverImage as { url?: string };
          if (coverData.url) {
            result.coverImage = formatUrl(coverData.url);
          }
        }

        // Format file
        if (item.file && typeof item.file === 'object') {
          const fileData = item.file as { url?: string };
          if (fileData.url) {
            result.file = formatUrl(fileData.url);
          }
        }

        return result;
      });
  }
  
  return { ...data };
};

// Gallery Images API
export const galleryApi = {
  getAll: async (category: string | null = null): Promise<FormattedData[]> => {
    try {
      const filters = category ? `&filters[category][$eq]=${category}` : '';
      const response = await apiClient.get(
        `/gallery-images?populate=*&sort=eventDate:desc${filters}`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Gallery API Error:', error);
      throw error;
    }
  },
  
  getFeatured: async (): Promise<FormattedData[]> => {
    try {
      const response = await apiClient.get(
        `/gallery-images?populate=*&filters[featured][$eq]=true&sort=eventDate:desc&pagination[limit]=6`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Featured Gallery API Error:', error);
      throw error;
    }
  }
};

// Publications API
export const publicationsApi = {
  getAll: async (category: string | null = null): Promise<FormattedData[]> => {
    try {
      const filters = category ? `&filters[category][$eq]=${category}` : '';
      const response = await apiClient.get(
        `/publications?populate=*&sort=publishedDate:desc${filters}`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Publications API Error:', error);
      throw error;
    }
  },
  
  getFree: async (): Promise<FormattedData[]> => {
    try {
      const response = await apiClient.get(
        `/publications?populate=*&filters[isFree][$eq]=true&sort=publishedDate:desc`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Free Publications API Error:', error);
      throw error;
    }
  },
  
  getById: async (id: number | string): Promise<FormattedData> => {
    try {
      const response = await apiClient.get(`/publications/${id}?populate=*`);
      return formatStrapiData(response.data.data) as FormattedData;
    } catch (error) {
      console.error('Publication Detail API Error:', error);
      throw error;
    }
  }
};

// Market Products API
// Market Products API
export const productsApi = {
  getAll: async (category: string | null = null): Promise<FormattedData[]> => {
    try {
      const filters = category ? `&filters[category][$containsi]=${category}` : '';
      const response = await apiClient.get(
        `/market-products?populate=*${filters}` // ← Removed inStock filter
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Products API Error:', error);
      throw error;
    }
  },
  
  getFeatured: async (): Promise<FormattedData[]> => {
    try {
      const response = await apiClient.get(
        `/market-products?populate=*&filters[featured][$eq]=true&pagination[limit]=6` // ← Removed inStock filter
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Featured Products API Error:', error);
      throw error;
    }
  },
  
  getById: async (id: number | string): Promise<FormattedData> => {
    try {
      const response = await apiClient.get(`/market-products/${id}?populate=*`);
      return formatStrapiData(response.data.data) as FormattedData;
    } catch (error) {
      console.error('Product Detail API Error:', error);
      throw error;
    }
  }
};

// Training Courses API
export const coursesApi = {
  getAll: async (category: string | null = null): Promise<FormattedData[]> => {
    try {
      const filters = category ? `&filters[category][$eq]=${category}` : '';
      const response = await apiClient.get(
        `/training-courses?populate=*&filters[available][$eq]=true${filters}`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Courses API Error:', error);
      throw error;
    }
  },
  
  getById: async (id: number | string): Promise<FormattedData> => {
    try {
      const response = await apiClient.get(`/training-courses/${id}?populate=*`);
      return formatStrapiData(response.data.data) as FormattedData;
    } catch (error) {
      console.error('Course Detail API Error:', error);
      throw error;
    }
  }
};

export const articlesApi = publicationsApi;
// Export all APIs
export default {
  gallery: galleryApi,
  publications: publicationsApi,
  articles: publicationsApi,
  products: productsApi,
  courses: coursesApi,
};
