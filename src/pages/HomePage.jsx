
import { Link } from 'react-router-dom';

export default function HomePage() {
  const navigationCards = [
    {
      title: 'Crypto Prices',
      description: 'View real-time cryptocurrency prices and market data',
      path: '/crypto',
      icon: '₿',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Random Quotes',
      description: 'Get inspired with random quotes from various authors',
      path: '/quotes',
      icon: '💭',
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'Universities',
      description: 'Search and explore universities from around the world',
      path: '/universities',
      icon: '🎓',
      color: 'from-green-400 to-blue-500'
    }
  ];

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to API Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and explore various public APIs through our beautiful, responsive interface
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {navigationCards.map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className="nav-card p-8 text-center group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <div className="content-card inline-block">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Looking for a Job?
            </h3>
            <p className="text-gray-600 mb-4">
              Check out our external job finder application
            </p>
            <a
              href="https://job-sprint-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              Visit Job Finder
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
