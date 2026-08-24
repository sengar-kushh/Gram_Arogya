export type Role = 'asha' | 'doctor';

export type Language = 'EN' | 'HI' | 'MR';

export type TriageFlag = 'emergency' | 'maternal' | 'prescription';

export type RiskLevel = 'high' | 'medium' | 'low';

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
  complaint: string;
  flag: TriageFlag;
  riskLevel: RiskLevel;
  village: string;
  phc: string;
  ashaWorker: string;
  avatarColor: string;
  initials: string;
  vitals: {
    bp: string;
    heartRate: string;
    oxygen: string;
    temperature: string;
  };
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'asha' | 'doctor' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  type: 'text' | 'voice' | 'vitals' | 'image';
}

export interface VisitHistoryEntry {
  date: string;
  reason: string;
  doctor: string;
  diagnosis: string;
}

export interface BodyMarker {
  id: string;
  region: 'chest' | 'lungs' | 'abdomen';
  label: string;
  severity: 'high' | 'medium';
  x: number;
  y: number;
}

export interface PHCMedicine {
  id: string;
  name: string;
  stock: number;
  unit: string;
  inStock: boolean;
}

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Ramesh Pawar',
    age: 55,
    sex: 'M',
    complaint: 'Chest Tightness & Dyspnea',
    flag: 'emergency',
    riskLevel: 'high',
    village: 'Banpur',
    phc: 'Palwal Village PHC',
    ashaWorker: 'Sarita Kumari',
    avatarColor: 'bg-alert-100 text-alert-700',
    initials: 'RP',
    vitals: { bp: '150/95', heartRate: '104 bpm', oxygen: '93%', temperature: '98.6°F' },
    submittedAt: '2 min ago',
  },
  {
    id: 'p2',
    name: 'Sunita Devi',
    age: 28,
    sex: 'F',
    complaint: 'Trimester 3 Routine Check',
    flag: 'maternal',
    riskLevel: 'medium',
    village: 'Khedi',
    phc: 'Khedi PHC',
    ashaWorker: 'Sarita Kumari',
    avatarColor: 'bg-clinical-100 text-clinical-700',
    initials: 'SD',
    vitals: { bp: '120/80', heartRate: '82 bpm', oxygen: '98%', temperature: '98.4°F' },
    submittedAt: '15 min ago',
  },
  {
    id: 'p3',
    name: 'Anil Kumar',
    age: 12,
    sex: 'M',
    complaint: 'Viral Fever',
    flag: 'prescription',
    riskLevel: 'low',
    village: 'Banpur',
    phc: 'Palwal Village PHC',
    ashaWorker: 'Sarita Kumari',
    avatarColor: 'bg-emerald-100 text-emerald-700',
    initials: 'AK',
    vitals: { bp: '110/70', heartRate: '90 bpm', oxygen: '97%', temperature: '101.2°F' },
    submittedAt: '1 hr ago',
  },
];

