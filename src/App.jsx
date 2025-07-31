
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/HomePage';
import CryptoPrices from './pages/CryptoPrices';
import RandomQuote from './pages/RandomQuote';
import CovidStats from './pages/UniversityList';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #e0f2fe 100%)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crypto" element={<CryptoPrices />} />
          <Route path="/quotes" element={<RandomQuote />} />
          <Route path="/universities" element={<CovidStats />} />
        </Routes>
      </div>
    </Router>
  );
}
