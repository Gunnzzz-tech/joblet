import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Loader2, MapPin, Briefcase, Building2, Calendar, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { JobFeedService, XmlJob } from '../lib/jobFeed';

export default function JobListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState<XmlJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [workLocation, setWorkLocation] = useState(searchParams.get('location') || '');
  const [experience, setExperience] = useState(searchParams.get('experience') || '');
  const [jobType, setJobType] = useState(searchParams.get('type') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 500]);
  
  const [workSchedule, setWorkSchedule] = useState<string[]>([]);
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 20;

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobs = await JobFeedService.fetchJobs();
      setAllJobs(jobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on all criteria
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Keyword filter
      const matchesKeyword = !keyword || 
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase());

      // Location filter
      const matchesLocation = !workLocation || 
        job.location?.toLowerCase().includes(workLocation.toLowerCase());

      // Experience filter
      const matchesExperience = !experience || 
        job.title.toLowerCase().includes(experience.toLowerCase());

      // Job type filter
      const matchesJobType = !jobType || 
        job.type?.toLowerCase().includes(jobType.toLowerCase());

      // Category filter
      const matchesCategory = !category || 
        job.category?.toLowerCase().includes(category.toLowerCase());

      // Work schedule filter (if we add this data to XML jobs)
      const matchesWorkSchedule = workSchedule.length === 0 || 
        workSchedule.some(schedule => job.type?.toLowerCase().includes(schedule.toLowerCase()));

      return matchesKeyword && matchesLocation && matchesExperience && 
             matchesJobType && matchesCategory && matchesWorkSchedule;
    });
  }, [allJobs, keyword, workLocation, experience, jobType, category, workSchedule]);

  const toggleWorkSchedule = (schedule: string) => {
    setWorkSchedule((prev) => 
      prev.includes(schedule) ? prev.filter((s) => s !== schedule) : [...prev, schedule]
    );
  };

  const toggleEmploymentType = (type: string) => {
    setEmploymentType((prev) => 
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSalaryRangeChange = (value: number) => {
    const newRange: [number, number] = [value, salaryRange[1]];
    if (newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    }
    setSalaryRange(newRange);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (workLocation) params.set('location', workLocation);
    if (experience) params.set('experience', experience);
    if (jobType) params.set('type', jobType);
    if (category) params.set('category', category);
    setSearchParams(params);
  };

  const handleJobClick = (job: XmlJob) => {
    navigate(`/jobs/${job.id}`, { state: { job } });
  };

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Search
            </button>
          </div>
        </form>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              
              <div className="space-y-6">
                {/* Working Schedule */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Working schedule</h4>
                  <div className="space-y-2">
                    {['Full time', 'Part time', 'Internship', 'Project work', 'Volunteering'].map((schedule) => (
                      <label key={schedule} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={workSchedule.includes(schedule)}
                          onChange={() => toggleWorkSchedule(schedule)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm">{schedule}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Employment Type */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Employment type</h4>
                  <div className="space-y-2">
                    {['Full day', 'Flexible schedule', 'Shift work', 'Distant work', 'Shift method'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={employmentType.includes(type)}
                          onChange={() => toggleEmploymentType(type)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Horizontal Filters Row */}
            <div className="flex items-center gap-4 mb-6">
              {/* Work Location */}
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1 max-w-[180px] border border-gray-300">
                <MapPin className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Work location"
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  className="text-sm bg-transparent outline-none flex-1"
                />
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>

              {/* Experience */}
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1 max-w-[180px] border border-gray-300">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="text-sm bg-transparent outline-none flex-1"
                />
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1 max-w-[180px] border border-gray-300">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="text-sm bg-transparent outline-none flex-1"
                />
              </div>

              {/* Salary Range */}
              <div className="w-[160px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">Salary (${salaryRange[0]} - ${salaryRange[1]})/hr</span>
                </div>
                <div className="relative flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">$0</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={salaryRange[0]}
                    onChange={(e) => handleSalaryRangeChange(parseInt(e.target.value))}
                    className="w-full h-1 rounded-lg cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 ${((salaryRange[0] / 500) * 100)}%, #e5e7eb ${((salaryRange[0] / 500) * 100)}%)`,
                      accentColor: '#3b82f6',
                    }}
                  />
                  <span className="text-[10px] text-gray-400">$500</span>
                </div>
              </div>
            </div>

            {/* Jobs Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-gray-900 text-2xl font-semibold">Recommended jobs</h2>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{filteredJobs.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">Sort by:</span>
                <span className="text-gray-900 text-sm font-medium">Last updated</span>
                <button className="text-gray-500 hover:text-gray-900">
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Jobs Content */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No jobs found matching your filters.</p>
                <p className="text-sm mt-2">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentJobs.map((job, index) => {
                    const colors = [
                      'from-blue-500 to-purple-600',
                      'from-green-500 to-teal-600',
                      'from-orange-500 to-red-600',
                      'from-pink-500 to-rose-600',
                      'from-indigo-500 to-blue-600',
                      'from-yellow-500 to-orange-600',
                      'from-cyan-500 to-blue-600',
                      'from-purple-500 to-pink-600',
                    ];
                    const gradientColor = colors[index % colors.length];
                    
                    return (
                      <div
                        key={job.id}
                        onClick={() => handleJobClick(job)}
                        className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                      >
                        {/* Colorful gradient header */}
                        <div className={`h-2 bg-gradient-to-r ${gradientColor}`}></div>
                        
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 flex-1">
                              {job.title}
                            </h3>
                          </div>
                          
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Building2 className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate font-medium">{job.company}</span>
                            </div>
                            {job.location && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{job.location}</span>
                              </div>
                            )}
                          </div>
                          
                          <button className={`w-full bg-gradient-to-r ${gradientColor} hover:opacity-90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200`}>
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="btn btn-outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

