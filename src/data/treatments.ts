
export interface Treatment {
  id: string;
  name: string;
  diseaseIds: string[]; // Which diseases this treatment is for
  category: TreatmentCategory;
  description: string;
  instructions?: string;
  dosage?: string;
  duration?: string;
  precautions?: string[];
}

export enum TreatmentCategory {
  HerbalRemedy = "Herbal Remedy",
  AyurvedicOil = "Ayurvedic Oil",
  DietaryRecommendation = "Dietary Recommendation",
  LifestyleChange = "Lifestyle Change",
  YogaAsana = "Yoga Asana",
  PanchakarmaTreatment = "Panchakarma Treatment"
}

export const treatments: Treatment[] = [
  // Herbal Remedies
  {
    id: "hr1",
    name: "Ashwagandha",
    diseaseIds: ["d1", "d3"],
    category: TreatmentCategory.HerbalRemedy,
    description: "An adaptogenic herb that helps reduce stress, anxiety, and fatigue.",
    dosage: "1-2 teaspoons of powder mixed with warm milk or water, twice daily.",
    duration: "3-6 months for optimal results.",
    precautions: ["Not recommended during pregnancy", "May interact with certain medications"]
  },
  {
    id: "hr2",
    name: "Turmeric",
    diseaseIds: ["d2", "d4"],
    category: TreatmentCategory.HerbalRemedy,
    description: "Anti-inflammatory herb with powerful healing properties.",
    dosage: "1/2-1 teaspoon mixed with warm milk or water, twice daily.",
    duration: "2-3 months for optimal results.",
    precautions: ["May interact with blood-thinning medications", "Not recommended in high doses for those with gallbladder issues"]
  },
  {
    id: "hr3",
    name: "Triphala",
    diseaseIds: ["d3", "d5", "d7"],
    category: TreatmentCategory.HerbalRemedy,
    description: "A combination of three fruits that aids digestion and detoxification.",
    dosage: "1/2-1 teaspoon mixed with warm water, before bedtime.",
    duration: "1-3 months for optimal results.",
    precautions: ["Not recommended during pregnancy", "May cause loose stools initially"]
  },
  
  // Ayurvedic Oils
  {
    id: "ao1",
    name: "Mahanarayan Oil",
    diseaseIds: ["d1", "d4"],
    category: TreatmentCategory.AyurvedicOil,
    description: "An oil that alleviates joint pain, muscle stiffness, and inflammation.",
    instructions: "Warm the oil and massage into affected areas for 10-15 minutes.",
    duration: "Apply daily for 2-3 months.",
    precautions: ["Perform a patch test before use", "Avoid applying on broken skin"]
  },
  {
    id: "ao2",
    name: "Brahmi Oil",
    diseaseIds: ["d1"],
    category: TreatmentCategory.AyurvedicOil,
    description: "An oil that promotes mental clarity, reduces stress, and supports brain health.",
    instructions: "Warm the oil and massage into the scalp for 10-15 minutes.",
    duration: "Apply 2-3 times a week for 2-3 months.",
    precautions: ["Perform a patch test before use", "Avoid applying on broken skin"]
  },
  
  // Dietary Recommendations
  {
    id: "dr1",
    name: "Vata-Pacifying Diet",
    diseaseIds: ["d1"],
    category: TreatmentCategory.DietaryRecommendation,
    description: "A diet that helps balance Vata dosha with warm, moist, and nourishing foods.",
    instructions: "Favor warm, cooked foods with healthy oils. Include sweet, sour, and salty tastes.",
    duration: "Follow consistently for at least 3 months.",
    precautions: ["Adjust based on individual tolerances", "Consider consulting with an Ayurvedic practitioner"]
  },
  {
    id: "dr2",
    name: "Pitta-Pacifying Diet",
    diseaseIds: ["d2"],
    category: TreatmentCategory.DietaryRecommendation,
    description: "A diet that helps balance Pitta dosha with cooling, non-spicy foods.",
    instructions: "Favor cool or warm (not hot) foods. Include sweet, bitter, and astringent tastes.",
    duration: "Follow consistently for at least 3 months.",
    precautions: ["Adjust based on individual tolerances", "Consider consulting with an Ayurvedic practitioner"]
  },
  {
    id: "dr3",
    name: "Kapha-Pacifying Diet",
    diseaseIds: ["d3"],
    category: TreatmentCategory.DietaryRecommendation,
    description: "A diet that helps balance Kapha dosha with light, warm, and stimulating foods.",
    instructions: "Favor warm, light foods with minimal oil. Include pungent, bitter, and astringent tastes.",
    duration: "Follow consistently for at least 3 months.",
    precautions: ["Adjust based on individual tolerances", "Consider consulting with an Ayurvedic practitioner"]
  },
  
  // Lifestyle Changes
  {
    id: "lc1",
    name: "Daily Routine (Dinacharya)",
    diseaseIds: ["d1", "d2", "d3"],
    category: TreatmentCategory.LifestyleChange,
    description: "A structured daily routine that aligns with natural rhythms to promote balance and health.",
    instructions: "Wake up before sunrise, practice morning hygiene, exercise, meditate, and eat meals at regular times.",
    duration: "Implement consistently for at least 1 month to establish the routine.",
    precautions: ["Start with small changes and gradually build up", "Adjust based on individual needs and schedules"]
  },
  {
    id: "lc2",
    name: "Stress Management Techniques",
    diseaseIds: ["d1", "d2", "d5", "d6"],
    category: TreatmentCategory.LifestyleChange,
    description: "Practices to reduce stress and promote mental well-being.",
    instructions: "Practice deep breathing, meditation, and mindfulness for 15-30 minutes daily.",
    duration: "Implement consistently for at least 3 months.",
    precautions: ["Start with short sessions and gradually increase", "Consider learning from a qualified instructor"]
  },
  
  // Yoga Asanas
  {
    id: "ya1",
    name: "Pranayama (Breathing Exercises)",
    diseaseIds: ["d1", "d6"],
    category: TreatmentCategory.YogaAsana,
    description: "Controlled breathing techniques that improve lung function and reduce stress.",
    instructions: "Practice alternate nostril breathing (Nadi Shodhana) for 5-10 minutes daily.",
    duration: "Practice consistently for at least 3 months.",
    precautions: ["Perform on an empty stomach", "Start slowly and gradually increase duration", "Learn from a qualified instructor"]
  },
  {
    id: "ya2",
    name: "Gentle Yoga Sequence",
    diseaseIds: ["d1", "d3", "d4"],
    category: TreatmentCategory.YogaAsana,
    description: "A series of gentle yoga poses that improve flexibility, strength, and balance.",
    instructions: "Practice for 15-30 minutes daily, focusing on proper alignment and breathing.",
    duration: "Practice consistently for at least 3 months.",
    precautions: ["Modify poses based on individual capabilities", "Avoid poses that cause pain", "Learn from a qualified instructor"]
  },
  
  // Panchakarma Treatments
  {
    id: "pt1",
    name: "Abhyanga (Oil Massage)",
    diseaseIds: ["d1", "d3", "d4"],
    category: TreatmentCategory.PanchakarmaTreatment,
    description: "A full-body oil massage that nourishes tissues, reduces stress, and promotes detoxification.",
    instructions: "Receive from a trained practitioner or perform self-massage with appropriate oils.",
    duration: "1-7 days as part of a Panchakarma treatment, or weekly for maintenance.",
    precautions: ["Not recommended during acute illness or fever", "Should be performed under guidance for certain conditions"]
  },
  {
    id: "pt2",
    name: "Nasya (Nasal Administration)",
    diseaseIds: ["d1", "d6"],
    category: TreatmentCategory.PanchakarmaTreatment,
    description: "Administration of herbal oils or powders through the nasal passage to clear airways and improve brain function.",
    instructions: "Receive from a trained practitioner or perform simple self-nasya with appropriate oils.",
    duration: "3-7 days as part of a Panchakarma treatment, or weekly for maintenance.",
    precautions: ["Not recommended during acute respiratory infections", "Should be performed under guidance"]
  }
];

export const getTreatmentsForDisease = (diseaseId: string): Treatment[] => {
  return treatments.filter(treatment => treatment.diseaseIds.includes(diseaseId));
};

export const getTreatmentsByCategory = (category: TreatmentCategory): Treatment[] => {
  return treatments.filter(treatment => treatment.category === category);
};
