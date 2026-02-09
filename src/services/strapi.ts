import axios from 'axios';

// Base URL - Update for production
const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API_BASE = `${API_URL}/api`;

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
// Helper to format Strapi 5 response
const formatStrapiData = (data: StrapiData | StrapiData[] | null): FormattedData | FormattedData[] | null => {
  if (!data) return null;
  
  if (Array.isArray(data)) {
    return data
      .filter(item => item && item.id)
      .map(item => {
        const result = { ...item } as FormattedData;

        // Strapi 5: Image is a direct object
        if (item.image && typeof item.image === 'object') {
          const imageData = item.image as { url?: string };
          if (imageData.url) {
            result.image = `${API_URL}${imageData.url}`;
          }
        }

        // Format multiple images
        if (item.images && Array.isArray(item.images)) {
          result.images = item.images
            .filter((img: { url?: string }) => img?.url)
            .map((img: { id: number; url: string; name: string; width: number; height: number }) => ({
              id: img.id,
              url: `${API_URL}${img.url}`,
              name: img.name,
              width: img.width,
              height: img.height
            }));
        }

        // Format cover image
        if (item.coverImage && typeof item.coverImage === 'object') {
          const coverData = item.coverImage as { url?: string };
          if (coverData.url) {
            result.coverImage = `${API_URL}${coverData.url}`;
          }
        }

        // Format file
        if (item.file && typeof item.file === 'object') {
          const fileData = item.file as { url?: string };
          if (fileData.url) {
            result.file = `${API_URL}${fileData.url}`;
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
      const response = await axios.get(
        `${API_BASE}/gallery-images?populate=*&sort=eventDate:desc${filters}`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Gallery API Error:', error);
      throw error;
    }
  },
  
  getFeatured: async (): Promise<FormattedData[]> => {
    try {
      const response = await axios.get(
        `${API_BASE}/gallery-images?populate=*&filters[featured][$eq]=true&sort=eventDate:desc&pagination[limit]=6`
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
      const response = await axios.get(
        `${API_BASE}/publications?populate=*&sort=publishedDate:desc${filters}`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Publications API Error:', error);
      throw error;
    }
  },
  
  getFree: async (): Promise<FormattedData[]> => {
    try {
      const response = await axios.get(
        `${API_BASE}/publications?populate=*&filters[isFree][$eq]=true&sort=publishedDate:desc`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Free Publications API Error:', error);
      throw error;
    }
  },
  
  getById: async (id: number | string): Promise<FormattedData> => {
    try {
      const response = await axios.get(`${API_BASE}/publications/${id}?populate=*`);
      return formatStrapiData(response.data.data) as FormattedData;
    } catch (error) {
      console.error('Publication Detail API Error:', error);
      throw error;
    }
  }
};

// Market Products API
export const productsApi = {
  getAll: async (category: string | null = null): Promise<FormattedData[]> => {
    try {
      const filters = category ? `&filters[category][$eq]=${category}` : '';
      const response = await axios.get(
        `${API_BASE}/market-products?populate=*&filters[inStock][$eq]=true${filters}`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Products API Error:', error);
      throw error;
    }
  },
  
  getFeatured: async (): Promise<FormattedData[]> => {
    try {
      const response = await axios.get(
        `${API_BASE}/market-products?populate=*&filters[featured][$eq]=true&filters[inStock][$eq]=true&pagination[limit]=6`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Featured Products API Error:', error);
      throw error;
    }
  },
  
  getById: async (id: number | string): Promise<FormattedData> => {
    try {
      const response = await axios.get(`${API_BASE}/market-products/${id}?populate=*`);
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
      const response = await axios.get(
        `${API_BASE}/training-courses?populate=*&filters[available][$eq]=true${filters}`
      );
      return formatStrapiData(response.data.data) as FormattedData[];
    } catch (error) {
      console.error('Courses API Error:', error);
      throw error;
    }
  },
  
  getById: async (id: number | string): Promise<FormattedData> => {
    try {
      const response = await axios.get(`${API_BASE}/training-courses/${id}?populate=*`);
      return formatStrapiData(response.data.data) as FormattedData;
    } catch (error) {
      console.error('Course Detail API Error:', error);
      throw error;
    }
  }
};

// Export all APIs
export default {
  gallery: galleryApi,
  publications: publicationsApi,
  products: productsApi,
  courses: coursesApi
};