export const doctorQueuePatients: Patient[] = [
  mockPatients[0],
  {
    id: 'd2',
    name: 'Priya Sharma',
    age: 34,
    sex: 'F',
    complaint: 'Skin Rash — Allergic',
    flag: 'maternal',
    riskLevel: 'low',
    village: 'Khedi',
    phc: 'Khedi PHC',
    ashaWorker: 'Meena Devi',
    avatarColor: 'bg-clinical-100 text-clinical-700',
    initials: 'PS',
    vitals: { bp: '118/76', heartRate: '78 bpm', oxygen: '99%', temperature: '98.8°F' },
    submittedAt: '8 min ago',
  },
  {
    id: 'd3',
    name: 'Mohammed Irfan',
    age: 47,
    sex: 'M',
    complaint: 'Diabetes Review — High Sugar',
    flag: 'emergency',
    riskLevel: 'medium',
    village: 'Banpur',
    phc: 'Palwal Village PHC',
    ashaWorker: 'Sarita Kumari',
    avatarColor: 'bg-amber-100 text-amber-700',
    initials: 'MI',
    vitals: { bp: '138/88', heartRate: '88 bpm', oxygen: '96%', temperature: '98.4°F' },
    submittedAt: '12 min ago',
  },
  {
    id: 'd4',
    name: 'Lakshmi Nair',
    age: 62,
    sex: 'F',
    complaint: 'Joint Pain — Arthritis',
    flag: 'maternal',
    riskLevel: 'low',
    village: 'Khedi',
    phc: 'Khedi PHC',
    ashaWorker: 'Meena Devi',
    avatarColor: 'bg-emerald-100 text-emerald-700',
    initials: 'LN',
    vitals: { bp: '130/82', heartRate: '72 bpm', oxygen: '97%', temperature: '98.2°F' },
    submittedAt: '20 min ago',
  },
  {
    id: 'd5',
    name: 'Vikram Singh',
    age: 9,
    sex: 'M',
    complaint: 'High Fever — Suspected Dengue',
    flag: 'emergency',
    riskLevel: 'medium',
    village: 'Banpur',
    phc: 'Palwal Village PHC',
    ashaWorker: 'Sarita Kumari',
    avatarColor: 'bg-amber-100 text-amber-700',
    initials: 'VS',
    vitals: { bp: '105/68', heartRate: '110 bpm', oxygen: '95%', temperature: '103.1°F' },
    submittedAt: '25 min ago',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'asha',
    senderName: 'Sarita (ASHA)',
    text: 'Patient reports chest tightness since morning, worsening after walking. No prior cardiac history.',
    timestamp: '10:32 AM',
    type: 'text',
  },
  {
    id: 'm2',
    sender: 'asha',
    senderName: 'Sarita (ASHA)',
    text: 'Voice note transcribed (Marathi): "Mohra aala aahe, tupe udak kele aale nahi" → "Breathing is heavy, cannot lie flat."',
    timestamp: '10:34 AM',
    type: 'voice',
  },
  {
    id: 'm3',
    sender: 'system',
    senderName: 'System',
    text: 'Vitals captured by ASHA: BP 150/95 mmHg | HR 104 bpm | O2 93% | Temp 98.6°F',
    timestamp: '10:35 AM',
    type: 'vitals',
  },
  {
    id: 'm4',
    sender: 'doctor',
    senderName: 'Dr. Mehta',
    text: 'Received. BP is elevated with low O2 — recommending immediate ECG referral. Please keep patient seated upright.',
    timestamp: '10:37 AM',
    type: 'text',
  },
];

export const mockVisitHistory: VisitHistoryEntry[] = [
  { date: 'Aug 24, 2026', reason: 'Chest tightness — acute onset', doctor: 'Dr. Mehta (Cardiology)', diagnosis: 'Suspected unstable angina' },
  { date: 'Aug 10, 2026', reason: 'Hypertension follow-up', doctor: 'Dr. Mehta (Cardiology)', diagnosis: 'Stage 2 hypertension — on Amlodipine' },
  { date: 'Jul 28, 2026', reason: 'Annual health screening', doctor: 'Dr. Rao (General Medicine)', diagnosis: 'Mild dyslipidemia' },
  { date: 'Jun 15, 2026', reason: 'Routine check — no complaints', doctor: 'Dr. Rao (General Medicine)', diagnosis: 'Healthy — advised diet modification' },
];

export const mockBodyMarkers: BodyMarker[] = [
  { id: 'b1', region: 'chest', label: 'Chest tightness — central', severity: 'high', x: 50, y: 32 },
  { id: 'b2', region: 'lungs', label: 'Dyspnea — bilateral', severity: 'high', x: 42, y: 38 },
  { id: 'b3', region: 'lungs', label: 'Dyspnea — bilateral', severity: 'high', x: 58, y: 38 },
];

export const mockPHCMedicines: PHCMedicine[] = [
  { id: 'med1', name: 'Paracetamol 650mg', stock: 85, unit: 'tablets', inStock: true },
  { id: 'med2', name: 'Amoxicillin 500mg', stock: 42, unit: 'strips', inStock: true },
  { id: 'med3', name: 'Amlodipine 5mg', stock: 18, unit: 'tablets', inStock: true },
  { id: 'med4', name: 'Metformin 500mg', stock: 0, unit: 'strips', inStock: false },
  { id: 'med5', name: 'Atorvastatin 10mg', stock: 0, unit: 'strips', inStock: false },
  { id: 'med6', name: 'Cetirizine 10mg', stock: 60, unit: 'tablets', inStock: true },
];

export const offlineQueueCount = 2;

export const outbreakAlertText = 'Alert: 4 Seasonal Dengue Cases in Ward 3';
