// Update the URL based on environment
const XML_FEED_URL = import.meta.env.VITE_XML_FEED_URL || 
  (import.meta.env.PROD 
    ? 'https://joveo-c08b42a8.s3-accelerate.amazonaws.com/1afd8eb1.xml'
    : '/api/jobs'); 
export interface XmlJob {
  id: string;
  title: string;
  company: string;
  location: string;
  city: string;
  state: string;
  country: string;
  description: string;
  type: string;
  category: string;
  applyUrl: string;
  date: string;
  modifiedDate: string;
  postalCode: string;
}

export class JobFeedService {
  private static parseXMLJob(jobElement: Element): XmlJob | null {
    try {
      const getTextContent = (tagName: string): string => {
        const element = jobElement.getElementsByTagName(tagName)[0];
        return element?.textContent?.trim() || '';
      };

      const title = getTextContent('title');
      const company = getTextContent('company');
      const city = getTextContent('city');
      const state = getTextContent('state');
      const country = getTextContent('country');
      const description = getTextContent('description');
      const type = getTextContent('type');
      const category = getTextContent('category');
      const url = getTextContent('url');
      const date = getTextContent('date');
      const modifiedDate = getTextContent('modifieddate');
      const postalCode = getTextContent('postalcode');
      const referenceNumber = getTextContent('referencenumber');

      if (!title || !company) return null;

      const location = [city, state, country].filter(Boolean).join(', ');

      return {
        id: referenceNumber || `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        company,
        location,
        city,
        state,
        country,
        description,
        type: type || 'FULL_TIME',
        category: category || 'General',
        applyUrl: url,
        date,
        modifiedDate,
        postalCode,
      };
    } catch (error) {
      console.error('Error parsing job element:', error);
      return null;
    }
  }

  static async fetchJobs(): Promise<XmlJob[]> {
    try {
      console.log('Fetching jobs from XML feed...');
      console.log('URL:', XML_FEED_URL);
      
      const response = await fetch(XML_FEED_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const xmlText = await response.text();
      console.log('XML fetched successfully, length:', xmlText.length);
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        console.error('XML parsing error:', parserError.textContent);
        throw new Error('Failed to parse XML');
      }
      
      const jobElements = xmlDoc.getElementsByTagName('job');
      console.log('Found job elements:', jobElements.length);
      const jobs: XmlJob[] = [];

      for (let i = 0; i < jobElements.length; i++) {
        const job = this.parseXMLJob(jobElements[i]);
        if (job) {
          jobs.push(job);
        }
      }

      console.log('Successfully parsed jobs:', jobs.length);
      return jobs;
    } catch (error) {
      console.error('Error fetching XML feed:', error);
      // Return empty array instead of throwing to prevent UI crash
      return [];
    }
  }

  static filterJobs(jobs: XmlJob[], filters: {
    keyword?: string;
    location?: string;
    type?: string;
    category?: string;
  }): XmlJob[] {
    return jobs.filter(job => {
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const matchesKeyword = 
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword);
        if (!matchesKeyword) return false;
      }

      if (filters.location) {
        const location = filters.location.toLowerCase();
        const matchesLocation = 
          job.location.toLowerCase().includes(location) ||
          job.city.toLowerCase().includes(location) ||
          job.state.toLowerCase().includes(location);
        if (!matchesLocation) return false;
      }

      if (filters.type && job.type !== filters.type) {
        return false;
      }

      if (filters.category) {
        const category = filters.category.toLowerCase();
        if (!job.category.toLowerCase().includes(category)) {
          return false;
        }
      }

      return true;
    });
  }
}