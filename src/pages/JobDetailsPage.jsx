import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, Clock, IndianRupee, Briefcase, Calendar } from 'lucide-react';
import { jobs } from '../data/jobs';
import ApplyForm from '../components/ApplyForm';
import './JobDetailsPage.css';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    const foundJob = jobs.find(j => j.id === id);
    setJob(foundJob);
  }, [id]);

  if (!job) {
    return (
      <div className="container flex-col items-center justify-center min-h-[60vh]">
        <h2>Job not found</h2>
        <Link to="/" className="btn btn-primary mt-4">Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="job-details-page bg-grid">
      <div className="container py-12">
        <Link to="/" className="back-link flex items-center gap-2 mb-8">
          <ArrowLeft size={20} /> Back to all jobs
        </Link>

        <div className="job-header glass p-8 rounded-xl mb-8 flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="job-header-info">
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="job-meta-item flex items-center gap-2">
                <Building2 size={18} className="text-primary" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="job-meta-item flex items-center gap-2">
                <MapPin size={18} className="text-muted" />
                <span>{job.location}</span>
              </div>
              <div className="job-meta-item flex items-center gap-2">
                <Briefcase size={18} className="text-muted" />
                <span>{job.type}</span>
              </div>
              <div className="job-meta-item flex items-center gap-2">
                <Calendar size={18} className="text-muted" />
                <span>Posted {job.postedAt}</span>
              </div>
            </div>
          </div>

          <div className="job-header-actions flex-col items-end gap-4 min-w-[200px]">
            {job.salary && (
              <div className="salary-badge flex items-center gap-2">
                <IndianRupee size={18} />
                <span className="font-bold">{job.salary}</span>
              </div>
            )}
            <button className="btn btn-primary w-full text-lg" onClick={() => setShowApplyModal(true)}>
              Apply Now
            </button>
          </div>
        </div>

        <div className="job-content grid md:grid-cols-3 gap-8">
          <div className="main-content md:col-span-2 flex-col gap-8">
            <section className="content-section">
              <h2 className="section-title">Job Description</h2>
              <p className="text-lg leading-relaxed">{job.description}</p>
            </section>

            <section className="content-section">
              <h2 className="section-title">Requirements</h2>
              <ul className="custom-list">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>

            <section className="content-section">
              <h2 className="section-title">Responsibilities</h2>
              <ul className="custom-list">
                {job.responsibilities.map((res, index) => (
                  <li key={index}>{res}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="sidebar">
            <div className="glass p-6 rounded-lg sticky top-24">
              <h3 className="mb-4 border-b pb-2">About the Company</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="company-logo-placeholder flex items-center justify-center bg-primary-light text-primary rounded-md font-bold text-xl">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{job.company}</h4>
                  <a href="#" className="text-primary text-sm hover:underline">View company profile</a>
                </div>
              </div>
              <p className="text-sm text-muted">
                {job.company} is a leading tech company committed to building innovative solutions that change the world. Join us on our mission to empower people through technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <ApplyForm jobTitle={job.title} onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
};

export default JobDetailsPage;
