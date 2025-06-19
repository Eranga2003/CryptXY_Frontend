import React, { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";
import { format } from "date-fns";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=crypto&language=en&sortBy=publishedAt&pageSize=12&apiKey=3777180e4a714ed7bccfbdb5e4cede8f`
        );
        const data = await response.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* News headline ticker */}
      {!loading && news.length > 0 && (
        <div className="bg-blue-600 text-white py-4 mb-8 overflow-hidden">
  <div className="flex whitespace-nowrap animate-marquee gap-16 text-base md:text-lg font-semibold px-6">
    {[...news.slice(0, 10), ...news.slice(0, 10)].map((article, index) => (
      <span key={index} className="flex-shrink-0 max-w-[500px] truncate">
        📰 {article.title}
      </span>
    ))}
  </div>
</div>


      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Newspaper className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-extrabold text-gray-800">Crypto News Updates</h1>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 text-xl">Loading news...</div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={article.urlToImage || "/placeholder-news.jpg"}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.description || "No summary available."}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{format(new Date(article.publishedAt), "PPP p")}</span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-red-500 text-lg">No news available.</div>
        )}
      </div>
    </div>
  );
}
