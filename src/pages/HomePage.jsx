
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function HomePage() {
  const navigationCards = [
    {
      title: 'Crypto Prices',
      description: 'View real-time cryptocurrency prices and market data',
      path: '/crypto',
      icon: '₿',
      color: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
    },
    {
      title: 'Random Quotes',
      description: 'Get inspired with random quotes from various authors',
      path: '/quotes',
      icon: '💭',
      color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
    },
    {
      title: 'COVID-19 Stats',
      description: 'View global COVID-19 statistics and data by country',
      path: '/universities',
      icon: '🦠',
      color: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
    },
    {
      title: 'Job Finder',
      description: 'Find your next career opportunity with our job search platform',
      path: 'https://job-sprint-app.vercel.app/',
      icon: '🚀',
      color: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
      external: true
    }
  ];

  return (
    <div className="page-container">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-4">
            Welcome to API Explorer
          </h1>
          <p className="lead text-muted">
            Discover and explore various public APIs through our beautiful, responsive interface
          </p>
        </div>

        <Row className="g-4 mb-5">
          {navigationCards.map((card, index) => (
            <Col key={index} md={6} lg={4}>
              {card.external ? (
                <a 
                  href={card.path} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-decoration-none"
                >
                  <Card className="nav-card h-100 p-4 text-center">
                    <div 
                      className="gradient-icon"
                      style={{ background: card.color }}
                    >
                      {card.icon}
                    </div>
                    <Card.Body>
                      <Card.Title className="h5 fw-semibold text-dark mb-3">
                        {card.title}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {card.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              ) : (
                <Link to={card.path} className="text-decoration-none">
                  <Card className="nav-card h-100 p-4 text-center">
                    <div 
                      className="gradient-icon"
                      style={{ background: card.color }}
                    >
                      {card.icon}
                    </div>
                    <Card.Body>
                      <Card.Title className="h5 fw-semibold text-dark mb-3">
                        {card.title}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {card.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              )}
            </Col>
          ))}
        </Row>

        
      </Container>
    </div>
  );
}
