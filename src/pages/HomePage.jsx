import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FilterPanel from '../components/FilterPanel';
import JobCard from '../components/JobCard';
import { jobs as initialJobs } from '../data/jobs';
import './HomePage.css';

const HomePage = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [searchQuery, setSearchQuery] = useState({ title: '', location: '' });
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    let result = jobs;

    // Filter by search query (title + location)
    if (searchQuery.title) {
      const lowerTitle = searchQuery.title.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(lowerTitle) ||
        job.company.toLowerCase().includes(lowerTitle)
      );
    }

    if (searchQuery.location) {
      const lowerLoc = searchQuery.location.toLowerCase();
      result = result.filter(job => 
        job.location.toLowerCase().includes(lowerLoc)
      );
    }

    // Filter by selected job types
    if (selectedTypes.length > 0) {
      result = result.filter(job => selectedTypes.includes(job.type));
    }

    setFilteredJobs(result);
  }, [searchQuery, selectedTypes, jobs]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Scroll to jobs section
    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <HeroSection onSearch={handleSearch} />
      
      <section id="jobs-section" className="container py-section">
        <div className="layout-grid">
          <div className="sidebar-container">
            <FilterPanel selectedTypes={selectedTypes} onTypeChange={setSelectedTypes} />
          </div>
          
          <div className="jobs-container">
            <div className="jobs-header flex justify-between items-center mb-6">
              <h2>Explore Jobs</h2>
              <span className="text-muted">{filteredJobs.length} results found</span>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="jobs-list flex-col gap-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="empty-state glass flex-col items-center justify-center text-center p-8">
                <div className="text-4xl mb-4">🔍</div>
                <h3>No jobs found</h3>
                <p className="text-muted mt-2">Try adjusting your search or filter criteria to find what you're looking for.</p>
                <button 
                  className="btn btn-outline mt-4"
                  onClick={() => {
                    setSearchQuery({ title: '', location: '' });
                    setSelectedTypes([]);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
