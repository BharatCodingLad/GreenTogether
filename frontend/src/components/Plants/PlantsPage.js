import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import './PlantsPage.css';

// Import images
import monsteraImg from '../../images/81P480xAn9L.jpg';
import snakePlantImg from '../../images/41ZhVEdGAlL._AC_UF1000,1000_QL80_.jpg';
import peaceLilyImg from '../../images/peace-lily-01.jpg';
import orchidImg from '../../images/perennial-yes-yes-orchid-live-plant-original-plant-rare-plant-1-original-imagggzqmxzu4ujd.webp';
import fiddleLeafImg from '../../images/A5AC95D6-5A97-45C3-B890-5BEDCBB58AF8_800x.webp';
import lavenderImg from '../../images/360_F_167351986_76neuSGkLjNcovZwsBCAD1ZN5SDIxalv.jpg';
import aloeVeraImg from '../../images/Aloe-Vera-Website-Front.webp';
import succulentImg from '../../images/succulent-stockphoto.jpg';

const plants = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    price: 49.99,
    image: monsteraImg,
    category: 'Indoor',
    difficulty: 'Easy',
    light: 'Medium',
    description: 'A popular tropical plant known for its distinctive split leaves.',
    care: 'Water weekly, bright indirect light'
  },
  {
    id: 2,
    name: 'Snake Plant',
    price: 29.99,
    image: snakePlantImg,
    category: 'Indoor',
    difficulty: 'Very Easy',
    light: 'Low',
    description: 'A hardy plant perfect for beginners, known for its air-purifying qualities.',
    care: 'Water every 2-3 weeks, low to bright light'
  },
  {
    id: 3,
    name: 'Peace Lily',
    price: 39.99,
    image: peaceLilyImg,
    category: 'Indoor',
    difficulty: 'Easy',
    light: 'Medium',
    description: 'Elegant plant with glossy leaves and white flowers.',
    care: 'Keep soil moist, medium indirect light'
  },
  {
    id: 4,
    name: 'Aloe Vera',
    price: 19.99,
    image: aloeVeraImg,
    category: 'Indoor',
    difficulty: 'Easy',
    light: 'Bright',
    description: 'Medicinal succulent with thick, fleshy leaves.',
    care: 'Water sparingly, bright direct light'
  },
  {
    id: 5,
    name: 'Fiddle Leaf Fig',
    price: 59.99,
    image: fiddleLeafImg,
    category: 'Indoor',
    difficulty: 'Medium',
    light: 'Bright',
    description: 'Trendy plant with large, violin-shaped leaves.',
    care: 'Water when top soil is dry, bright indirect light'
  },
  {
    id: 6,
    name: 'Lavender',
    price: 24.99,
    image: lavenderImg,
    category: 'Outdoor',
    difficulty: 'Easy',
    light: 'Bright',
    description: 'Fragrant flowering plant perfect for gardens.',
    care: 'Well-draining soil, full sun'
  },
  {
    id: 7,
    name: 'Succulent Collection',
    price: 34.99,
    image: succulentImg,
    category: 'Indoor',
    difficulty: 'Very Easy',
    light: 'Bright',
    description: 'Set of 3 low-maintenance succulents.',
    care: 'Water sparingly, bright light'
  },
  {
    id: 8,
    name: 'Orchid',
    price: 44.99,
    image: orchidImg,
    category: 'Indoor',
    difficulty: 'Hard',
    light: 'Medium',
    description: 'Exotic flowering plant with delicate blooms.',
    care: 'High humidity, medium indirect light'
  }
];

function PlantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    light: 'all',
    priceRange: [0, 100]
  });

  const filteredPlants = plants
    .filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filters.category === 'all' || plant.category === filters.category;
      const matchesDifficulty = filters.difficulty === 'all' || plant.difficulty === filters.difficulty;
      const matchesLight = filters.light === 'all' || plant.light === filters.light;
      const matchesPrice = plant.price >= filters.priceRange[0] && plant.price <= filters.priceRange[1];

      return matchesSearch && matchesCategory && matchesDifficulty && matchesLight && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'difficulty':
          const difficultyOrder = { 'Very Easy': 0, 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

  const handleAddToCart = (plant) => {
    alert(`Added ${plant.name} to cart!`);
  };

  const handleViewDetails = (plant) => {
    alert(`Viewing details for ${plant.name}`);
    // TODO: Implement plant details view
  };

  return (
    <div className="plants-marketplace">
      <div className="plants-header">
        <h2>Plant Marketplace</h2>
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="header-controls">
          <div className="sort-dropdown">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="difficulty">Difficulty Level</option>
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
            Filters
          </button>
        </div>
      </div>

      <div className="plants-container">
        <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filter-section">
            <h3>Category</h3>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Difficulty</h3>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
            >
              <option value="all">All Levels</option>
              <option value="Very Easy">Very Easy</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Light Requirements</h3>
            <select
              value={filters.light}
              onChange={(e) => setFilters({...filters, light: e.target.value})}
            >
              <option value="all">All Light Levels</option>
              <option value="Low">Low Light</option>
              <option value="Medium">Medium Light</option>
              <option value="Bright">Bright Light</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <div className="price-inputs">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                  })}
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                  })}
                  placeholder="Max"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                })}
              />
            </div>
          </div>
        </div>

        <div className="plants-grid">
          {filteredPlants.map(plant => (
            <div key={plant.id} className="plant-card">
              <div className="plant-image">
                <img src={plant.image} alt={plant.name} />
              </div>
              <div className="plant-info">
                <h3>{plant.name}</h3>
                <p className="plant-description">{plant.description}</p>
                <div className="plant-details">
                  <span className="plant-care">{plant.care}</span>
                  <span className="plant-price">${plant.price.toFixed(2)}</span>
                </div>
                <div className="plant-actions">
                  <button 
                    className="view-details"
                    onClick={() => handleViewDetails(plant)}
                  >
                    View Details
                  </button>
                  <button 
                    className="add-to-cart"
                    onClick={() => handleAddToCart(plant)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlantsPage; 