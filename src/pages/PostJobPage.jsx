import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, IndianRupee, FileText, ListChecks, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PostJobPage.css';

const PostJobPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    responsibilities: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to save job to database
    console.log('Submitting new job:', formData);
    
    // Convert comma-separated string to arrays for the mock data format
    const newJob = {
      ...formData,
      id: Date.now().toString(),
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      postedAt: 'Just now',
      featured: false
    };
    
    console.log('Processed Job Data to send to DB:', newJob);
    
    // Show success state
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="post-job-page container py-12 flex-col items-center justify-center min-h-[70vh]">
        <div className="glass p-12 rounded-xl text-center max-w-[600px] animate-fade-in">
          <CheckCircle size={80} className="text-success mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Job Posted Successfully!</h1>
          <p className="text-muted mb-8 text-lg">
            Your job listing for <strong>{formData.title}</strong> at <strong>{formData.company}</strong> has been successfully published.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Post Another Job</button>
            <Link to="/" className="btn btn-primary">Go to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-job-page bg-grid">
      <div className="container py-12 max-w-[800px]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Post a New Job</h1>
          <p className="text-muted text-lg">Reach thousands of talented professionals looking for their next opportunity.</p>
        </div>

        <div className="glass p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="flex-col gap-6">
            
            <section className="form-section">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2">
                <Briefcase size={20} className="text-primary"/> Job Details
              </h2>
              
              <div className="form-group mb-4">
                <label htmlFor="title">Job Title *</label>
                <input type="text" id="title" name="title" className="input" placeholder="e.g. Senior React Developer" required value={formData.title} onChange={handleChange} />
              </div>

              <div className="form-row flex gap-4 mb-4">
                <div className="form-group flex-1">
                  <label htmlFor="type">Job Type *</label>
                  <select id="type" name="type" className="input" value={formData.type} onChange={handleChange}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="salary">Salary Range</label>
                  <div className="input-with-icon">
                    <IndianRupee size={18} className="input-icon" />
                    <input type="text" id="salary" name="salary" className="input pl-10" placeholder="e.g. ₹20,00,000 - ₹30,00,000" value={formData.salary} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </section>

            <section className="form-section mt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2">
                <Building2 size={20} className="text-primary"/> Company Information
              </h2>
              
              <div className="form-row flex gap-4 mb-4">
                <div className="form-group flex-1">
                  <label htmlFor="company">Company Name *</label>
                  <input type="text" id="company" name="company" className="input" placeholder="e.g. Acme Corp" required value={formData.company} onChange={handleChange} />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="location">Location *</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="input-icon" />
                    <input type="text" id="location" name="location" className="input pl-10" placeholder="e.g. Mumbai, Remote" required value={formData.location} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </section>

            <section className="form-section mt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2">
                <FileText size={20} className="text-primary"/> Job Description
              </h2>
              
              <div className="form-group mb-4">
                <label htmlFor="description">Full Description *</label>
                <textarea id="description" name="description" className="input textarea min-h-[150px]" placeholder="Describe the role, the team, and what the candidate will be doing..." required value={formData.description} onChange={handleChange}></textarea>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="requirements">Requirements (One per line) *</label>
                <div className="relative">
                  <ListChecks size={18} className="absolute top-3 left-3 text-muted" />
                  <textarea id="requirements" name="requirements" className="input textarea min-h-[100px] pl-10" placeholder="5+ years of React experience&#10;Strong understanding of CSS&#10;Excellent communication skills" required value={formData.requirements} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="responsibilities">Responsibilities (One per line) *</label>
                <textarea id="responsibilities" name="responsibilities" className="input textarea min-h-[100px]" placeholder="Build amazing user interfaces&#10;Collaborate with backend engineers&#10;Mentor junior developers" required value={formData.responsibilities} onChange={handleChange}></textarea>
              </div>
            </section>

            <div className="form-actions mt-8 pt-6 border-t flex justify-end gap-4">
              <Link to="/" className="btn btn-outline">Cancel</Link>
              <button type="submit" className="btn btn-primary px-8">Publish Job</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
