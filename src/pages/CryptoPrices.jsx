
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

export default function CryptoPrices() {
  const [cryptoData, setCryptoData] = useState([]);
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
      setCryptoData(data.data.slice(0, 20)); // Show top 20
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  const formatPercentage = (percent) => {
    const num = parseFloat(percent);
    return (
      <span className={num >= 0 ? 'text-success' : 'text-danger'}>
        {num >= 0 ? '+' : ''}{num.toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="page-container">
      <Container>
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold text-dark mb-3">
            Cryptocurrency Prices
          </h1>
          <p className="lead text-muted">
            Real-time cryptocurrency market data
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Error!</Alert.Heading>
            <p>{error}</p>
            <Button variant="outline-danger" onClick={fetchCryptoData}>
              Try Again
            </Button>
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading cryptocurrency data...</p>
          </div>
        ) : (
          <>
            <Row className="g-3">
              {cryptoData.map((crypto) => (
                <Col key={crypto.id} md={6} lg={4}>
                  <Card className="crypto-card h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <Card.Title className="h6 fw-bold text-dark">
                            {crypto.name}
                          </Card.Title>
                          <small className="text-muted">{crypto.symbol}</small>
                        </div>
                        <small className="text-muted">#{crypto.rank}</small>
                      </div>
                      
                      <div className="mb-2">
                        <div className="fw-semibold text-primary">
                          {formatPrice(crypto.price_usd)}
                        </div>
                      </div>
                      
                      <Row className="g-2">
                        <Col xs={6}>
                          <small className="text-muted d-block">24h Change</small>
                          <div className="fw-medium">
                            {formatPercentage(crypto.percent_change_24h)}
                          </div>
                        </Col>
                        <Col xs={6}>
                          <small className="text-muted d-block">Market Cap</small>
                          <div className="fw-medium">
                            ${parseFloat(crypto.market_cap_usd).toLocaleString('en-US', {
                              notation: 'compact',
                              maximumFractionDigits: 2
                            })}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="text-center mt-4">
              <Button variant="secondary" onClick={fetchCryptoData} className="btn-secondary-custom">
                Refresh Data
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
