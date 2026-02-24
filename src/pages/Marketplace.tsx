import { useState, useEffect } from 'react';
import { laravelApi } from '../services/laravel';
import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaFilter, FaTag } from 'react-icons/fa';

// Rich text block types for Strapi 5
interface RichTextChild {
  type: string;
  text?: string;
}

interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

type Description = string | RichTextBlock[];

interface Product {
  id: number;
  // documentId?: string; // ❌ Strapi only - remove if you want
  name: string;
  description?: Description;
  price?: number;
  category?: string;
  featured?: boolean;
  image?: string;

  // ✅ Laravel uses snake_case
  in_stock?: boolean;

  // ✅ Laravel controller validates images.* as strings
  images?: string[];

  // Any other fields from Laravel
  [key: string]: unknown;
}

// Helper function to extract text from Strapi rich text
const extractTextFromDescription = (description: Description | undefined): string => {
  if (!description) return '';
  if (typeof description === 'string') return description;

  if (Array.isArray(description)) {
    return description
      .map(block => {
        if (block?.children && Array.isArray(block.children)) {
          return block.children
            .map((child) => child?.text || '')
            .join('');
        }
        return '';
      })
      .join(' ');
  }

  return '';
};

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await laravelApi.getProducts(selectedCategory);
        setProducts(data as Product[]);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const categories = ['Seeds', 'Fertilizers', 'Tools', 'Equipment', 'Inputs'];

  return (
    <>
      <SEO
        title="Marketplace"
        description="Shop quality agricultural products, training courses, and publications from FaCT Ltd"
        keywords="agricultural products Kenya, farm inputs, training courses, farming publications"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Compact for Mobile */}
        <section className="bg-white border-b border-gray-200 py-8 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-100 mb-3 md:mb-4">
              <FaShoppingCart className="text-2xl md:text-3xl text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-gray-900">
              Marketplace
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              Quality agricultural products and inputs for modern farming
            </p>
          </div>
        </section>

        {/* Category Filter - Mobile Optimized */}
        <section className="py-4 md:py-6 px-4 bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <FaFilter className="text-gray-400 text-xs" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Filter
              </span>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid - Responsive & Compact */}
        <section className="py-6 md:py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900 mb-4"></div>
                <p className="text-sm md:text-base text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
                  <FaShoppingCart className="text-3xl text-red-500" />
                </div>
                <p className="text-lg text-red-600 font-semibold">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                  <FaShoppingCart className="text-4xl text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">No products found</p>
                <p className="text-base text-gray-500 mb-6 max-w-md mx-auto px-4">
                  {selectedCategory
                    ? `No products in "${selectedCategory}" yet`
                    : 'Check back soon or contact us'}
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-gray-900 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-gray-800 transition font-semibold text-sm md:text-base"
                >
                  Contact Us
                </Link>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-4 md:mb-6">
                  <p className="text-sm md:text-base text-gray-600 font-medium">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                </div>

                {/* Product Grid - Mobile First, 2 cols on mobile, 3 on tablet, 4 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg md:rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden group"
                    >
                      {/* Product Image - Smaller on Mobile */}
                      <div className="relative h-40 md:h-56 overflow-hidden bg-gray-50">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]} // ✅ Laravel: string[]
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaShoppingCart className="text-4xl md:text-5xl text-gray-300" />
                          </div>
                        )}

                        {/* Badges - Compact on Mobile */}
                        <div className="absolute top-2 left-2 right-2 flex justify-between items-start gap-1">
                          {product.category && (
                            <div className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-md text-[10px] md:text-xs font-bold shadow-sm">
                              <FaTag className="text-gray-500 text-[8px] md:text-xs" />
                              <span className="hidden md:inline">{product.category.trim()}</span>
                              <span className="md:hidden">{product.category.trim().substring(0, 4)}</span>
                            </div>
                          )}
                          {product.featured && (
                            <div className="bg-amber-400 text-gray-900 px-2 py-1 rounded-md text-[10px] md:text-xs font-bold shadow-sm">
                              ⭐
                            </div>
                          )}
                        </div>

                        {/* Out of Stock Overlay */}
                        {product.in_stock === false && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-white font-bold text-xs md:text-sm bg-red-600 px-3 py-1.5 rounded-lg">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info - Compact */}
                      <div className="p-3 md:p-4">
                        <h3 className="text-sm md:text-base font-bold mb-2 text-gray-900 line-clamp-2 leading-snug">
                          {product.name}
                        </h3>

                        {/* Description - Hidden on Mobile */}
                        {product.description && (
                          <p className="hidden md:block text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                            {extractTextFromDescription(product.description)}
                          </p>
                        )}

                        {/* Price - Compact */}
                        <div className="mb-3">
                          {product.price && product.price > 0 ? (
                            <div>
                              <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">Price</p>
                              <p className="text-base md:text-lg font-bold text-gray-900">
                                KES {Number(product.price).toLocaleString()}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">Contact for Price</span>
                          )}
                        </div>

                        {/* CTA Button - Full Width on Mobile */}
                        <Link
                          to={`/marketplace/${product.id}`} // ✅ Use Laravel ID
                          className="block w-full text-center bg-gray-900 text-white px-3 py-2 md:py-2.5 rounded-lg hover:bg-gray-800 transition text-xs md:text-sm font-semibold"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Call to Action - Mobile Optimized */}
        <section className="py-12 md:py-16 px-4 bg-gray-900 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Need Expert Guidance?
            </h2>
            <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed">
              Our agricultural specialists are ready to help you find the perfect products
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-gray-900 px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-sm md:text-base"
            >
              Contact Our Team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Marketplace;