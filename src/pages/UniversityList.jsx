import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";

export default function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("United States");
  const [searchInput, setSearchInput] = useState("United States");

  const popularCountries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "India",
    "Brazil",
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
        `https://corsproxy.io/?https://universities.hipolabs.com/search?country=${encodeURIComponent(countryName)}`,
      );

      if (!response.ok)
        throw new Error(`Failed to fetch universities: ${response.status}`);

      const data = await response.json();
      setUniversities(data.slice(0, 50));
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
      <Container>
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold text-dark mb-3">
            University Explorer
          </h1>
          <p className="lead text-muted">
            Discover universities from around the world
          </p>
        </div>

        <Card className="content-card mb-4">
          <Card.Body>
            <Form onSubmit={handleSearch}>
              <Row className="align-items-end">
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">
                      Search by Country
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Enter country name..."
                      className="form-control-lg"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn-primary-custom w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading universities...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">
            <Alert.Heading>Error!</Alert.Heading>
            <p>{error}</p>
            <Button
              variant="outline-danger"
              onClick={() => fetchUniversities(country)}
            >
              Try Again
            </Button>
          </Alert>
        ) : (
          <Row className="g-3">
            {universities.map((university, index) => (
              <Col key={index} md={6} lg={4}>
                <Card className="content-card h-100">
                  <Card.Body>
                    <Card.Title className="h6 fw-bold text-dark mb-2">
                      {university.name}
                    </Card.Title>
                    <div className="mb-2">
                      <small className="text-muted d-block">Country</small>
                      <span className="fw-medium">{university.country}</span>
                    </div>
                    {university["state-province"] && (
                      <div className="mb-2">
                        <small className="text-muted d-block">
                          State/Province
                        </small>
                        <span className="fw-medium">
                          {university["state-province"]}
                        </span>
                      </div>
                    )}
                    {university.domains && university.domains.length > 0 && (
                      <div className="mb-3">
                        <small className="text-muted d-block">Domain</small>
                        <code className="text-primary">
                          {university.domains[0]}
                        </code>
                      </div>
                    )}
                    {university.web_pages &&
                      university.web_pages.length > 0 && (
                        <div className="mt-auto">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            href={university.web_pages[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-100"
                          >
                            Visit Website →
                          </Button>
                        </div>
                      )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
