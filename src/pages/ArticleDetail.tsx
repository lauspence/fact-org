import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaCalendar,
  FaArrowLeft,
  FaSpinner,
  FaShareAlt,
  FaDownload,
  FaArrowRight,
  FaFilePdf,
  FaExternalLinkAlt,
  FaTag,
  FaPrint,
  FaUser,
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/common/SEO';
import { laravelApi, type Publication } from '../services/laravel';

type Article = Publication;

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) fetchArticle(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchArticle = async (idOrSlug: string) => {
    try {
      setLoading(true);
      const data = await laravelApi.getPublicationById(idOrSlug);
      setArticle(data);

      if (data.category) {
        await fetchRelatedArticles(data.category, data.id);
      } else {
        setRelatedArticles([]);
      }

      setError(null);
    } catch (err) {
      setError('Failed to load article. Please try again later.');
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (category: string, currentId: number) => {
    try {
      const data = await laravelApi.getPublications({ category, per_page: 10 });
      const related = (data ?? [])
        .filter((p) => (p.type ?? 'article') === 'article')
        .filter((p) => p.id !== currentId)
        .slice(0, 3);

      setRelatedArticles(related);
    } catch (err) {
      console.error('Error fetching related articles:', err);
      setRelatedArticles([]);
    }
  };

  const formatDate = (p: Article) => {
    const dateString = p.published_at ?? p.published_date ?? p.created_at ?? undefined;
    if (!dateString) return '';

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = () => {
    if (!article) return;

    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.description ?? '',
          url: window.location.href,
        })
        .catch((err) => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isFree = article?.is_free === true || (article?.is_free as unknown as number) === 1;

  const pdfUrl = useMemo(() => {
    if (!article) return null;
    if ((article.type ?? 'article') !== 'pdf') return null;
    return article.pdf_path ?? (Array.isArray(article.files) ? article.files[0] : null) ?? null;
  }, [article]);

  const coverImage = article?.cover_image ?? null;
  const isPdf = (article?.type ?? 'article') === 'pdf';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Article Not Found</h2>
          <p className="text-gray-500 mb-8">{error ?? 'This article does not exist or has been removed.'}</p>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
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
        description={article.description || ''}
        keywords={`${article.category || ''}, agriculture, farming, ${article.title}`}
        image={coverImage ?? undefined}
      />

      <style>
        {`
          @media print {
            @page {
              margin: 18mm;
            }

            .no-print,
            .no-print * {
              display: none !important;
            }

            .print-content {
              display: block !important;
            }

            .print-content,
            .print-content * {
              visibility: visible !important;
            }

            body {
              background: #ffffff !important;
              color: #000000 !important;
            }

            .print-article-shell {
              max-width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            .print-cover-image {
              margin-bottom: 24px !important;
              break-inside: avoid;
            }

            .print-markdown,
            .print-markdown * {
              color: #111827 !important;
            }

            .print-markdown a {
              text-decoration: underline !important;
            }

            .print-section {
              break-inside: avoid;
            }
          }
        `}
      </style>

      <div className="bg-white min-h-screen">
        <div className="bg-gray-50 border-b border-gray-200 py-3 px-4 no-print">
          <div className="container mx-auto max-w-4xl flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium"
            >
              <FaArrowLeft className="text-xs" />
              Back to Articles
            </Link>

            {isPdf ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full">
                <FaFilePdf /> PDF Publication
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
                Article
              </span>
            )}
          </div>
        </div>

        <article className="print-content">
          <div className="container mx-auto max-w-4xl px-4 pt-10 pb-6 print-article-shell">
            {article.category && (
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3 print-section">
                <FaTag className="text-[10px]" />
                {article.category}
              </div>
            )}

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200 print-section">
              {(article.published_at || article.published_date || article.created_at) && (
                <div className="flex items-center gap-1.5">
                  <FaCalendar className="text-emerald-500 text-xs" />
                  <span>{formatDate(article)}</span>
                </div>
              )}

              {article.written_by && (
                <div className="flex items-center gap-1.5">
                  <FaUser className="text-emerald-500 text-xs" />
                  <span>Written by {article.written_by}</span>
                </div>
              )}

              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isFree
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {isFree ? '✓ Free' : '★ Premium'}
              </span>

              <div className="flex items-center gap-3 ml-auto no-print">
                {!isPdf && isFree && (
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium"
                  >
                    <FaPrint className="text-xs" /> Print
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium"
                >
                  <FaShareAlt className="text-xs" /> Share
                </button>

                {pdfUrl && isFree && (
                  <a
                    href={pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    <FaDownload className="text-xs" /> Download PDF
                  </a>
                )}
              </div>
            </div>
          </div>

          {coverImage && (
            <div className="container mx-auto max-w-4xl px-4 mb-8 print-cover-image">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-100">
                <img
                  src={coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="container mx-auto max-w-4xl px-4 pb-16 print-article-shell">
            {isPdf ? (
              <div className="space-y-6">
                {pdfUrl && isFree ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden no-print">
                    <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-200 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                          <FaFilePdf className="text-red-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{article.title}</div>
                          <div className="text-xs text-gray-400">PDF Document</div>
                        </div>
                      </div>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        <FaExternalLinkAlt className="text-[10px]" /> Open in new tab
                      </a>
                    </div>

                    <object
                      data={pdfUrl}
                      type="application/pdf"
                      className="w-full"
                      style={{ height: '80vh' }}
                    >
                      <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
                        <FaFilePdf className="text-5xl text-red-400" />
                        <p className="text-gray-600 font-medium">
                          Your browser cannot display the PDF inline.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm"
                          >
                            <FaExternalLinkAlt className="text-xs" /> Open PDF
                          </a>
                          <a
                            href={pdfUrl}
                            download
                            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
                          >
                            <FaDownload className="text-xs" /> Download
                          </a>
                        </div>
                      </div>
                    </object>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 text-center no-print">
                    <FaFilePdf className="text-5xl text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Publication</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-xl mx-auto">
                      This PDF publication is not available for direct preview or download online.
                      Contact us to request access or learn more.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Contact Us <FaArrowRight />
                    </Link>
                  </div>
                )}

                {article.description && (
                  <p className="text-gray-600 leading-relaxed text-base whitespace-pre-wrap">
                    {article.description}
                  </p>
                )}
              </div>
            ) : isFree ? (
              <>
                <div
                  className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-ul:text-gray-700 prose-ol:text-gray-700
                  prose-li:my-1
                  prose-blockquote:border-emerald-400 prose-blockquote:text-gray-600
                  prose-img:rounded-xl prose-img:shadow-md print-markdown"
                >
                  {article.content ? (
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  ) : article.description ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                      {article.description}
                    </p>
                  ) : (
                    <p className="text-gray-400 italic">No content available.</p>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500 print-section">
                  <p>
                    © 2026 FaCT Ltd. All rights reserved. Articles, publications, images, and other website content may not be copied, reproduced, or redistributed without prior written permission, except where expressly stated.
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                {article.description && (
                  <div className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                    {article.description}
                  </div>
                )}

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 text-center no-print">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Article</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-xl mx-auto">
                    This article is part of our premium knowledge resources. Contact us to request access
                    or learn more about obtaining the full publication.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Contact Us <FaArrowRight />
                  </Link>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500 print-section">
                  <p>
                    © 2026 FaCT Ltd. All rights reserved. Articles, publications, images, and other website content may not be copied, reproduced, or redistributed without prior written permission, except where expressly stated.
                  </p>
                </div>
              </div>
            )}
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className="py-16 px-4 bg-gray-50 border-t border-gray-200 no-print">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Related Articles</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/articles/${related.slug || related.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all border border-gray-100 hover:border-emerald-200"
                  >
                    {related.cover_image ? (
                      <div className="h-44 overflow-hidden bg-gray-100">
                        <img
                          src={related.cover_image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-44 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
                        <span className="text-4xl">🌱</span>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      {related.description && (
                        <p className="text-gray-500 text-sm line-clamp-2">{related.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ArticleDetail;
