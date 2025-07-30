
import { useState, useEffect } from 'react';

export default function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('United States');
  const [searchInput, setSearchInput] = useState('United States');

  const popularCountries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'Japan', 'China', 'India', 'Brazil'
  ];

  useEffect(() => {
    if (country) {
      fetchUniversities(country);
    }
  }, [country]);

  const fetchUniversities = async (countryName) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${encodeURIComponent(countryName)}`
      );
      if (!response.ok) throw new Error('Failed to fetch universities');
      const data = await response.json();
      setUniversities(data.slice(0, 50)); // Limit to 50 results
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCountry(searchInput.trim());
    }
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            University Explorer
          </h1>
          <p className="text-xl text-gray-600">
            Discover universities from around the world
          </p>
        </div>

        {/* Search Section */}
        <div className="content-card mb-8 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Search by Country
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="country"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter country name..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>

          {/* Popular Countries */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Popular countries:</p>
            <div className="flex flex-wrap gap-2">
              {popularCountries.map((countryName) => (
                <button
                  key={countryName}
                  onClick={() => {
                    setSearchInput(countryName);
                    setCountry(countryName);
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    country === countryName
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {countryName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-600">Searching universities...</p>
          </div>
        )}

        {error && (
          <div className="content-card max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={() => fetchUniversities(country)} className="btn-primary">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && universities.length > 0 && (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Found {universities.length} universities in {country}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {universities.map((university, index) => (
                <div key={index} className="content-card">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {university.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">🌍</span>
                      <span className="text-gray-700">{university.country}</span>
                    </div>
                    
                    {university.state_province && (
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">📍</span>
                        <span className="text-gray-700">{university.state_province}</span>
                      </div>
                    )}
                    
                    {university.domains && university.domains.length > 0 && (
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">🌐</span>
                        <span className="text-gray-700">{university.domains[0]}</span>
                      </div>
                    )}
                  </div>

                  {university.web_pages && university.web_pages.length > 0 && (
                    <div className="mt-4">
                      <a
                        href={university.web_pages[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm w-full text-center inline-block"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && universities.length === 0 && country && (
          <div className="content-card max-w-md mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No Universities Found
            </h2>
            <p className="text-gray-600">
              No universities found for "{country}". Try searching for a different country.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
