/**
 * Color coding system for job cards based on job category and title
 * Analyzes German job categories and English job titles to assign colors
 */

// Blue-collar/Trade keywords (English and German)
const blueCollarKeywords = [
    // English
    'labor', 'labour', 'fitter', 'welder', 'carpenter', 'technician',
    'mechanic', 'electrician', 'plumber', 'mason', 'driver', 'delivery',
    'construction', 'factory', 'warehouse', 'helper', 'maintenance',
    // German
    'elektroniker', 'elektriker', 'bauelektrik', 'automatisierungstechnik',
    'mechatroniker', 'maschinenbau', 'metallbearbeitung', 'farbtechnik',
    'lackierung', 'lager', 'lagerwirtschaft', 'instandhaltung', 'wartung'
  ];
  
  // IT/Tech keywords
  const itKeywords = [
    'informatik', 'it-systemadministration', 'it-anwendungsberatung',
    'technische informatik', 'developer', 'programmer', 'software',
    'engineer', 'devops', 'database', 'cloud', 'network', 'system',
    'coding', 'python', 'java', 'javascript', 'react', 'node'
  ];
  
  // Sales/Business keywords
  const salesKeywords = [
    'vertrieb', 'sales', 'sales manager', 'account manager', 'business development',
    'verkauf', 'außendienst', 'key account', 'kundenbetreuer', 'berater'
  ];
  
  // Management/Leadership keywords
  const managementKeywords = [
    'head of', 'manager', 'director', 'executive', 'chief', 'leader',
    'unternehmensorganisation', 'aufsichtskräfte', 'leiter', 'geschäftsführer'
  ];
  
  // Logistics/Supply Chain keywords
  const logisticsKeywords = [
    'logistik', 'lagerwirtschaft', 'spedition', 'supply', 'chain',
    'disposition', 'versand', 'fulfillment'
  ];
  
  // Professional, very light color palette (no pink/purple)
  const categoryColors: { [key: string]: string } = {
    'blue-collar': '#EBF4FF',      // Light denim blue      // Light industrial orange - Easily identifies trades
    'it': '#E3F2FD',               // Light sky blue - IT & Technology
    'sales': '#E8F5E9',            // Light mint green - Sales & Business
    'management': '#FFF8E1',       // Light warm yellow - Management & Leadership
    'logistics': '#E0F7FA',        // Light cyan - Logistics & Supply Chain
    'default': '#F0F9FF',          // Light blue - Default
  };
  
  // Alternative: Even softer palette (choose one)
  const alternativeCategoryColors: { [key: string]: string } = {
    'blue-collar': '#FFFDE7',      // Very light slate
    'it': '#F0F9FF',               // Very light cyan-blue
    'sales': '#F0FDF4',            // Very light green
    'management': '#FEFCE8',       // Very light yellow
    'logistics': '#F0FDFA',        // Very light teal
    'default': '#EFF6FF',          // Very light blue (blue-50) - different from IT blue
  };
  
  const categoryPatterns = [
    {
      type: 'blue-collar',
      keywords: blueCollarKeywords,
      categoryMatches: ['bauelektrik', 'automatisierungstechnik', 'maschinenbau', 
                       'metallbearbeitung', 'farbtechnik', 'lagerwirtschaft',
                       'betriebstechnik', 'instandhaltung'],
    },
    {
      type: 'it',
      keywords: itKeywords,
      categoryMatches: ['informatik', 'it-systemadministration', 'it-anwendungsberatung',
                       'technische informatik'],
    },
    {
      type: 'sales',
      keywords: salesKeywords,
      categoryMatches: ['vertrieb', 'sales'],
    },
    {
      type: 'management',
      keywords: managementKeywords,
      categoryMatches: ['unternehmensorganisation', 'aufsichtskräfte', 'strategie'],
    },
    {
      type: 'logistics',
      keywords: logisticsKeywords,
      categoryMatches: ['logistik', 'lagerwirtschaft', 'spedition'],
    },
  ];
  
  export const getJobColor = (title: string, category: string): string => {
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseCategory = category.toLowerCase();
  
    // Check each category pattern
    for (const pattern of categoryPatterns) {
      // Check category matches first (more reliable)
      for (const categoryMatch of pattern.categoryMatches) {
        if (lowerCaseCategory.includes(categoryMatch)) {
          return categoryColors[pattern.type];
        }
      }
  
      // Then check title keywords
      for (const keyword of pattern.keywords) {
        if (lowerCaseTitle.includes(keyword)) {
          return categoryColors[pattern.type];
        }
      }
    }
  
    return categoryColors['default'];
  };
  
  /**
   * Optional: Function to use the alternative color palette
   */
  export const getAlternativeJobColor = (title: string, category: string): string => {
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseCategory = category.toLowerCase();
  
    for (const pattern of categoryPatterns) {
      for (const categoryMatch of pattern.categoryMatches) {
        if (lowerCaseCategory.includes(categoryMatch)) {
          return alternativeCategoryColors[pattern.type];
        }
      }
  
      for (const keyword of pattern.keywords) {
        if (lowerCaseTitle.includes(keyword)) {
          return alternativeCategoryColors[pattern.type];
        }
      }
    }
  
    return alternativeCategoryColors['default'];
  };
  
  /**
   * Gets a human-readable category label for a job
   */
  export const getJobCategoryLabel = (title: string, category: string): string => {
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseCategory = category.toLowerCase();
  
    for (const pattern of categoryPatterns) {
      for (const categoryMatch of pattern.categoryMatches) {
        if (lowerCaseCategory.includes(categoryMatch)) {
          return pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1);
        }
      }
  
      for (const keyword of pattern.keywords) {
        if (lowerCaseTitle.includes(keyword)) {
          return pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1);
        }
      }
    }
  
    return 'Other';
  };
  
  /**
   * Optional: Tailwind CSS classes version (if you're using Tailwind)
   */
  export const tailwindCategoryClasses: { [key: string]: string } = {
    'blue-collar': 'bg-slate-50',    // Very light slate
    'it': 'bg-sky-50',               // Very light sky blue
    'sales': 'bg-emerald-50',        // Very light emerald green
    'management': 'bg-amber-50',     // Very light amber yellow
    'logistics': 'bg-cyan-50',       // Very light cyan
    'default': 'bg-blue-50',         // Very light blue (different from IT)
  };
  
  export const getTailwindJobClass = (title: string, category: string): string => {
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseCategory = category.toLowerCase();
  
    for (const pattern of categoryPatterns) {
      for (const categoryMatch of pattern.categoryMatches) {
        if (lowerCaseCategory.includes(categoryMatch)) {
          return tailwindCategoryClasses[pattern.type];
        }
      }
  
      for (const keyword of pattern.keywords) {
        if (lowerCaseTitle.includes(keyword)) {
          return tailwindCategoryClasses[pattern.type];
        }
      }
    }
  
    return tailwindCategoryClasses['default'];
  };