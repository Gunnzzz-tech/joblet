
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictDiseases, Disease } from '../data/diseases';
import { Symptom, symptoms, getSymptomById } from '../data/symptoms';
import { Treatment, treatments, TreatmentCategory, getTreatmentsForDisease } from '../data/treatments';
import { AlertTriangle, Check, AlertCircle, ArrowLeft } from 'lucide-react';

interface PredictionResult {
  disease: Disease;
  confidence: number;
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [symptomDetails, setSymptomDetails] = useState<any>({});
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string | null>(null);
  const [recommendedTreatments, setRecommendedTreatments] = useState<Treatment[]>([]);
  
  useEffect(() => {
    // Retrieve data from session storage
    const storedSymptomIds = sessionStorage.getItem('selectedSymptoms');
    const storedSymptomDetails = sessionStorage.getItem('symptomDetails');
    
    if (!storedSymptomIds) {
      // Redirect back to symptom checker if no data is found
      navigate('/symptom-checker');
      return;
    }
    
    try {
      const symptomIds = JSON.parse(storedSymptomIds);
      const details = storedSymptomDetails ? JSON.parse(storedSymptomDetails) : {};
      
      // Get full symptom objects
      const fullSymptoms = symptomIds.map((id: string) => {
        const symptom = getSymptomById(id);
        if (!symptom) throw new Error(`Symptom with ID ${id} not found`);
        return symptom;
      });
      
      setSelectedSymptoms(fullSymptoms);
      setSymptomDetails(details);
      
      // Simulate calculation delay
      setTimeout(() => {
        // Generate prediction results
        const severities: Record<string, number> = {};
        symptomIds.forEach((id: string) => {
          severities[id] = details[id]?.severity || 3;
        });
        
        const predictionResults = predictDiseases(symptomIds, severities);
        setResults(predictionResults);
        
        // Select the top disease by default
        if (predictionResults.length > 0) {
          setSelectedDiseaseId(predictionResults[0].disease.id);
          setRecommendedTreatments(getTreatmentsForDisease(predictionResults[0].disease.id));
        }
        
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error processing symptom data:', error);
      navigate('/symptom-checker');
    }
  }, [navigate]);
  
  // Select a different disease to view its treatments
  const handleDiseaseSelect = (diseaseId: string) => {
    setSelectedDiseaseId(diseaseId);
    setRecommendedTreatments(getTreatmentsForDisease(diseaseId));
  };
  
  // Group treatments by category
  const treatmentsByCategory = recommendedTreatments.reduce((acc, treatment) => {
    if (!acc[treatment.category]) {
      acc[treatment.category] = [];
    }
    acc[treatment.category].push(treatment);
    return acc;
  }, {} as Record<TreatmentCategory, Treatment[]>);
  
  // Get confidence level text and color
  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 80) return { text: 'High', color: 'text-green-600' };
    if (confidence >= 50) return { text: 'Moderate', color: 'text-yellow-600' };
    return { text: 'Low', color: 'text-red-600' };
  };
  
  const selectedDisease = results.find(result => result.disease.id === selectedDiseaseId)?.disease;
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Analyzing your symptoms...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/symptom-checker')}
          className="flex items-center text-primary hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Symptom Checker
        </button>
        <h1 className="text-3xl font-bold text-primary">Analysis Results</h1>
      </div>
      
