
export interface Symptom {
  id: string;
  name: string;
  category: SymptomCategory;
  description?: string;
}

export enum SymptomCategory {
  Physical = "Physical",
  Mental = "Mental",
  Digestive = "Digestive",
  Respiratory = "Respiratory",
  Skin = "Skin",
  General = "General"
}

export const symptoms: Symptom[] = [
  // Physical symptoms
  { id: "p1", name: "Headache", category: SymptomCategory.Physical, description: "Pain in any region of the head" },
  { id: "p2", name: "Joint pain", category: SymptomCategory.Physical, description: "Pain, stiffness, or swelling in the joints" },
  { id: "p3", name: "Muscle weakness", category: SymptomCategory.Physical, description: "Reduced strength in one or more muscles" },
  { id: "p4", name: "Back pain", category: SymptomCategory.Physical, description: "Pain in the back region" },
  { id: "p5", name: "Fever", category: SymptomCategory.Physical, description: "Elevated body temperature" },
  { id: "p6", name: "Fatigue", category: SymptomCategory.Physical, description: "Feeling of tiredness or exhaustion" },
  
  // Mental symptoms
  { id: "m1", name: "Anxiety", category: SymptomCategory.Mental, description: "Feeling of worry, nervousness, or unease" },
  { id: "m2", name: "Depression", category: SymptomCategory.Mental, description: "Persistent feeling of sadness and loss of interest" },
  { id: "m3", name: "Insomnia", category: SymptomCategory.Mental, description: "Difficulty falling or staying asleep" },
  { id: "m4", name: "Memory issues", category: SymptomCategory.Mental, description: "Problems with remembering information" },
  { id: "m5", name: "Irritability", category: SymptomCategory.Mental, description: "Quick to anger or annoyance" },
  
  // Digestive symptoms
  { id: "d1", name: "Nausea", category: SymptomCategory.Digestive, description: "Feeling of sickness with an inclination to vomit" },
  { id: "d2", name: "Vomiting", category: SymptomCategory.Digestive, description: "Forceful expulsion of stomach contents through the mouth" },
  { id: "d3", name: "Diarrhea", category: SymptomCategory.Digestive, description: "Loose, watery bowel movements" },
  { id: "d4", name: "Constipation", category: SymptomCategory.Digestive, description: "Difficulty or infrequent bowel movements" },
  { id: "d5", name: "Abdominal pain", category: SymptomCategory.Digestive, description: "Pain in the area between the chest and groin" },
  { id: "d6", name: "Bloating", category: SymptomCategory.Digestive, description: "Feeling of fullness or swelling in the abdomen" },
  
  // Respiratory symptoms
  { id: "r1", name: "Cough", category: SymptomCategory.Respiratory, description: "Sudden expulsion of air from the lungs" },
  { id: "r2", name: "Shortness of breath", category: SymptomCategory.Respiratory, description: "Difficulty breathing or feeling breathless" },
  { id: "r3", name: "Sore throat", category: SymptomCategory.Respiratory, description: "Pain or irritation in the throat" },
  { id: "r4", name: "Congestion", category: SymptomCategory.Respiratory, description: "Feeling of stuffiness in the nasal passage" },
  { id: "r5", name: "Wheezing", category: SymptomCategory.Respiratory, description: "Breathing with a whistling or rattling sound" },
  
  // Skin symptoms
  { id: "s1", name: "Rash", category: SymptomCategory.Skin, description: "Area of red, inflamed skin" },
  { id: "s2", name: "Itching", category: SymptomCategory.Skin, description: "Irritating sensation causing a desire to scratch" },
  { id: "s3", name: "Dryness", category: SymptomCategory.Skin, description: "Lack of moisture in the skin" },
  { id: "s4", name: "Discoloration", category: SymptomCategory.Skin, description: "Change in the natural color of the skin" },
  
  // General symptoms
  { id: "g1", name: "Weight loss", category: SymptomCategory.General, description: "Unintentional decrease in body weight" },
  { id: "g2", name: "Weight gain", category: SymptomCategory.General, description: "Unintentional increase in body weight" },
  { id: "g3", name: "Swelling", category: SymptomCategory.General, description: "Enlargement of a body part due to fluid accumulation" },
  { id: "g4", name: "Dizziness", category: SymptomCategory.General, description: "Feeling faint, lightheaded, or unsteady" },
];

export const getSymptomsByCategory = (category: SymptomCategory): Symptom[] => {
  return symptoms.filter(symptom => symptom.category === category);
};

export const getSymptomById = (id: string): Symptom | undefined => {
  return symptoms.find(symptom => symptom.id === id);
};
