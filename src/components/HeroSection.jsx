import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import './HeroSection.css';

const HeroSection = ({ onSearch }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ title, location });
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="container hero-content flex-col items-center justify-center animate-fade-in">
        <span className="hero-badge">Over 10,000+ jobs available</span>
        <h1 className="hero-title">Find Your Dream Job Today</h1>
        <p className="hero-subtitle">
          Discover opportunities that match your skills, interests, and career goals.
        </p>

        <div className="search-container glass">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Job title, keyword, or company"
                className="search-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="search-divider"></div>
            
            <div className="search-input-group">
              <MapPin className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Location (e.g. Delhi, Remote)"
                className="search-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn btn-primary search-btn">
              Search Jobs
            </button>
          </form>
        </div>

        <div className="trending-searches">
          <span className="text-muted text-sm">Trending:</span>
          <div className="trending-tags flex gap-2">
            {['React', 'Node.js', 'Remote', 'Designer'].map(tag => (
              <span key={tag} className="tag" onClick={() => {setTitle(tag); onSearch({title: tag, location})}}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
