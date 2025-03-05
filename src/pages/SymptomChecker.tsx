
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Symptom, SymptomCategory, symptoms, getSymptomsByCategory } from '../data/symptoms';

// Severity options for symptoms
const severityOptions = [
  { value: 1, label: 'Mild' },
  { value: 2, label: 'Moderate' },
  { value: 3, label: 'Significant' },
  { value: 4, label: 'Severe' },
  { value: 5, label: 'Extreme' }
];

// Duration options for symptoms
const durationOptions = [
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' },
  { value: 'years', label: 'Years' }
];

// Frequency options for symptoms
const frequencyOptions = [
  { value: 'rarely', label: 'Rarely (once in a while)' },
  { value: 'occasionally', label: 'Occasionally (a few times a month)' },
  { value: 'often', label: 'Often (a few times a week)' },
  { value: 'daily', label: 'Daily' },
  { value: 'constantly', label: 'Constantly (throughout the day)' }
];

export default function SymptomCheckerPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SymptomCategory>(SymptomCategory.Physical);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomDetails, setSymptomDetails] = useState<Record<string, {
    severity: number;
    duration: string;
    durationValue: number;
    frequency: string;
    notes: string;
  }>>({});
  
  // Get symptoms for the active category
  const categorySymptoms = getSymptomsByCategory(activeTab);
  
  // Toggle symptom selection
  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(prev => prev.filter(id => id !== symptomId));
      
      // Remove symptom details when deselected
      const newDetails = { ...symptomDetails };
      delete newDetails[symptomId];
      setSymptomDetails(newDetails);
    } else {
      setSelectedSymptoms(prev => [...prev, symptomId]);
      
      // Initialize symptom details when selected
      setSymptomDetails(prev => ({
        ...prev,
        [symptomId]: {
          severity: 3, // Default to moderate
          duration: 'days',
          durationValue: 1,
          frequency: 'often',
          notes: ''
        }
      }));
    }
  };
  
  // Update symptom details
  const updateSymptomDetail = (
    symptomId: string,
    field: 'severity' | 'duration' | 'durationValue' | 'frequency' | 'notes',
    value: any
  ) => {
    setSymptomDetails(prev => ({
      ...prev,
      [symptomId]: {
        ...prev[symptomId],
        [field]: value
      }
    }));
  };
  
  // Submit symptoms for analysis
  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom.');
      return;
    }
    
    // Store data in session storage to use on results page
    sessionStorage.setItem('selectedSymptoms', JSON.stringify(selectedSymptoms));
    sessionStorage.setItem('symptomDetails', JSON.stringify(symptomDetails));
    
    // Navigate to results page
    navigate('/results');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Symptom Checker</h1>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          Select your symptoms below and provide details about their severity, duration, and frequency 
          for a more accurate analysis.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> This tool is for informational purposes only and should not replace 
            professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>
      
      {/* Category tabs */}
      <div className="flex flex-wrap border-b mb-6">
        {Object.values(SymptomCategory).map(category => (
          <button
            key={category}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === category 
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category} Symptoms
          </button>
        ))}
      </div>
      
      {/* Symptom selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{activeTab} Symptoms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categorySymptoms.map(symptom => (
            <div 
              key={symptom.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedSymptoms.includes(symptom.id)
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => toggleSymptom(symptom.id)}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom.id)}
                  onChange={() => {}} // Handled by the onClick of the parent div
                  className="mr-3 h-5 w-5 text-primary"
                />
                <div>
                  <h3 className="font-medium">{symptom.name}</h3>
                  {symptom.description && (
                    <p className="text-sm text-gray-600">{symptom.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selected symptoms details */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Symptom Details</h2>
          {selectedSymptoms.map(symptomId => {
            const symptom = symptoms.find(s => s.id === symptomId);
            if (!symptom) return null;
            
            return (
              <div key={symptomId} className="border rounded-lg p-4 mb-4">
                <h3 className="font-medium text-lg mb-3">{symptom.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  {/* Severity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      value={symptomDetails[symptomId]?.severity || 3}
                      onChange={(e) => updateSymptomDetail(symptomId, 'severity', parseInt(e.target.value))}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    >
                      {severityOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration Value</label>
                      <input
                        type="number"
                        min="1"
                        value={symptomDetails[symptomId]?.durationValue || 1}
                        onChange={(e) => updateSymptomDetail(symptomId, 'durationValue', parseInt(e.target.value))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration Unit</label>
                      <select
                        value={symptomDetails[symptomId]?.duration || 'days'}
                        onChange={(e) => updateSymptomDetail(symptomId, 'duration', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                      >
                        {durationOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Frequency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select
                      value={symptomDetails[symptomId]?.frequency || 'often'}
                      onChange={(e) => updateSymptomDetail(symptomId, 'frequency', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    >
                      {frequencyOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Notes */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                      value={symptomDetails[symptomId]?.notes || ''}
                      onChange={(e) => updateSymptomDetail(symptomId, 'notes', e.target.value)}
                      rows={2}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                      placeholder="Any additional details about this symptom..."
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Submit button */}
      <div className="flex justify-center">
        <button
          onClick={analyzeSymptoms}
          disabled={selectedSymptoms.length === 0}
          className={`btn ${
            selectedSymptoms.length > 0 
              ? 'btn-primary' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } px-6 py-3 text-lg`}
        >
          Analyze Symptoms
        </button>
      </div>
    </div>
  );
}
