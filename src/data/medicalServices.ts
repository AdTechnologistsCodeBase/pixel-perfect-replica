export type MedicalServiceCategory = {
  id: string;
  title: string;
  items: readonly string[];
  availabilityNote?: string;
};

export const medicalServices: readonly MedicalServiceCategory[] = [
  {
    id: "emergency-trauma-care",
    title: "Emergency & Trauma Care",
    items: [
      "24×7 Emergency Services",
      "Road Traffic Accident (RTA) Management",
      "Trauma and Injury Assessment",
      "Bleeding and Wound Management",
      "Cuts, Lacerations and Suturing",
      "Fracture and Dislocation Assessment",
      "Initial Stabilization of Critical Patients",
      "Emergency Referral and Transfer",
    ],
    availabilityNote:
      "The hospital must confirm 24×7 emergency staffing and the availability of each listed emergency service before publication.",
  },
  {
    id: "orthopedic-services",
    title: "Orthopedic Services",
    items: [
      "Orthopedician Available 24×7",
      "Fracture Management",
      "Joint Pain and Swelling",
      "Sprains and Sports Injuries",
      "Back Pain and Neck Pain",
      "Accident-Related Orthopedic Injuries",
      "Plaster and Splint Application, if available",
    ],
    availabilityNote:
      "Confirm 24×7 orthopedician availability. Plaster and splint application is availability-dependent.",
  },
  {
    id: "general-physician-services",
    title: "General Physician Services",
    items: [
      "General Physician Available 24×7",
      "Fever and Acute Illness Management",
      "Respiratory Infections",
      "Cough, Cold and Sore Throat",
      "Abdominal Pain and Vomiting",
      "Diarrhea and Dehydration",
      "Headache and Body Ache",
      "Weakness and General Medical Assessment",
      "Bilateral Leg Swelling (B/L Leg Edema)",
    ],
    availabilityNote: "Confirm the stated 24×7 general physician availability before publication.",
  },
  {
    id: "infectious-febrile-illnesses",
    title: "Infectious & Febrile Illnesses",
    items: [
      "Dengue Fever Assessment and Management",
      "Malaria Diagnosis and Management",
      "Typhoid Fever Assessment and Treatment",
      "Viral Fever",
      "Seasonal Infections",
      "Suspected Chikungunya",
      "Fever with Low Platelet Count",
      "Fever Profile and Investigation Guidance",
    ],
  },
  {
    id: "pediatric-services",
    title: "Pediatric Services",
    items: [
      "Pediatric Consultation",
      "Fever in Children",
      "Cough, Cold and Respiratory Illnesses",
      "Vomiting and Loose Motions",
      "Dehydration Assessment",
      "Childhood Infections",
      "Growth and Nutrition Advice",
      "Pediatric Emergency Assessment",
    ],
    availabilityNote:
      "Confirm pediatric clinician availability and scheduling. No 24×7 pediatrician availability is stated.",
  },
  {
    id: "cardiac-chest-pain-services",
    title: "Cardiac & Chest Pain Services",
    items: [
      "ECG Services",
      "Chest Pain Assessment",
      "Suspected Heart Attack (Myocardial Infarction) — Initial Assessment and Stabilization",
      "Blood Pressure and Pulse Monitoring",
      "Oxygen Saturation Monitoring",
      "Initial Management of Cardiac Emergencies",
      "Emergency Referral for Advanced Cardiac Care",
    ],
    availabilityNote:
      "Confirm ECG and monitoring equipment availability. Advanced cardiac intervention and cardiac intensive care are not claimed.",
  },
  {
    id: "diabetes-hypertension-management",
    title: "Diabetes & Hypertension Management",
    items: [
      "Diabetes Mellitus Management",
      "Blood Sugar Monitoring",
      "High Blood Pressure (Hypertension) Management",
      "Uncontrolled Diabetes Assessment",
      "Diabetic Foot Assessment",
      "Chronic Disease Follow-up",
      "Lifestyle and Dietary Counselling",
    ],
  },
  {
    id: "minor-procedures-wound-care",
    title: "Minor Procedures & Wound Care",
    items: [
      "Wound Dressing",
      "Minor Cuts and Wound Assessment",
      "Suturing of Wounds, if available",
      "Burn Assessment and Initial Care",
      "Prescribed Injection Services",
      "Removal of Superficial Foreign Bodies, where appropriate",
      "Post-Injury Follow-up",
    ],
    availabilityNote:
      "Suturing is availability-dependent. Foreign-body removal is only where clinically appropriate.",
  },
  {
    id: "respiratory-general-medical-care",
    title: "Respiratory & General Medical Care",
    items: [
      "Asthma Assessment",
      "Breathlessness Evaluation",
      "COPD Exacerbation Assessment",
      "Nebulization, if indicated and available",
      "Oxygen Therapy, if equipped",
      "Respiratory Infection Management",
    ],
    availabilityNote:
      "Nebulization depends on clinical indication and availability. Oxygen therapy is only offered if the hospital is equipped.",
  },
  {
    id: "investigations-monitoring",
    title: "Investigations & Monitoring",
    items: [
      "ECG",
      "Blood Pressure Measurement",
      "Capillary Blood Glucose Testing",
      "Pulse Oximetry",
      "Temperature Monitoring",
      "Laboratory Test Coordination",
      "CBC Testing",
      "Dengue, Malaria and Typhoid Testing, where available",
    ],
    availabilityNote:
      "Confirm which tests are available on-site. Laboratory coordination does not imply that testing is performed at the hospital.",
  },
  {
    id: "preventive-follow-up-care",
    title: "Preventive & Follow-up Care",
    items: [
      "General Health Check-ups",
      "Routine Medical Consultation",
      "Medication Review",
      "Chronic Disease Monitoring",
      "Preventive Health Counselling",
      "Follow-up After Hospital Discharge",
    ],
  },
  {
    id: "dermatology-skin-diseases",
    title: "Dermatology & Skin Diseases",
    items: [
      "Acne and Pimples",
      "Chronic Skin Diseases",
      "Fungal Skin Infections",
      "Eczema and Dermatitis",
      "Psoriasis Management",
      "Allergic Skin Conditions",
      "Urticaria (Hives)",
      "Scabies and Skin Infestations",
      "Bacterial and Viral Skin Infections",
      "Cellulitis Assessment and Management",
      "Hair Fall and Scalp Disorders",
      "Dandruff",
      "Pigmentation and Melasma",
      "Nail Disorders",
      "Chronic Itching (Pruritus)",
      "Skin Rash Assessment",
      "Recurrent Skin Infections",
      "Dermatology Consultation and Follow-up",
    ],
    availabilityNote:
      "Confirm clinician availability and whether a specialist dermatologist is on-site; permanent on-site availability is not claimed.",
  },
  {
    id: "geriatric-care-doctor-home-visits",
    title: "Geriatric Care & Doctor Home Visits",
    items: [
      "Geriatric Consultation for Senior Citizens",
      "Doctor Home Visits for Elderly Patients",
      "Home Visits for Bedridden Patients",
      "Diabetes and Hypertension Management at Home",
      "Chronic Disease Management",
      "Fever and Acute Illness Assessment at Home",
      "Medication Review and Follow-up",
      "Blood Pressure and Blood Sugar Monitoring at Home",
      "Mobility and Fall-Risk Assessment",
      "Post-Hospitalization Follow-up at Home",
      "Palliative and Supportive Care Assessment",
      "Caregiver Guidance and Counselling",
    ],
    availabilityNote:
      "Service availability in Kondhwa and nearby areas of Pune, subject to appointment and doctor availability.",
  },
];
