
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CryptoPrices from './pages/CryptoPrices';
import RandomQuote from './pages/RandomQuote';
import UniversityList from './pages/UniversityList';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crypto" element={<CryptoPrices />} />
          <Route path="/quotes" element={<RandomQuote />} />
          <Route path="/universities" element={<UniversityList />} />
        </Routes>
      </div>
    </Router>
  );
}
