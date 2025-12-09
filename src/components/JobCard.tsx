import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Job } from '../lib/api';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = () => {
    const min = job.salaryMin?.toLocaleString() || 'N/A';
    const max = job.salaryMax?.toLocaleString() || 'N/A';
    const type = job.salaryType?.toLowerCase() || 'yearly';
    
    if (job.salaryMin && job.salaryMax) {
      return `$${min} - $${max}/${type === 'hourly' ? 'hr' : type === 'monthly' ? 'mo' : 'yr'}`;
    }
    return 'Salary not specified';
  };

  return (
    <Link
      to={`/jobs/${job.slug || job.id}`}
      className="card hover:shadow-lg transition-shadow duration-200 block"
    >
      <div className="flex items-start gap-4">
        {job.company?.logo && (
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-primary mb-1 truncate">
                {job.title}
              </h3>
              <p className="text-secondary text-sm mb-2">{job.company?.name}</p>
            </div>
            {job.isRemote && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded flex-shrink-0">
                Remote
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-secondary mb-3">
            {job.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
            )}
            {job.experienceLevel && (
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span className="capitalize">{job.experienceLevel.toLowerCase()}</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

