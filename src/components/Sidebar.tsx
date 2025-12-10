import { ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import taskifyImage from '../images/taskifyblack.png';
interface SidebarProps {
  workSchedule: string[];
  employmentType: string[];
  onToggleWorkSchedule: (schedule: string) => void;
  onToggleEmploymentType: (type: string) => void;
}

export function Sidebar({ 
  workSchedule, 
  employmentType, 
  onToggleWorkSchedule, 
  onToggleEmploymentType 
}: SidebarProps) {
  return (
    <div className="w-[240px] flex-shrink-0">
      {/* Banner Card */}
      <div 
  className="rounded-2xl p-5 mb-6 relative overflow-hidden h-[220px] flex flex-col justify-end"
  style={{
    backgroundImage: `url(${taskifyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
        {/* Optional: Add a dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        
        <h3 className="text-white text-xl mb-3 relative z-10">
          Get Your best<br />profession<br />wit Taskify Ai
        </h3>
        <button className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-1.5 rounded-full w-fit relative z-10 text-sm">
          Learn more
        </button>
      </div>

      {/* Filters Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900">Filters</h3>
          <button className="text-gray-500 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Working Schedule */}
        <div className="mb-5">
          <h4 className="text-gray-500 text-sm mb-2">Working schedule</h4>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={workSchedule.includes("Full time")}
                onChange={() => onToggleWorkSchedule("Full time")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Full time</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={workSchedule.includes("Part time")}
                onChange={() => onToggleWorkSchedule("Part time")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Part time</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={workSchedule.includes("Internship")}
                onChange={() => onToggleWorkSchedule("Internship")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Internship</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={workSchedule.includes("Project work")}
                onChange={() => onToggleWorkSchedule("Project work")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Project work</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={workSchedule.includes("Volunteering")}
                onChange={() => onToggleWorkSchedule("Volunteering")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Volunteering</span>
            </label>
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <h4 className="text-gray-500 text-sm mb-2">Employment type</h4>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={employmentType.includes("Full day")}
                onChange={() => onToggleEmploymentType("Full day")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Full day</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={employmentType.includes("Flexible schedule")}
                onChange={() => onToggleEmploymentType("Flexible schedule")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Flexible schedule</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={employmentType.includes("Shift work")}
                onChange={() => onToggleEmploymentType("Shift work")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Shift work</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={employmentType.includes("Distant work")}
                onChange={() => onToggleEmploymentType("Distant work")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Distant work</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={employmentType.includes("Shift method")}
                onChange={() => onToggleEmploymentType("Shift method")}
                className="w-4 h-4 rounded accent-black" 
              />
              <span className="text-gray-900">Shift method</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}