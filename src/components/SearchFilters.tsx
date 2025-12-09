import React from 'react';
import { Filter } from 'lucide-react';

interface SearchFiltersProps {
  filters: {
    experience?: string;
    workSchedule?: string;
    employment?: string;
    category?: string;
    minSalary?: number;
    maxSalary?: number;
    location?: string;
  };
  onFilterChange: (key: string, value: any) => void;
}

export default function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const experienceLevels = ['ENTRY', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE'];
  const workSchedules = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'];
  const employmentTypes = ['ON_SITE', 'REMOTE', 'HYBRID', 'FLEXIBLE'];
  const categories = [
    'Technology',
    'Design',
    'Marketing',
    'Finance',
    'Healthcare',
    'Education',
    'Sales',
    'Operations',
  ];

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* Experience Level */}
        <div>
          <label className="label mb-3">Experience Level</label>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.experience === level}
                  onChange={(e) =>
                    onFilterChange('experience', e.target.checked ? level : '')
                  }
                  className="mr-2"
                />
                <span className="text-sm capitalize">{level.toLowerCase()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Work Schedule */}
        <div>
          <label className="label mb-3">Work Schedule</label>
          <div className="space-y-2">
            {workSchedules.map((schedule) => (
              <label key={schedule} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.workSchedule === schedule}
                  onChange={(e) =>
                    onFilterChange('workSchedule', e.target.checked ? schedule : '')
                  }
                  className="mr-2"
                />
                <span className="text-sm">
                  {schedule.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <label className="label mb-3">Employment Type</label>
          <div className="space-y-2">
            {employmentTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.employment === type}
                  onChange={(e) =>
                    onFilterChange('employment', e.target.checked ? type : '')
                  }
                  className="mr-2"
                />
                <span className="text-sm capitalize">{type.toLowerCase().replace('_', '-')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="label mb-3">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="input"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="label mb-3">Salary Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minSalary || ''}
              onChange={(e) =>
                onFilterChange('minSalary', e.target.value ? Number(e.target.value) : undefined)
              }
              className="input"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxSalary || ''}
              onChange={(e) =>
                onFilterChange('maxSalary', e.target.value ? Number(e.target.value) : undefined)
              }
              className="input"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="label mb-3">Location</label>
          <input
            type="text"
            placeholder="City, State, or Remote"
            value={filters.location || ''}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="input"
          />
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            onFilterChange('experience', '');
            onFilterChange('workSchedule', '');
            onFilterChange('employment', '');
            onFilterChange('category', '');
            onFilterChange('minSalary', undefined);
            onFilterChange('maxSalary', undefined);
            onFilterChange('location', '');
          }}
          className="w-full btn btn-outline-primary"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}

