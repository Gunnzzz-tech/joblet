import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { MapPin, Briefcase, Building2, Calendar, ExternalLink } from 'lucide-react';
import { JobFeedService, XmlJob } from '../lib/jobFeed';
import { useAuth } from '../lib/auth-context';
import AuthModal from './AuthModal';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [job, setJob] = useState<XmlJob | null>(location.state?.job || null);
  const [loading, setLoading] = useState(!location.state?.job);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      if (job) return; // Already have job from state
      
      setLoading(true);
      try {
        const jobs = await JobFeedService.fetchJobs();
        const foundJob = jobs.find(j => j.id === id);
        if (foundJob) {
          setJob(foundJob);
        }
      } catch (error) {
        console.error('Failed to fetch job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = () => {
    if (!job?.applyUrl) return;
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    // Open external apply URL
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Link to="/jobs" className="btn btn-primary">
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link to="/jobs" className="inline-flex items-center text-accent hover:underline mb-6">
          ← Back to Jobs
        </Link>

        {/* Header Card */}
        <div className="card mb-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary mb-2">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-secondary mb-4">
                <div className="flex items-center gap-1">
                  <Building2 className="h-5 w-5" />
                  <span className="font-medium">{job.company}</span>
                </div>
                {job.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-5 w-5" />
                    <span>{job.location}</span>
                  </div>
                )}
                {job.type && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-5 w-5" />
                    <span>{job.type}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {job.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Posted: {formatDate(job.date)}</span>
                  </div>
                )}
                {job.modifiedDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated: {formatDate(job.modifiedDate)}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button onClick={handleApply} className="btn btn-primary px-8 flex items-center gap-2">
                Apply Now
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Details */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Job Details</h3>
              <div className="space-y-3 text-sm">
                {job.company && (
                  <div>
                    <span className="font-medium text-gray-700">Company:</span>
                    <span className="ml-2 text-gray-600">{job.company}</span>
                  </div>
                )}
                {job.category && (
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-600">{job.category}</span>
                  </div>
                )}
                {job.type && (
                  <div>
                    <span className="font-medium text-gray-700">Employment Type:</span>
                    <span className="ml-2 text-gray-600">{job.type}</span>
                  </div>
                )}
                {job.city && (
                  <div>
                    <span className="font-medium text-gray-700">City:</span>
                    <span className="ml-2 text-gray-600">{job.city}</span>
                  </div>
                )}
                {job.state && (
                  <div>
                    <span className="font-medium text-gray-700">State:</span>
                    <span className="ml-2 text-gray-600">{job.state}</span>
                  </div>
                )}
                {job.country && (
                  <div>
                    <span className="font-medium text-gray-700">Country:</span>
                    <span className="ml-2 text-gray-600">{job.country}</span>
                  </div>
                )}
                {job.postalCode && (
                  <div>
                    <span className="font-medium text-gray-700">Postal Code:</span>
                    <span className="ml-2 text-gray-600">{job.postalCode}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {job.category && (
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded">
                    {job.category}
                  </span>
                )}
                {job.type && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    {job.type}
                  </span>
                )}
              </div>
            </div>

            {/* Apply Button */}
            <button onClick={handleApply} className="btn btn-primary w-full flex items-center justify-center gap-2">
              Apply on External Site
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="register"
        />
      </div>
    </div>
  );
}
