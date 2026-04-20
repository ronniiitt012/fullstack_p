import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle, Loader2 } from 'lucide-react';
import './ApplyForm.css';

const ApplyForm = ({ jobTitle, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setUploadError('Please select a resume file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      // Send the file directly to our Vercel API route
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-filename': selectedFile.name,
        },
        body: selectedFile,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const blob = await response.json();
      
      console.log('Resume successfully uploaded to Vercel Blob:', blob.url);
      console.log('Applicant Data:', { ...formData, resumeUrl: blob.url });
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'An error occurred while uploading. Please ensure you have configured Vercel Blob.');
    } finally {
      setIsUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="modal-overlay glass flex justify-center items-center">
        <div className="modal-content success-content animate-fade-in text-center">
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
          <CheckCircle size={64} className="text-success mx-auto mb-4" />
          <h2 className="mb-2">Application Submitted!</h2>
          <p className="text-muted mb-6">Your resume has been securely stored and your application for {jobTitle} has been sent.</p>
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
            <div 
              className={`file-upload-box flex-col items-center justify-center gap-2 ${selectedFile ? 'file-selected' : ''}`}
              onClick={() => fileInputRef.current.click()}
            >
              <Upload size={24} className="text-primary" />
              <span className="text-sm font-medium">
                {selectedFile ? selectedFile.name : 'Click to select resume'}
              </span>
              <span className="text-xs text-muted">PDF, DOCX up to 5MB</span>
              <input 
                type="file" 
                className="file-input" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
            </div>
            {uploadError && <p className="text-xs text-danger mt-1" style={{ color: 'var(--color-secondary)' }}>{uploadError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter (Optional)</label>
            <textarea id="coverLetter" name="coverLetter" className="input textarea" rows="4" value={formData.coverLetter} onChange={handleChange}></textarea>
          </div>

          <div className="modal-footer mt-4 flex justify-end gap-4">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={isUploading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" style={{ animation: 'spin 1s linear infinite' }} />
                  Uploading...
                </>
              ) : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
