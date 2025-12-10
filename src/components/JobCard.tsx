import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { XmlJob } from '../lib/jobFeed';
import { getJobColor } from '../lib/colorUtils';

interface JobCardProps {
  job: XmlJob;
  index: number;
}

export default function JobCard({ job, index }: JobCardProps) {
  // Color palettes for backgrounds - This is now handled by getColorByJobTitle
  // const bgColors = [...];

  const logoColors = [
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
  ];

  // Generate company logo (first letter or emoji based on company)
  const getCompanyLogo = (companyName: string): string => {
    const companyLogos: Record<string, string> = {
      'amazon': 'A',
      'google': 'G',
      'twitter': '🐦',
      'apple': '🍎',
      'microsoft': 'M',
      'facebook': 'f',
      'netflix': 'N',
      'airbnb': '🏠',
      'dribbble': '●',
      'meta': 'M',
      'linkedin': 'in',
      'uber': 'U',
      'spotify': '♪',
      'stripe': 'S',
      'shopify': '🛍️',
    };

    const lowerName = companyName.toLowerCase();
    for (const [key, logo] of Object.entries(companyLogos)) {
      if (lowerName.includes(key)) return logo;
    }
    
    // Return first letter if no match
    return companyName.charAt(0).toUpperCase();
  };

  // Generate realistic hourly rate based on job title and company
  const generateHourlyRate = (title: string, company: string): string => {
    const rates: Record<string, number> = {
      'senior': 250,
      'junior': 150,
      'middle': 180,
      'lead': 300,
      'principal': 350,
      'manager': 280,
      'director': 400,
    };

    const lowerTitle = title.toLowerCase();
    let baseRate = 120; // Default rate

    for (const [level, rate] of Object.entries(rates)) {
      if (lowerTitle.includes(level)) {
        baseRate = rate;
        break;
      }
    }

    // Adjust based on company size/reputation
    const bigTech = ['google', 'amazon', 'microsoft', 'apple', 'facebook', 'netflix'];
    if (bigTech.some(tech => company.toLowerCase().includes(tech))) {
      baseRate += 50;
    }

    // Add some randomness
    const randomAdjustment = Math.floor(Math.random() * 40) - 20;
    const finalRate = Math.max(80, baseRate + randomAdjustment);
    return `$${finalRate}/hr`;
  };

  // Generate date (random dates within last 6 months)
  const generateDate = (): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', 
                  '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    
    const month = months[Math.floor(Math.random() * 6)]; // Last 6 months
    const day = days[Math.floor(Math.random() * days.length)];
    const year = '2023';
    
    return `${day} ${month}, ${year}`;
  };

  // Generate tags based on job title and type
  const generateTags = (title: string, type?: string): string[] => {
    const tags: string[] = [];
    const lowerTitle = title.toLowerCase();
    
    // Experience level tags
    if (lowerTitle.includes('senior')) tags.push('Senior level');
    else if (lowerTitle.includes('junior')) tags.push('Junior level');
    else if (lowerTitle.includes('mid') || lowerTitle.includes('middle')) tags.push('Middle level');
    else tags.push('Entry level');
    
    // Work schedule tags
    const schedules = ['Full time', 'Part time', 'Contract', 'Internship'];
    tags.push(schedules[Math.floor(Math.random() * schedules.length)]);
    
    // Work type tags
    const workTypes = ['Distant', 'On-site', 'Hybrid'];
    tags.push(workTypes[Math.floor(Math.random() * workTypes.length)]);
    
    // Additional tags based on type
    if (type) {
      if (type.toLowerCase().includes('project')) tags.push('Project work');
      if (type.toLowerCase().includes('flex')) tags.push('Flexible schedule');
    }
    
    // Add shift work randomly
    if (Math.random() > 0.7) tags.push('Shift work');
    
    return tags.slice(0, 4); // Limit to 4 tags
  };

  // Get the data for display
  const backgroundColor = getJobColor(job.title, job.category);
  const logoColor = logoColors[index % logoColors.length];
  const logo = getCompanyLogo(job.company);
  const date = generateDate();
  const rate = generateHourlyRate(job.title, job.company);
  const tags = generateTags(job.title, job.type);
  const isBookmarked = Math.random() > 0.8; // Random bookmarks

  return (
    <div 
      className="rounded-3xl p-4 relative border border-gray-300 h-full hover:shadow-lg transition-shadow duration-200"
      style={{ backgroundColor }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="bg-white px-2 py-1 rounded-lg text-xs text-gray-700">
          {date}
        </div>
        <button 
          className="text-gray-700 hover:text-gray-900"
          onClick={(e) => {
            e.stopPropagation();
            // Handle bookmark toggle
          }}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-black' : ''}`} />
        </button>
      </div>

      {/* Company and Title */}
      <div className="mb-3">
        <div className="text-xs text-gray-700 mb-1">{job.company}</div>
        <h3 className="text-sm text-gray-900 mb-3 line-clamp-3 h-10">{job.title}</h3>
        
        {/* Company Logo */}
        <div className="absolute right-2 top-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className={`text-xl ${logoColor}`}>
              {logo}
            </span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4 min-h-[20px]">
        {tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex}
            className="bg-white bg-opacity-60 px-2 py-0.5 rounded-full text-xs text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-300 border-opacity-30">
        <div>
          <div className="text-gray-900 text-base mb-0.5">{rate}</div>
          <div className="text-gray-600 text-xs">{job.location || 'Remote'}</div>
        </div>
        <Link
          to={`/jobs/${job.id}`}
          state={{ job }} // Pass the job data via state
          className="bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors text-sm"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