      {results.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3" />
            <div>
              <p className="font-medium text-yellow-700">No matches found</p>
              <p className="text-yellow-600">
                We couldn't find any conditions matching your symptoms. Please add more symptoms 
                or consult with a healthcare professional for a proper diagnosis.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <AlertCircle className="h-6 w-6 text-yellow-400 mr-3" />
              <div>
                <p className="font-medium text-yellow-700">Important Disclaimer</p>
                <p className="text-yellow-600">
                  This analysis is based on the symptoms you provided and is for informational purposes only. 
                  It should not be considered as a medical diagnosis. Always consult with a qualified healthcare 
                  professional for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
          
          {/* Selected Symptoms Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Your Symptoms</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedSymptoms.map(symptom => {
                  const details = symptomDetails[symptom.id];
                  return (
                    <div key={symptom.id} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">{symptom.name}</p>
                        <p className="text-sm text-gray-600">
                          {details ? (
                            <>
                              {severityOptions[details.severity - 1].label} • 
                              For {details.durationValue} {details.duration} • 
                              {frequencyOptions.find(f => f.value === details.frequency)?.label}
                            </>
                          ) : 'No details provided'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Diseases and Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold mb-3">Possible Conditions</h2>
              <div className="space-y-3">
                {results.map(result => {
                  const confidenceLevel = getConfidenceLevel(result.confidence);
                  return (
                    <div 
                      key={result.disease.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedDiseaseId === result.disease.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                      onClick={() => handleDiseaseSelect(result.disease.id)}
                    >
                      <h3 className="font-medium">{result.disease.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">Confidence:</span>
                        <span className={`text-sm font-medium ${confidenceLevel.color}`}>
                          {confidenceLevel.text} ({result.confidence}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="md:col-span-2">
              {selectedDisease && (
                <>
                  <h2 className="text-xl font-semibold mb-3">{selectedDisease.name}</h2>
                  <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-gray-700 mb-4">{selectedDisease.description}</p>
                    
                    {selectedDisease.riskFactors && (
                      <>
                        <h3 className="font-medium mb-2">Risk Factors</h3>
                        <ul className="list-disc list-inside text-gray-700">
                          {selectedDisease.riskFactors.map((factor, index) => (
                            <li key={index}>{factor}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3">Recommended Treatments</h2>
                  
                  {Object.entries(treatmentsByCategory).length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(treatmentsByCategory).map(([category, categoryTreatments]) => (
                        <div key={category} className="space-y-3">
                          <h3 className="font-medium text-lg">{category}</h3>
                          {categoryTreatments.map(treatment => (
                            <div key={treatment.id} className="bg-white rounded-lg shadow p-4">
                              <h4 className="font-medium text-primary mb-1">{treatment.name}</h4>
                              <p className="text-gray-700 mb-3">{treatment.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                {treatment.instructions && (
                                  <div>
                                    <p className="font-medium">Instructions:</p>
                                    <p>{treatment.instructions}</p>
                                  </div>
                                )}
                                
                                {treatment.dosage && (
                                  <div>
                                    <p className="font-medium">Dosage:</p>
                                    <p>{treatment.dosage}</p>
                                  </div>
                                )}
                                
                                {treatment.duration && (
                                  <div>
                                    <p className="font-medium">Duration:</p>
                                    <p>{treatment.duration}</p>
                                  </div>
                                )}
                              </div>
                              
                              {treatment.precautions && treatment.precautions.length > 0 && (
                                <div className="mt-3">
                                  <p className="font-medium text-sm">Precautions:</p>
                                  <ul className="list-disc list-inside text-sm text-gray-700">
                                    {treatment.precautions.map((precaution, index) => (
                                      <li key={index}>{precaution}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow p-4">
                      <p>No specific treatments found for this condition.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// These variables are needed by the Results component but were defined in the SymptomChecker component
// Normally we would put these in a shared file, but for simplicity we'll redefine them here
const severityOptions = [
  { value: 1, label: 'Mild' },
  { value: 2, label: 'Moderate' },
  { value: 3, label: 'Significant' },
  { value: 4, label: 'Severe' },
  { value: 5, label: 'Extreme' }
];

const frequencyOptions = [
  { value: 'rarely', label: 'Rarely (once in a while)' },
  { value: 'occasionally', label: 'Occasionally (a few times a month)' },
  { value: 'often', label: 'Often (a few times a week)' },
  { value: 'daily', label: 'Daily' },
  { value: 'constantly', label: 'Constantly (throughout the day)' }
];
