import { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';

export default function RandomQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3">
            Random Quotes
          </h1>
          <p className="lead text-muted">
            Get inspired with wisdom from around the world
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Error!</Alert.Heading>
            <p>{error}</p>
            <Button variant="outline-danger" onClick={fetchRandomQuote}>
              Try Again
            </Button>
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading inspirational quote...</p>
          </div>
        ) : quote ? (
          <div className="quote-container">
            <Card className="border-0 shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="display-1 text-primary mb-3">"</div>
                  <blockquote className="blockquote mb-4">
                    <p className="lead fw-normal text-dark">
                      {quote.quote}
                    </p>
                  </blockquote>
                  <footer className="blockquote-footer">
                    <cite className="fw-semibold text-primary fs-5">
                      {quote.author}
                    </cite>
                  </footer>
                </div>

                <div className="text-center">
                  <Button 
                    variant="primary" 
                    onClick={fetchRandomQuote}
                    className="btn-primary-custom"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Get New Quote'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ) : null}
      </Container>
    </div>
  );
}