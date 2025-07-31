
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
  Badge,
} from "react-bootstrap";

export default function CovidStats() {
  const [covidData, setCovidData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchCovidData();
  }, []);

  useEffect(() => {
    if (searchInput.trim()) {
      const filtered = covidData.filter(country =>
        country.country.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(covidData);
    }
  }, [searchInput, covidData]);

  const fetchCovidData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://disease.sh/v3/covid-19/countries');

      if (!response.ok)
        throw new Error(`Failed to fetch COVID data: ${response.status}`);

      const data = await response.json();
      setCovidData(data);
      setFilteredData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const getSeverityColor = (cases, population) => {
    const rate = (cases / population) * 100;
    if (rate > 10) return 'danger';
    if (rate > 5) return 'warning';
    return 'success';
  };

  return (
    <div className="page-container">
      <Container>
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold text-dark mb-3">
            Global COVID-19 Statistics
          </h1>
          <p className="lead text-muted">
            Real-time COVID-19 data from countries around the world
          </p>
        </div>

        <Card className="content-card mb-4">
          <Card.Body>
            <Form>
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
                    variant="primary"
                    className="btn-primary-custom w-100 mb-3"
                    onClick={fetchCovidData}
                    disabled={loading}
                  >
                    {loading ? "Refreshing..." : "Refresh Data"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading COVID-19 statistics...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">
            <Alert.Heading>Error!</Alert.Heading>
            <p>{error}</p>
            <Button
              variant="outline-danger"
              onClick={fetchCovidData}
            >
              Try Again
            </Button>
          </Alert>
        ) : (
          <>
            <div className="mb-3">
              <small className="text-muted">
                Showing {filteredData.length} of {covidData.length} countries
              </small>
            </div>
            <Row className="g-3">
              {filteredData.map((country, index) => (
                <Col key={index} md={6} lg={4}>
                  <Card className="content-card h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                          {country.countryInfo?.flag && (
                            <img
                              src={country.countryInfo.flag}
                              alt={`${country.country} flag`}
                              width="24"
                              height="16"
                              className="me-2"
                            />
                          )}
                          <Card.Title className="h6 fw-bold text-dark mb-0">
                            {country.country}
                          </Card.Title>
                        </div>
                        <Badge 
                          bg={getSeverityColor(country.cases, country.population)}
                          className="ms-2"
                        >
                          {((country.cases / country.population) * 100).toFixed(2)}%
                        </Badge>
                      </div>

                      <Row className="g-2">
                        <Col xs={6}>
                          <div className="mb-2">
                            <small className="text-muted d-block">Total Cases</small>
                            <span className="fw-bold text-primary">
                              {formatNumber(country.cases)}
                            </span>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="mb-2">
                            <small className="text-muted d-block">Deaths</small>
                            <span className="fw-bold text-danger">
                              {formatNumber(country.deaths)}
                            </span>
                          </div>
                        </Col>
                      </Row>

                      <Row className="g-2">
                        <Col xs={6}>
                          <div className="mb-2">
                            <small className="text-muted d-block">Recovered</small>
                            <span className="fw-bold text-success">
                              {formatNumber(country.recovered)}
                            </span>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="mb-2">
                            <small className="text-muted d-block">Active</small>
                            <span className="fw-bold text-warning">
                              {formatNumber(country.active)}
                            </span>
                          </div>
                        </Col>
                      </Row>

                      <Row className="g-2">
                        <Col xs={6}>
                          <div className="mb-2">
                            <small className="text-muted d-block">Today Cases</small>
                            <span className="fw-medium text-info">
                              +{formatNumber(country.todayCases)}
                            </span>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="mb-2">
                            <small className="text-muted d-block">Today Deaths</small>
                            <span className="fw-medium text-danger">
                              +{formatNumber(country.todayDeaths)}
                            </span>
                          </div>
                        </Col>
                      </Row>

                      <div className="mt-3 pt-2 border-top">
                        <small className="text-muted d-block">Population</small>
                        <span className="fw-medium">
                          {formatNumber(country.population)}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
