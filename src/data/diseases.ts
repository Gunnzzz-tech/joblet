
import { Symptom } from './symptoms';

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[]; // Array of symptom IDs
  riskFactors?: string[];
}

export const diseases: Disease[] = [
  {
    id: "d1",
    name: "Vata Imbalance",
    description: "An excess of Vata dosha, characterized by dryness, coldness, and irregularity in the body.",
    symptoms: ["p1", "p3", "m1", "m3", "d4", "s3"],
    riskFactors: ["Irregular eating habits", "Lack of routine", "Excessive physical activity", "Cold, dry weather"]
  },
  {
    id: "d2",
    name: "Pitta Imbalance",
    description: "An excess of Pitta dosha, characterized by heat, acidity, and inflammation in the body.",
    symptoms: ["p1", "p5", "d1", "d5", "s1", "s2", "m5"],
    riskFactors: ["Spicy, oily foods", "Hot weather", "Intense anger or frustration", "Excessive sun exposure"]
  },
  {
    id: "d3",
    name: "Kapha Imbalance",
    description: "An excess of Kapha dosha, characterized by heaviness, congestion, and lethargy in the body.",
    symptoms: ["p6", "r4", "d6", "g2", "m2"],
    riskFactors: ["Excessive sleep", "Sweet, heavy foods", "Sedentary lifestyle", "Cold, damp weather"]
  },
  {
    id: "d4",
    name: "Amavata (Rheumatoid Arthritis)",
    description: "A condition characterized by the accumulation of ama (toxins) in the joints, causing pain and inflammation.",
    symptoms: ["p2", "p3", "p6", "g3"],
    riskFactors: ["Poor digestion", "Unhealthy diet", "Sedentary lifestyle", "Stress"]
  },
  {
    id: "d5",
    name: "Grahani (Irritable Bowel Syndrome)",
    description: "A digestive disorder characterized by alternating constipation and diarrhea, along with abdominal pain.",
    symptoms: ["d3", "d4", "d5", "d6", "p6"],
    riskFactors: ["Irregular eating habits", "Stress", "Spicy, heavy foods", "Weak digestion"]
  },
  {
    id: "d6",
    name: "Shwasa (Asthma)",
    description: "A respiratory condition characterized by breathing difficulties, wheezing, and coughing.",
    symptoms: ["r2", "r5", "p6", "r1"],
    riskFactors: ["Exposure to allergens", "Cold weather", "Respiratory infections", "Emotional stress"]
  },
  {
    id: "d7",
    name: "Ajeerna (Indigestion)",
    description: "A digestive disorder characterized by the inability to properly digest food, leading to discomfort and other symptoms.",
    symptoms: ["d1", "d5", "d6", "p6"],
    riskFactors: ["Overeating", "Eating at irregular times", "Consuming incompatible foods", "Stress while eating"]
  }
];

export const predictDiseases = (
  symptomIds: string[], 
  severities: Record<string, number>
): Array<{ disease: Disease; confidence: number }> => {
  const results = diseases.map(disease => {
    // Count how many symptoms of the disease match with the selected symptoms
    const matchingSymptoms = disease.symptoms.filter(id => symptomIds.includes(id));
    
    // Calculate a basic confidence score based on the number of matching symptoms and their severities
    let confidenceScore = matchingSymptoms.length / disease.symptoms.length;
    
    // Adjust confidence based on severity of symptoms
    if (matchingSymptoms.length > 0) {
      const severityFactor = matchingSymptoms.reduce((sum, id) => sum + (severities[id] || 1), 0) / matchingSymptoms.length;
      confidenceScore = confidenceScore * (0.5 + 0.5 * (severityFactor / 5)); // Assuming severity is 1-5
    }
    
    // Return the disease with its confidence score
    return {
      disease,
      confidence: Math.round(confidenceScore * 100)
    };
  });
  
  // Filter out diseases with very low confidence and sort by confidence in descending order
  return results
    .filter(result => result.confidence > 20)
    .sort((a, b) => b.confidence - a.confidence);
};
