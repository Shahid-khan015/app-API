
import { useState, useEffect } from 'react';

export default function CryptoPrices() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.coinlore.net/api/tickers/');
      if (!response.ok) throw new Error('Failed to fetch crypto data');
      const data = await response.json();
      setCryptos(data.data.slice(0, 20)); // Show top 20
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading crypto data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="max-w-7xl mx-auto text-center">
          <div className="content-card max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={fetchCryptoData} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Cryptocurrency Prices
          </h1>
          <p className="text-xl text-gray-600">
            Real-time crypto market data powered by CoinLore API
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cryptos.map((crypto) => (
            <div key={crypto.id} className="content-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {crypto.name}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {crypto.symbol}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-gray-800">
                    ${parseFloat(crypto.price_usd).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Change:</span>
                  <span className={`font-semibold ${
                    parseFloat(crypto.percent_change_24h) >= 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {crypto.percent_change_24h}%
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-semibold text-gray-800">
                    ${parseInt(crypto.market_cap_usd).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button onClick={fetchCryptoData} className="btn-secondary">
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
