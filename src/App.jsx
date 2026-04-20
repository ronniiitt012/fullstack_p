import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import PostJobPage from './pages/PostJobPage';
import ApplicationsPage from './pages/ApplicationsPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/admin" element={<ApplicationsPage />} />
          </Routes>
        </main>
        
        <footer className="glass mt-12 py-8 text-center border-t border-border">
          <div className="container">
            <p className="text-muted">
              &copy; {new Date().getFullYear()} JobPortal. All rights reserved. Built with React.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
