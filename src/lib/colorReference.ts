export const COLOR_REFERENCE = {
    // Job Category Colors - All very light, professional tones
    BLUE_COLLAR: '#F5F7FA',       // Very light gray-blue - Trades & Technical
    IT_TECH: '#E3F2FD',           // Very light sky blue - IT & Technology
    SALES: '#E8F5E9',             // Very light mint green - Sales & Business
    MANAGEMENT: '#FFF8E1',        // Very light warm yellow - Management & Leadership
    LOGISTICS: '#E0F7FA',         // Very light cyan - Logistics & Supply Chain
    CREATIVE: '#F3E5F5',          // Very light lavender (kept subtle) - Creative & Design
    FINANCE: '#FFF3E0',           // Very light peach - Finance & Admin
    HEALTHCARE: '#E8F5E8',        // Very light fresh green - Healthcare
    EDUCATION: '#E3F2FD',         // Very light blue (same as IT_TECH) - Education
    HOSPITALITY: '#FFFDE7',       // Very light pale yellow - Hospitality
    DEFAULT: '#FFFFFF',           // White - Unclassified Jobs
  
    // RGB Values
    BLUE_COLLAR_RGB: 'rgb(245, 247, 250)',
    IT_TECH_RGB: 'rgb(227, 242, 253)',
    SALES_RGB: 'rgb(232, 245, 233)',
    MANAGEMENT_RGB: 'rgb(255, 248, 225)',
    LOGISTICS_RGB: 'rgb(224, 247, 250)',
    CREATIVE_RGB: 'rgb(243, 229, 245)',
    FINANCE_RGB: 'rgb(255, 243, 224)',
    HEALTHCARE_RGB: 'rgb(232, 245, 232)',
    EDUCATION_RGB: 'rgb(227, 242, 253)',
    HOSPITALITY_RGB: 'rgb(255, 253, 231)',
    DEFAULT_RGB: 'rgb(255, 255, 255)',
  };
  
  /**
   * Alternative: Even softer, more harmonious palette
   */
  export const SOFT_COLORS = {
    // Professional, muted pastels
    BLUE_COLLAR: '#F0F4F8',       // Light blue-gray
    IT_TECH: '#E8F4FF',           // Light blue
    SALES: '#EDF7ED',             // Light sage green
    MANAGEMENT: '#FFF9E6',        // Light wheat yellow
    LOGISTICS: '#E6F7FF',         // Light cyan
    CREATIVE: '#F5F0FF',          // Light lilac (very subtle)
    FINANCE: '#FFF5E6',           // Light apricot
    HEALTHCARE: '#E8F5E9',        // Light mint green
    EDUCATION: '#E8F4FF',         // Light blue
    HOSPITALITY: '#FFFDE8',       // Light cream yellow
    DEFAULT: '#FFFFFF',
  };
  
  /**
   * Minimalist & Clean palette
   */
  export const MINIMAL_COLORS = {
    BLUE_COLLAR: '#F8FAFC',       // Very light slate
    IT_TECH: '#F0F9FF',           // Very light cyan-blue
    SALES: '#F0FDF4',             // Very light green
    MANAGEMENT: '#FEFCE8',        // Very light yellow
    LOGISTICS: '#F0FDFA',         // Very light teal
    CREATIVE: '#FAF5FF',          // Very light violet (barely visible)
    FINANCE: '#FFFBEB',           // Very light amber
    HEALTHCARE: '#F0FDF0',        // Very light green
    EDUCATION: '#EFF6FF',         // Very light blue
    HOSPITALITY: '#FEFCE8',       // Very light yellow
    DEFAULT: '#FFFFFF',
  };
  
  /**
   * Tailwind-friendly classes (using Tailwind's built-in colors)
   */
  export const TAILWIND_CLASSES = {
    BLUE_COLLAR: 'bg-slate-50',        // slate-50: #f8fafc
    IT_TECH: 'bg-sky-50',              // sky-50: #f0f9ff
    SALES: 'bg-emerald-50',            // emerald-50: #ecfdf5
    MANAGEMENT: 'bg-amber-50',         // amber-50: #fffbeb
    LOGISTICS: 'bg-cyan-50',           // cyan-50: #ecfeff
    CREATIVE: 'bg-violet-50',          // violet-50: #f5f3ff (very subtle)
    FINANCE: 'bg-orange-50',           // orange-50: #fff7ed
    HEALTHCARE: 'bg-green-50',         // green-50: #f0fdf4
    EDUCATION: 'bg-blue-50',           // blue-50: #eff6ff
    HOSPITALITY: 'bg-yellow-50',       // yellow-50: #fefce8
    DEFAULT: 'bg-white',
  };
  
  /**
   * Utility function to get category-based color
   */
  export const getCategoryColor = (category: string = ''): string => {
    const categoryMap: Record<string, string> = {
      // Blue-collar & Trades
      'construction': COLOR_REFERENCE.BLUE_COLLAR,
      'manufacturing': COLOR_REFERENCE.BLUE_COLLAR,
      'maintenance': COLOR_REFERENCE.BLUE_COLLAR,
      'technician': COLOR_REFERENCE.BLUE_COLLAR,
      'electrician': COLOR_REFERENCE.BLUE_COLLAR,
      'plumber': COLOR_REFERENCE.BLUE_COLLAR,
      'mechanic': COLOR_REFERENCE.BLUE_COLLAR,
      'welder': COLOR_REFERENCE.BLUE_COLLAR,
      'carpenter': COLOR_REFERENCE.BLUE_COLLAR,
      
      // IT & Technology
      'software': COLOR_REFERENCE.IT_TECH,
      'developer': COLOR_REFERENCE.IT_TECH,
      'engineer': COLOR_REFERENCE.IT_TECH,
      'it': COLOR_REFERENCE.IT_TECH,
      'technology': COLOR_REFERENCE.IT_TECH,
      'programmer': COLOR_REFERENCE.IT_TECH,
      'analyst': COLOR_REFERENCE.IT_TECH,
      'data': COLOR_REFERENCE.IT_TECH,
      'system': COLOR_REFERENCE.IT_TECH,
      
      // Sales & Business
      'sales': COLOR_REFERENCE.SALES,
      'marketing': COLOR_REFERENCE.SALES,
      'business': COLOR_REFERENCE.SALES,
      'account': COLOR_REFERENCE.SALES,
      'customer': COLOR_REFERENCE.SALES,
      'representative': COLOR_REFERENCE.SALES,
      'advisor': COLOR_REFERENCE.SALES,
      
      // Management & Leadership
      'manager': COLOR_REFERENCE.MANAGEMENT,
      'director': COLOR_REFERENCE.MANAGEMENT,
      'lead': COLOR_REFERENCE.MANAGEMENT,
      'supervisor': COLOR_REFERENCE.MANAGEMENT,
      'executive': COLOR_REFERENCE.MANAGEMENT,
      'head': COLOR_REFERENCE.MANAGEMENT,
      'chief': COLOR_REFERENCE.MANAGEMENT,
      
      // Logistics & Supply Chain
      'logistics': COLOR_REFERENCE.LOGISTICS,
      'supply': COLOR_REFERENCE.LOGISTICS,
      'warehouse': COLOR_REFERENCE.LOGISTICS,
      'driver': COLOR_REFERENCE.LOGISTICS,
      'delivery': COLOR_REFERENCE.LOGISTICS,
      'inventory': COLOR_REFERENCE.LOGISTICS,
      'shipping': COLOR_REFERENCE.LOGISTICS,
      'distribution': COLOR_REFERENCE.LOGISTICS,
      
      // Healthcare
      'nurse': MINIMAL_COLORS.HEALTHCARE,
      'doctor': MINIMAL_COLORS.HEALTHCARE,
      'healthcare': MINIMAL_COLORS.HEALTHCARE,
      'medical': MINIMAL_COLORS.HEALTHCARE,
      'care': MINIMAL_COLORS.HEALTHCARE,
      'therapist': MINIMAL_COLORS.HEALTHCARE,
      
      // Finance
      'finance': MINIMAL_COLORS.FINANCE,
      'accountant': MINIMAL_COLORS.FINANCE,
      'banking': MINIMAL_COLORS.FINANCE,
      'audit': MINIMAL_COLORS.FINANCE,
      'payroll': MINIMAL_COLORS.FINANCE,
      'tax': MINIMAL_COLORS.FINANCE,
      
      // Education
      'teacher': MINIMAL_COLORS.EDUCATION,
      'educator': MINIMAL_COLORS.EDUCATION,
      'trainer': MINIMAL_COLORS.EDUCATION,
      'instructor': MINIMAL_COLORS.EDUCATION,
      'professor': MINIMAL_COLORS.EDUCATION,
      'tutor': MINIMAL_COLORS.EDUCATION,
      
      // Hospitality
      'hospitality': MINIMAL_COLORS.HOSPITALITY,
      'hotel': MINIMAL_COLORS.HOSPITALITY,
      'restaurant': MINIMAL_COLORS.HOSPITALITY,
      'chef': MINIMAL_COLORS.HOSPITALITY,
      'waiter': MINIMAL_COLORS.HOSPITALITY,
      'bartender': MINIMAL_COLORS.HOSPITALITY,
      'receptionist': MINIMAL_COLORS.HOSPITALITY,
    };
  
    const lowerCategory = category.toLowerCase();
    
    // Check for any matching keywords
    for (const [keyword, color] of Object.entries(categoryMap)) {
      if (lowerCategory.includes(keyword)) {
        return color;
      }
    }
    
    // Fallback to default based on index or random
    return COLOR_REFERENCE.DEFAULT;
  };
  
  /**
   * Utility function to get Tailwind class based on category
   */
  export const getTailwindCategoryClass = (category: string = ''): string => {
    const lowerCategory = category.toLowerCase();
    
    if (lowerCategory.includes('construction') || lowerCategory.includes('manufacturing') || lowerCategory.includes('technician')) {
      return TAILWIND_CLASSES.BLUE_COLLAR;
    }
    if (lowerCategory.includes('software') || lowerCategory.includes('developer') || lowerCategory.includes('it')) {
      return TAILWIND_CLASSES.IT_TECH;
    }
    if (lowerCategory.includes('sales') || lowerCategory.includes('marketing') || lowerCategory.includes('business')) {
      return TAILWIND_CLASSES.SALES;
    }
    if (lowerCategory.includes('manager') || lowerCategory.includes('director') || lowerCategory.includes('lead')) {
      return TAILWIND_CLASSES.MANAGEMENT;
    }
    if (lowerCategory.includes('logistics') || lowerCategory.includes('warehouse') || lowerCategory.includes('driver')) {
      return TAILWIND_CLASSES.LOGISTICS;
    }
    if (lowerCategory.includes('health') || lowerCategory.includes('medical') || lowerCategory.includes('nurse')) {
      return TAILWIND_CLASSES.HEALTHCARE;
    }
    if (lowerCategory.includes('finance') || lowerCategory.includes('accountant') || lowerCategory.includes('bank')) {
      return TAILWIND_CLASSES.FINANCE;
    }
    if (lowerCategory.includes('teacher') || lowerCategory.includes('educator') || lowerCategory.includes('trainer')) {
      return TAILWIND_CLASSES.EDUCATION;
    }
    if (lowerCategory.includes('hotel') || lowerCategory.includes('restaurant') || lowerCategory.includes('chef')) {
      return TAILWIND_CLASSES.HOSPITALITY;
    }
    
    return TAILWIND_CLASSES.DEFAULT;
  };