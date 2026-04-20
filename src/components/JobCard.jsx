import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import './JobCard.css';

const JobCard = ({ job }) => {
  return (
    <div className={`job-card ${job.featured ? 'featured' : ''}`}>
      <div className="job-card-header">
        <div>
          <h3 className="job-title">{job.title}</h3>
          <div className="job-company flex items-center gap-2 mt-1">
            <Building2 size={16} className="text-primary" />
            <span className="text-muted">{job.company}</span>
          </div>
        </div>
        {job.featured && <span className="badge badge-featured">Featured</span>}
      </div>

      <div className="job-card-body mt-4 flex-col gap-2">
        <div className="job-meta flex items-center gap-2">
          <MapPin size={16} className="text-muted" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="job-meta flex items-center gap-2">
          <Clock size={16} className="text-muted" />
          <span className="text-sm">{job.type} &bull; {job.postedAt}</span>
        </div>
        {job.salary && (
          <div className="job-meta flex items-center gap-2">
            <IndianRupee size={16} className="text-muted" />
            <span className="text-sm font-medium">{job.salary}</span>
          </div>
        )}
      </div>

      <div className="job-card-footer mt-6 flex justify-between items-center">
        <span className="job-type-badge">{job.type}</span>
        <Link to={`/job/${job.id}`} className="btn btn-outline btn-sm job-action-btn">
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
