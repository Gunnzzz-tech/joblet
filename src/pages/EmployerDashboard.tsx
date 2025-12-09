import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, Users, Eye } from 'lucide-react';
import { api, Job, Application } from '../lib/api';
import { useAuth } from '../lib/auth-context';
import { useNavigate } from 'react-router-dom';

export default function EmployerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'EMPLOYER') {
      navigate('/');
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch company jobs
      const jobsResponse = await api.getJobs();
      if (jobsResponse.success && jobsResponse.data) {
        const companyJobs = jobsResponse.data.jobs.filter(
          (job) => job.company?.id === user?.id // Simplified - should use companyId
        );
        setJobs(companyJobs);
        setStats({
          totalJobs: companyJobs.length,
          activeJobs: companyJobs.filter((j) => j.status === 'ACTIVE').length,
          totalApplications: 0, // Would need to fetch from applications endpoint
          pendingApplications: 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Employer Dashboard</h1>
          <p className="text-gray-600">Manage your job postings and applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
                <p className="text-2xl font-bold text-primary">{stats.totalJobs}</p>
              </div>
              <Briefcase className="h-8 w-8 text-accent" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
                <p className="text-2xl font-bold text-success">{stats.activeJobs}</p>
              </div>
              <Eye className="h-8 w-8 text-success" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                <p className="text-2xl font-bold text-primary">{stats.totalApplications}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingApplications}</p>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </button>
        </div>

        {/* Recent Jobs */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Your Job Postings</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
              <button className="btn btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Post Your First Job
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-1">{job.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{job.company?.name}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {job.status}
                        </span>
                        {job.isRemote && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            Remote
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-outline-primary text-sm">Edit</button>
                      <button className="btn btn-outline-primary text-sm">View Applications</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

