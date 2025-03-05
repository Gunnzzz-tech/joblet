
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { yogaPoses, PoseDifficulty, wellnessArticles, dietPlans } from '../data/yoga';
import { Search, Filter, Book, Utensils, Activity as YogaIcon } from 'lucide-react';

export default function YogaPage() {
  const [activeTab, setActiveTab] = useState<'poses' | 'articles' | 'diets'>('poses');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter yoga poses based on difficulty and search
  const filteredPoses = yogaPoses.filter(pose => {
    let matchesDifficulty = true;
    if (selectedDifficulty) {
      matchesDifficulty = pose.difficulty === selectedDifficulty;
    }
    
    let matchesSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch = pose.name.toLowerCase().includes(query) || 
                     pose.sanskritName.toLowerCase().includes(query) || 
                     pose.benefits.some(benefit => benefit.toLowerCase().includes(query));
    }
    
    return matchesDifficulty && matchesSearch;
  });
  
  // Filter articles based on search
  const filteredArticles = wellnessArticles.filter(article => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return article.title.toLowerCase().includes(query) || 
           article.summary.toLowerCase().includes(query) || 
           article.tags.some(tag => tag.toLowerCase().includes(query));
  });
  
  // Filter diet plans based on search
  const filteredDietPlans = dietPlans.filter(plan => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return plan.name.toLowerCase().includes(query) || 
           plan.description.toLowerCase().includes(query) || 
           plan.forDosha.some(dosha => dosha.toLowerCase().includes(query));
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Yoga & Wellness</h1>
      
      {/* Tab navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'poses' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('poses')}
        >
          <YogaIcon className="h-5 w-5 inline-block mr-1" />
          Yoga Poses
        </button>
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'articles' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('articles')}
        >
          <Book className="h-5 w-5 inline-block mr-1" />
          Wellness Articles
        </button>
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'diets' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('diets')}
        >
          <Utensils className="h-5 w-5 inline-block mr-1" />
          Diet Plans
        </button>
      </div>
      
      {/* Search and filter section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'poses' ? 'yoga poses' : activeTab === 'articles' ? 'articles' : 'diet plans'}...`}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {activeTab === 'poses' && (
            <div className="md:w-48">
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="">All Difficulties</option>
                {Object.values(PoseDifficulty).map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'poses' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoses.length > 0 ? (
            filteredPoses.map(pose => (
              <div key={pose.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={pose.imageUrl}
                    alt={pose.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="bg-primary text-white text-xs px-2 py-1 rounded inline-block">
                      {pose.difficulty}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{pose.name}</h2>
                  <p className="text-gray-500 italic mb-3">{pose.sanskritName}</p>
                  
                  <h3 className="font-medium mb-2">Benefits:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                    {pose.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                    {pose.benefits.length > 3 && <li>And more...</li>}
                  </ul>
                  
                  <Link to={`/yoga/poses/${pose.id}`} className="btn btn-outline-primary w-full">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-12">
              <p className="text-lg text-gray-600">No yoga poses found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDifficulty('');
                }}
                className="mt-4 btn btn-outline-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'articles' && (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-primary bg-primary-50 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-700 mb-3 text-sm line-clamp-3">{article.summary}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">By {article.author}</div>
                    <Link to={`/yoga/articles/${article.id}`} className="text-primary hover:underline text-sm font-medium">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-12">
              <p className="text-lg text-gray-600">No articles found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 btn btn-outline-primary"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'diets' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDietPlans.length > 0 ? (
            filteredDietPlans.map(plan => (
              <div key={plan.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={plan.imageUrl} 
                    alt={plan.name}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
                  <div className="mb-2">
                    <span className="text-sm">For Dosha: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {plan.forDosha.map(dosha => (
                        <span key={dosha} className="bg-primary-50 text-primary text-xs px-2 py-1 rounded">
                          {dosha}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 text-sm">{plan.description}</p>
                  
                  <h3 className="font-medium mb-2">Benefits:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                    {plan.benefits.slice(0, 2).map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                    {plan.benefits.length > 2 && <li>And more...</li>}
                  </ul>
                  
                  <Link to={`/yoga/diets/${plan.id}`} className="btn btn-outline-primary w-full">
                    View Diet Plan
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-12">
              <p className="text-lg text-gray-600">No diet plans found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 btn btn-outline-primary"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
