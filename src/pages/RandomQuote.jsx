
import { useState, useEffect } from 'react';

export default function RandomQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quoteHistory, setQuoteHistory] = useState([]);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) throw new Error('Failed to fetch quote');
      const data = await response.json();
      setQuote(data);
      setQuoteHistory(prev => [data, ...prev].slice(0, 5)); // Keep last 5 quotes
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !quote) {
    return (
      <div className="page-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading inspiration...</p>
        </div>
      </div>
    );
  }

  if (error && !quote) {
    return (
      <div className="page-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="content-card max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={fetchRandomQuote} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Random Quotes
          </h1>
          <p className="text-xl text-gray-600">
            Get inspired with wisdom from around the world
          </p>
        </div>

        {quote && (
          <div className="content-card mb-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="text-6xl text-purple-300 mb-4">"</div>
            <blockquote className="text-2xl font-medium text-gray-800 mb-6 italic">
              {quote.quote}
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-px bg-purple-300 mr-4"></div>
              <cite className="text-lg text-purple-600 font-semibold not-italic">
                {quote.author}
              </cite>
              <div className="w-12 h-px bg-purple-300 ml-4"></div>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <button 
            onClick={fetchRandomQuote} 
            className="btn-primary bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get New Quote'}
          </button>
        </div>

        {quoteHistory.length > 1 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Recent Quotes
            </h3>
            <div className="space-y-4">
              {quoteHistory.slice(1).map((historyQuote, index) => (
                <div key={index} className="content-card bg-gray-50">
                  <blockquote className="text-lg text-gray-700 mb-3 italic">
                    "{historyQuote.quote}"
                  </blockquote>
                  <cite className="text-purple-600 font-medium not-italic">
                    — {historyQuote.author}
                  </cite>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
