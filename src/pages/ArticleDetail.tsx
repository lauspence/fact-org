import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaArrowLeft, FaSpinner, FaShareAlt, FaDownload, FaArrowRight } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/common/SEO';
import { publicationsApi } from '../services/strapi'; // Fixed import path

interface Article {
  id: number;
  documentId?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  coverImage?: string;
  image?: string;
  author?: string;
  publishedDate?: string;
  category?: string;
  file?: string;
  isFree?: boolean;
  [key: string]: unknown; // Add index signature
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      
      // Fetch article by id or slug
      const data = await publicationsApi.getById(slug!);
      const articleData = data as unknown as Article;
      setArticle(articleData);
      
      // Fetch related articles from same category
      if (articleData.category) {
        await fetchRelatedArticles(articleData.category);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load article. Please try again later.');
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (category: string) => {
    try {
      const data = await publicationsApi.getAll(category);
      // Filter out current article and limit to 3
      const filtered = (data as unknown as Article[])
        .filter(a => a.id !== article?.id)
        .slice(0, 3);
      setRelatedArticles(filtered);
    } catch (err) {
      console.error('Error fetching related articles:', err);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt || article?.description,
        url: window.location.href,
      }).catch(err => console.error('Error sharing:', err));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/articles"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <FaArrowLeft /> Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={article.title}
        description={article.excerpt || article.description || ''}
        keywords={`${article.category || ''}, agriculture, farming, ${article.title}`}
        image={article.coverImage || article.image}
      />

      <div className="bg-white">
        {/* Back Button */}
        <div className="bg-gray-50 border-b border-gray-200 py-4 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link 
              to="/articles"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium"
            >
              <FaArrowLeft /> Back to Articles
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {article.category && (
              <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
                {article.category}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              {article.author && (
                <div className="flex items-center gap-2">
                  <FaUser className="text-emerald-600" />
                  <span className="font-medium">{article.author}</span>
                </div>
              )}
              {article.publishedDate && (
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-emerald-600" />
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
              )}
              <div className="flex items-center gap-3 ml-auto">
                {'share' in navigator && (
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    <FaShareAlt /> Share
                  </button>
                )}
                {article.file && article.isFree && (
                  <a
                    href={article.file}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <FaDownload /> Download PDF
                  </a>
                )}
              </div>
            </div>

            {/* Cover Image */}
            {(article.coverImage || article.image) && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={article.coverImage || article.image}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
              {article.content ? (
                <ReactMarkdown>{article.content}</ReactMarkdown>
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {article.description}
                </p>
              )}
            </div>

            {/* Download CTA for paid content */}
            {article.file && !article.isFree && (
              <div className="mt-10 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Get the Full Article
                </h3>
                <p className="text-gray-600 mb-6">
                  Contact us to access the complete version of this publication
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Contact Us <FaArrowRight />
                </Link>
              </div>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/articles/${relatedArticle.slug || relatedArticle.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-emerald-200"
                  >
                    {(relatedArticle.coverImage || relatedArticle.image) && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedArticle.coverImage || relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedArticle.excerpt || relatedArticle.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-gray-600 mb-8">
              Explore our training programs and services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/knowledge-training"
                className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                View Training Programs
              </Link>
              <Link
                to="/contact"
                className="inline-block border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ArticleDetail;
