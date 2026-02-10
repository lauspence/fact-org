import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsApi } from '../services/strapi';
import SEO from '../components/common/SEO';
import { FaArrowLeft, FaShoppingCart, FaTag, FaBox, FaCheckCircle } from 'react-icons/fa';

// Rich text block types
interface RichTextChild {
  type: string;
  text?: string;
}

interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

type Description = string | RichTextBlock[];
type Specifications = string | RichTextBlock[];

interface Product {
  id: number;
  documentId?: string;
  name: string;
  description?: Description;
  specifications?: Specifications;
  price?: number;
  category?: string;
  inStock?: boolean;
  featured?: boolean;
  stockQuantity?: number;
  unit?: string;
  image?: string;
  images?: Array<{ url: string; id: number; name: string }>;
  [key: string]: unknown;
}

// Helper to extract text from rich text
const extractText = (content: Description | Specifications | undefined): string => {
  if (!content) return '';
  if (typeof content === 'string') return content;
  
  if (Array.isArray(content)) {
    return content
      .map(block => {
        if (block?.children && Array.isArray(block.children)) {
          return block.children
            .map((child) => child?.text || '')
            .join('');
        }
        return '';
      })
      .join('\n');
  }
  
  return '';
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await productsApi.getById(id);
        setProduct(data as Product);
        
        // Set initial selected image
        if (data.image) {
          setSelectedImage(data.image as string);
        } else if (data.images && Array.isArray(data.images) && data.images.length > 0) {
          setSelectedImage(data.images[0].url);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/marketplace"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(product.images?.map(img => img.url) || [])
  ];

  return (
    <>
      <SEO 
        title={product.name}
        description={extractText(product.description).substring(0, 160)}
        keywords={`${product.name}, ${product.category}, agricultural products Kenya`}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200 py-4 px-4">
          <div className="container mx-auto max-w-7xl">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <FaArrowLeft />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>

        {/* Product Detail */}
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images Section */}
            <div>
              {/* Main Image */}
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden mb-4">
                <div className="relative h-64 md:h-96 bg-gray-50 flex items-center justify-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <FaShoppingCart className="text-8xl text-gray-300" />
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    {product.category && (
                      <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                        <FaTag className="text-gray-500" />
                        {product.category.trim()}
                      </div>
                    )}
                    {product.featured && (
                      <div className="bg-amber-400 text-gray-900 px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`bg-white rounded-lg border-2 overflow-hidden transition ${
                        selectedImage === image
                          ? 'border-gray-900'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="aspect-square">
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  {product.price && product.price > 0 ? (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Price</p>
                      <p className="text-4xl font-bold text-gray-900">
                        KES {Number(product.price).toLocaleString()}
                      </p>
                      {product.unit && (
                        <p className="text-sm text-gray-500 mt-1">per {product.unit} unit(s)</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-lg text-gray-600">Contact us for pricing</p>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  {product.inStock === false ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <FaBox />
                      <span className="font-semibold">Out of Stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600">
                      <FaCheckCircle />
                      <span className="font-semibold">In Stock</span>
                      {product.stockQuantity && (
                        <span className="text-gray-500 ml-2">
                          ({product.stockQuantity} available)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {extractText(product.description)}
                    </p>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Specifications</h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {extractText(product.specifications)}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Link
                    to="/contact"
                    className="flex-1 bg-gray-900 text-white text-center px-6 py-4 rounded-lg hover:bg-gray-800 transition font-bold text-lg"
                  >
                    Contact Us to Order
                  </Link>
                  <Link
                    to="/marketplace"
                    className="flex-1 bg-white text-gray-900 text-center px-6 py-4 rounded-lg border-2 border-gray-300 hover:border-gray-900 transition font-semibold text-lg"
                  >
                    View More Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
