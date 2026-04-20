import React, { useState } from 'react';
import { X, Upload, CheckCircle } from 'lucide-react';
import './ApplyForm.css';

const ApplyForm = ({ jobTitle, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="modal-overlay glass flex justify-center items-center">
        <div className="modal-content success-content animate-fade-in text-center">
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
          <CheckCircle size={64} className="text-success mx-auto mb-4" />
          <h2 className="mb-2">Application Submitted!</h2>
          <p className="text-muted mb-6">Your application for {jobTitle} has been successfully sent.</p>
          <button className="btn btn-primary w-full" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay glass flex justify-center items-center">
      <div className="modal-content animate-fade-in">
        <div className="modal-header flex justify-between items-center mb-6">
          <h2>Apply for {jobTitle}</h2>
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input type="text" id="name" name="name" className="input" required value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group flex gap-4 form-row">
            <div className="flex-1">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" className="input" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="flex-1">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="input" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Resume *</label>
            <div className="file-upload-box flex-col items-center justify-center gap-2">
              <Upload size={24} className="text-primary" />
              <span className="text-sm">Click to upload or drag and drop</span>
              <span className="text-xs text-muted">PDF, DOCX up to 5MB</span>
              <input type="file" className="file-input" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter (Optional)</label>
            <textarea id="coverLetter" name="coverLetter" className="input textarea" rows="4" value={formData.coverLetter} onChange={handleChange}></textarea>
          </div>

          <div className="modal-footer mt-4 flex justify-end gap-4">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
