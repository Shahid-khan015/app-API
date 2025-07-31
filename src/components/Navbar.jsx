
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function CustomNavbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/crypto', label: 'Crypto Prices' },
    { path: '/quotes', label: 'Random Quotes' },
    { path: '/universities', label: 'COVID-19 Cases' }
  ];

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3" style={{ color: '#2563eb' }}>
          API Explorer
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={`fw-medium ${location.pathname === item.path ? 'text-primary' : 'text-dark'}`}
                style={{ padding: '0.5rem 1rem' }}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          
          <Button
            variant="primary"
            href="https://job-sprint-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-custom"
          >
            Job Finder 🚀
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
