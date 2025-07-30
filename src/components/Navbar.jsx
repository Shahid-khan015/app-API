
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/crypto', label: 'Crypto Prices' },
    { path: '/quotes', label: 'Random Quotes' },
    { path: '/universities', label: 'Universities' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            API Explorer
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <a
            href="https://job-sprint-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Job Finder 🚀
          </a>
        </div>
      </div>
    </nav>
  );
}
