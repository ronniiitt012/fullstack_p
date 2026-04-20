import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'glass scrolled' : ''}`}>
      <div className="container flex justify-between items-center navbar-inner">
        <Link to="/" className="navbar-logo flex items-center gap-2">
          <div className="logo-icon-bg">
            <Briefcase size={24} className="logo-icon" />
          </div>
          <span className="logo-text">Job<span className="text-primary">Portal</span></span>
        </Link>

        <div className="navbar-desktop-links flex items-center gap-6">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#jobs" className="nav-link">Jobs</a>
          <a href="#about" className="nav-link">About</a>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/post-job" className="btn btn-primary btn-sm">Post a Job</Link>
        </div>

        <div className="navbar-mobile-toggle">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu glass animate-fade-in">
          <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#jobs" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Jobs</a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <div className="mobile-nav-actions flex justify-between items-center mt-4">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              <span className="ml-2">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            <Link to="/post-job" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>Post Job</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
