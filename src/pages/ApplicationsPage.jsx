import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, User, Mail, Phone, Briefcase,
  FileText, Calendar, Download, RefreshCw, Inbox
} from 'lucide-react';
import './ApplicationsPage.css';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/applications');
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchApplications();
  }, []);

  const formatDate = (ts) =>
    new Date(ts).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

  return (
    <div className="applications-page bg-grid">
      <div className="container py-12">

        {/* Header */}
        <div className="app-page-header flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="back-link flex items-center gap-2 mb-3">
              <ArrowLeft size={18} /> Back to Jobs
            </Link>
            <h1 className="text-3xl font-bold">Applications Dashboard</h1>
            <p className="text-muted mt-1">All job applications submitted through the portal.</p>
          </div>
          <button className="btn btn-outline flex items-center gap-2" onClick={fetchApplications}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Stats bar */}
        <div className="stats-bar glass flex gap-6 p-4 rounded-lg mb-8">
          <div className="stat-item">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label text-muted">Total Applications</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">
              {applications.filter(a => a.resume_url).length}
            </span>
            <span className="stat-label text-muted">With Resume</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">
              {[...new Set(applications.map(a => a.job_title))].length}
            </span>
            <span className="stat-label text-muted">Unique Roles</span>
          </div>
        </div>

        {/* Content */}
        {loading && (
          <div className="state-box flex-col items-center justify-center gap-4">
            <div className="spinner"></div>
            <p className="text-muted">Loading applications...</p>
          </div>
        )}

        {error && (
          <div className="state-box glass flex-col items-center justify-center gap-4">
            <p className="text-muted">⚠️ {error}</p>
            <p className="text-xs text-muted">
              Make sure you've set up a Neon Postgres database and added <code>DATABASE_URL</code> to your Vercel environment variables.
            </p>
            <button className="btn btn-outline" onClick={fetchApplications}>Retry</button>
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="state-box glass flex-col items-center justify-center gap-4 text-center">
            <Inbox size={56} className="text-muted" />
            <h3>No applications yet</h3>
            <p className="text-muted">Applications will appear here once candidates start applying.</p>
          </div>
        )}

        {!loading && !error && applications.length > 0 && (
          <div className="applications-list flex-col gap-4">
            {applications.map((app) => (
              <div key={app.id} className="application-card">
                {/* Card Header */}
                <div
                  className="card-header flex justify-between items-start"
                  onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                >
                  <div className="applicant-info flex gap-4 items-center">
                    <div className="avatar">{app.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <h3 className="applicant-name">{app.name}</h3>
                      <div className="flex gap-4 flex-wrap mt-1">
                        <span className="meta-chip flex items-center gap-1">
                          <Mail size={13} /> {app.email}
                        </span>
                        {app.phone && (
                          <span className="meta-chip flex items-center gap-1">
                            <Phone size={13} /> {app.phone}
                          </span>
                        )}
                        {app.job_title && (
                          <span className="meta-chip meta-chip-primary flex items-center gap-1">
                            <Briefcase size={13} /> {app.job_title}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-col items-end gap-2 text-right">
                    <span className="meta-chip flex items-center gap-1">
                      <Calendar size={13} /> {formatDate(app.applied_at)}
                    </span>
                    <span className="expand-caret">{expanded === app.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Expanded details */}
                {expanded === app.id && (
                  <div className="card-body animate-fade-in">
                    <div className="detail-grid">
                      <div className="detail-row">
                        <span className="detail-label flex items-center gap-2">
                          <User size={15} className="text-primary" /> Full Name
                        </span>
                        <span className="detail-value">{app.name}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label flex items-center gap-2">
                          <Mail size={15} className="text-primary" /> Email
                        </span>
                        <a href={`mailto:${app.email}`} className="detail-value text-primary hover-underline">
                          {app.email}
                        </a>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label flex items-center gap-2">
                          <Phone size={15} className="text-primary" /> Phone
                        </span>
                        <a href={`tel:${app.phone}`} className="detail-value text-primary hover-underline">
                          {app.phone || '—'}
                        </a>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label flex items-center gap-2">
                          <Briefcase size={15} className="text-primary" /> Applied For
                        </span>
                        <span className="detail-value">{app.job_title || '—'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label flex items-center gap-2">
                          <Calendar size={15} className="text-primary" /> Applied At
                        </span>
                        <span className="detail-value">{formatDate(app.applied_at)}</span>
                      </div>
                    </div>

                    {app.cover_letter && (
                      <div className="cover-letter-box mt-4">
                        <h4 className="flex items-center gap-2 mb-2">
                          <FileText size={15} className="text-primary" /> Cover Letter
                        </h4>
                        <p className="text-sm">{app.cover_letter}</p>
                      </div>
                    )}

                    {app.resume_url && (
                      <div className="resume-row mt-4 flex items-center gap-4">
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary flex items-center gap-2"
                        >
                          <Download size={16} /> Download Resume
                        </a>
                        <span className="text-xs text-muted">Stored securely on Vercel Blob</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
