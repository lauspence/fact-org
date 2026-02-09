import { useState, useEffect } from 'react';
import { productsApi } from '../services/strapi';
import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaFilter } from 'react-icons/fa';

interface Product {
  id: number;
  documentId?: string;
  name: string;
  description?: string;
  price?: number;
  category?: string;
  inStock?: boolean;
  featured?: boolean;
  image?: string;
  images?: Array<{ url: string; id: number; name: string }>;
  [key: string]: unknown;
}

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getAll(selectedCategory);
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
        description="Shop quality agricultural products, training courses, and publications from F.a.C.T Ltd"
        keywords="agricultural products Kenya, farm inputs, training courses, farming publications"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Simplified */}
        <section className="bg-white border-b-2 border-gray-200 py-16 px-4">
          <div className="container mx-auto text-center">
            <FaShoppingCart className="text-5xl text-gray-700 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quality agricultural products, inputs, and resources for modern farmers
            </p>
          </div>
        </section>

        {/* Category Filter - Clean Design */}
        <section className="py-6 px-4 bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4 lg:mb-0">
              <FaFilter className="text-gray-500" />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-5 py-2 rounded-lg font-medium transition border ${
                  selectedCategory === null
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-lg font-medium transition border ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-xl text-red-600">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
                  <FaShoppingCart className="text-4xl text-gray-400" />
                </div>
                <p className="text-2xl font-semibold text-gray-800 mb-2">No products available yet</p>
                <p className="text-gray-500 mb-6">Check back soon or contact us for inquiries</p>
                <Link 
                  to="/contact" 
                  className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
                >
                  Contact Us
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden group"
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaShoppingCart className="text-6xl text-gray-300" />
                        </div>
                      )}
                      {product.inStock === false && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <span className="text-white font-bold text-lg bg-red-600 px-4 py-2 rounded-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-3 right-3 bg-amber-400 text-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-md">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {product.category && (
                        <div className="inline-block text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                          {product.category}
                        </div>
                      )}
                      <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {product.price && product.price > 0 ? (
                          <span className="text-xl font-bold text-gray-900">
                            KES {Number(product.price).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500 font-medium">Contact for Price</span>
                        )}
                        <Link
                          to={`/marketplace/${product.documentId || product.id}`}
                          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-semibold"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action - Minimal */}
        <section className="py-16 px-4 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">
              Need Help Finding the Right Products?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Our agricultural experts are ready to assist you with product selection and recommendations
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
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
