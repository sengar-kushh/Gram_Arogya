import { createContext, useContext } from 'react';
import type { Language } from '../data/mockData';

export type TranslationKey =
  | 'ruralHealthPlatform'
  | 'ashaFrontline'
  | 'asha'
  | 'doctorHub'
  | 'doctor'
  | 'offlineReady'
  | 'autoSyncActive'
  | 'outbreakAlert'
  | 'ashaWorker'
  | 'banpurVillage'
  | 'aiVoiceTriage'
  | 'tapToSpeak'
  | 'listening'
  | 'transcribing'
  | 'aiTranscript'
  | 'registerNewPatient'
  | 'triageVisitQueue'
  | 'active'
  | 'emergency'
  | 'maternal'
  | 'ready'
  | 'submitPriorityCaseReview'
  | 'recordVitals'
  | 'medicinesReadyAtPHC'
  | 'recordsPendingSync'
  | 'home'
  | 'offlineQueue'
  | 'villageRoster'
  | 'sos'
  | 'cardiology'
  | 'districtHospital'
  | 'waiting'
  | 'critical'
  | 'available'
  | 'offline'
  | 'referralPass'
  | 'aiTriageQueue'
  | 'red'
  | 'yel'
  | 'grn'
  | 'highRisk'
  | 'mediumRisk'
  | 'lowRisk'
  | 'liveCaseFeed'
  | 'encrypted'
  | 'typeMessage'
  | 'capturedVitals'
  | 'bloodPressure'
  | 'heartRate'
  | 'oxygen'
  | 'temp'
  | 'symptomBodyMap'
  | 'symptomMap'
  | 'autoPopulated'
  | 'chest'
  | 'lungs'
  | 'high'
  | 'med'
  | 'patientHistory'
  | 'smartPrescription'
  | 'patient'
  | 'clinicalDiagnosis'
  | 'selectMedicine'
  | 'outOfStock'
  | 'dosageDuration'
  | 'phcInventory'
  | 'inStock'
  | 'available2'
  | 'outOfStockAtPHC'
  | 'followupNotes'
  | 'signPrescription'
  | 'prescriptionSent'
  | 'generateQRReferral'
  | 'hospitalReferralPass'
  | 'from'
  | 'diagnosis'
  | 'referredTo'
  | 'presentQR'
  | 'copyReferralDetails'
  | 'referralCopied'
  | 'village';

type TranslationDict = Record<TranslationKey, string>;

export const translations: Record<Language, TranslationDict> = {
  EN: {
    ruralHealthPlatform: 'Rural Health Platform',
    ashaFrontline: 'ASHA Frontline',
    asha: 'ASHA',
    doctorHub: 'Doctor Hub',
    doctor: 'Doctor',
    offlineReady: 'Offline-Ready',
    autoSyncActive: 'Auto-Sync Active',
    outbreakAlert: 'Alert: 4 Seasonal Dengue Cases in Ward 3',
    ashaWorker: 'ASHA Worker',
    banpurVillage: 'Banpur Village',
    aiVoiceTriage: 'AI Voice Triage',
    tapToSpeak: 'Tap to speak patient symptoms in local language',
    listening: 'Listening...',
    transcribing: 'Transcribing (AI)...',
    aiTranscript: 'AI Transcript (Marathi → English):',
    registerNewPatient: 'Register New Patient Profile',
    triageVisitQueue: 'Triage & Visit Queue',
    active: 'active',
    emergency: 'EMERGENCY',
    maternal: 'MATERNAL',
    ready: 'READY',
    submitPriorityCaseReview: 'Submit Priority Case Review',
    recordVitals: 'Record Vitals',
    medicinesReadyAtPHC: 'Medicines Ready at Village PHC',
    recordsPendingSync: 'records pending sync — will upload when connection restores',
    home: 'Home',
    offlineQueue: 'Offline Queue',
    villageRoster: 'Village Roster',
    sos: 'SOS',
    cardiology: 'Cardiology',
    districtHospital: 'District Hospital',
    waiting: 'Waiting',
    critical: 'Critical',
    available: 'Available',
    offline: 'Offline',
    referralPass: 'Referral Pass',
    aiTriageQueue: 'AI-Triage Queue',
    red: 'RED',
    yel: 'YEL',
    grn: 'GRN',
    highRisk: 'HIGH RISK',
    mediumRisk: 'MEDIUM RISK',
    lowRisk: 'LOW RISK',
    liveCaseFeed: 'Live Case Feed & Secure Messaging',
    encrypted: 'Encrypted',
    typeMessage: 'Type a message to ASHA worker...',
    capturedVitals: 'Captured Vitals',
    bloodPressure: 'Blood Pressure',
    heartRate: 'Heart Rate',
    oxygen: 'Oxygen',
    temp: 'Temp',
    symptomBodyMap: 'Interactive Symptom Body Map',
    symptomMap: 'Symptom Map',
    autoPopulated: 'Auto-populated from ASHA voice input',
    chest: 'chest',
    lungs: 'lungs',
    high: 'HIGH',
    med: 'MED',
    patientHistory: 'Longitudinal Patient History',
    smartPrescription: 'Smart E-Prescription',
    patient: 'Patient',
    clinicalDiagnosis: 'Clinical Diagnosis',
    selectMedicine: 'Select Medicine',
    outOfStock: 'Out of Stock',
    dosageDuration: 'Dosage & Duration',
    phcInventory: 'PHC Inventory',
    inStock: 'In Stock',
    available2: 'available',
    outOfStockAtPHC: 'Out of stock at PHC',
    followupNotes: 'Follow-up & Advisory Notes',
    signPrescription: 'Sign Digital Prescription & Dispatch SMS',
    prescriptionSent: 'Prescription Signed & SMS Sent',
    generateQRReferral: 'Generate QR Hospital Referral',
    hospitalReferralPass: 'Hospital Referral Pass',
    from: 'From',
    diagnosis: 'Diagnosis',
    referredTo: 'Referred To',
    presentQR: 'Present this QR at the hospital reception for fast-track admission',
    copyReferralDetails: 'Copy referral details',
    referralCopied: 'Referral details copied!',
    village: 'Village',
  },
  HI: {
    ruralHealthPlatform: 'ग्रामीण स्वास्थ्य मंच',
    ashaFrontline: 'आशा फ्रंटलाइन',
    asha: 'आशा',
    doctorHub: 'डॉक्टर हब',
    doctor: 'डॉक्टर',
    offlineReady: 'ऑफलाइन-तैयार',
    autoSyncActive: 'ऑटो-सिंक सक्रिय',
    outbreakAlert: 'चेतावनी: वार्ड 3 में 4 मौसमी डेंगू के मामले',
    ashaWorker: 'आशा कार्यकर्ता',
    banpurVillage: 'बानपुर गाँव',
    aiVoiceTriage: 'एआई वॉइस ट्रायज',
    tapToSpeak: 'स्थानीय भाषा में मरीज के लक्षण बोलने के लिए टैप करें',
    listening: 'सुन रहा है...',
    transcribing: 'ट्रांसक्रिप्ट (एआई)...',
    aiTranscript: 'एआई प्रतिलेख (मराठी → अंग्रेज़ी):',
    registerNewPatient: 'नया मरीज रजिस्टर करें',
    triageVisitQueue: 'ट्रायज और विज़िट कतार',
    active: 'सक्रिय',
    emergency: 'आपातकाल',
    maternal: 'गर्भावस्था',
    ready: 'तैयार',
    submitPriorityCaseReview: 'प्राथमिकता केस समीक्षा जमा करें',
    recordVitals: 'वाइटल्स रिकॉर्ड करें',
    medicinesReadyAtPHC: 'गाँव पीएचसी पर दवाएँ तैयार',
    recordsPendingSync: 'रिकॉर्ड सिंक लंबित — कनेक्शन आने पर अपलोड होगा',
    home: 'होम',
    offlineQueue: 'ऑफलाइन कतार',
    villageRoster: 'गाँव सूची',
    sos: 'एसओएस',
    cardiology: 'हृदय रोग',
    districtHospital: 'ज़िला अस्पताल',
    waiting: 'प्रतीक्षा',
    critical: 'गंभीर',
    available: 'उपलब्ध',
    offline: 'ऑफलाइन',
    referralPass: 'रेफरल पास',
    aiTriageQueue: 'एआई-ट्रायज कतार',
    red: 'लाल',
    yel: 'पीला',
    grn: 'हरा',
    highRisk: 'उच्च जोखिम',
    mediumRisk: 'मध्यम जोखिम',
    lowRisk: 'निम्न जोखिम',
    liveCaseFeed: 'लाइव केस फ़ीड और सुरक्षित संदेश',
    encrypted: 'एन्क्रिप्टेड',
    typeMessage: 'आशा कार्यकर्ता को संदेश लिखें...',
    capturedVitals: 'दर्ज वाइटल्स',
    bloodPressure: 'रक्तचाप',
    heartRate: 'हृदय गति',
    oxygen: 'ऑक्सीजन',
    temp: 'तापमान',
    symptomBodyMap: 'इंटरैक्टिव लक्षण बॉडी मैप',
    symptomMap: 'लक्षण मानचित्र',
    autoPopulated: 'आशा वॉइस इनपुट से स्वतः भरा',
    chest: 'छाती',
    lungs: 'फेफड़े',
    high: 'उच्च',
    med: 'मध्यम',
    patientHistory: 'दीर्घकालिक मरीज इतिहास',
    smartPrescription: 'स्मार्ट ई-प्रिस्क्रिप्शन',
    patient: 'मरीज',
    clinicalDiagnosis: 'नैदानिक निदान',
    selectMedicine: 'दवा चुनें',
    outOfStock: 'स्टॉक नहीं',
    dosageDuration: 'खुराक और अवधि',
    phcInventory: 'पीएचसी इन्वेंटरी',
    inStock: 'स्टॉक में',
    available2: 'उपलब्ध',
    outOfStockAtPHC: 'पीएचसी पर स्टॉक नहीं',
    followupNotes: 'फॉलो-अप और सलाह नोट्स',
    signPrescription: 'डिजिटल प्रिस्क्रिप्शन पर हस्ताक्षर और एसएमएस भेजें',
    prescriptionSent: 'प्रिस्क्रिप्शन पर हस्ताक्षर और एसएमएस भेजा गया',
    generateQRReferral: 'क्यूआर अस्पताल रेफरल बनाएं',
    hospitalReferralPass: 'अस्पताल रेफरल पास',
    from: 'से',
    diagnosis: 'निदान',
    referredTo: 'रेफर किया गया',
    presentQR: 'फास्ट-ट्रैक प्रवेश के लिए अस्पताल रिसेप्शन पर यह क्यूआर दिखाएं',
    copyReferralDetails: 'रेफरल विवरण कॉपी करें',
    referralCopied: 'रेफरल विवरण कॉपी हो गए!',
    village: 'गाँव',
  },
  MR: {
    ruralHealthPlatform: 'ग्रामीण आरोग्य मंच',
    ashaFrontline: 'आशा फ्रंटलाइन',
    asha: 'आशा',
    doctorHub: 'डॉक्टर हब',
    doctor: 'डॉक्टर',
    offlineReady: 'ऑफलाइन-तयार',
    autoSyncActive: 'ऑटो-सिंक सक्रिय',
    outbreakAlert: 'सूचना: वार्ड 3 मध्ये 4 हंगामी डेंगू रुग्ण',
    ashaWorker: 'आशा कार्यकर्ती',
    banpurVillage: 'बानपूर गाव',
    aiVoiceTriage: 'एआय व्हॉइस ट्रायज',
    tapToSpeak: 'स्थानिक भाषेत रुग्णाची लक्षणे बोलण्यासाठी टॅप करा',
    listening: 'ऐकत आहे...',
    transcribing: 'ट्रान्सक्रिबिंग (एआय)...',
    aiTranscript: 'एआय प्रतिलेख (मराठी → इंग्रजी):',
    registerNewPatient: 'नवीन रुग्ण नोंदवा',
    triageVisitQueue: 'ट्रायज आणि भेट रांग',
    active: 'सक्रिय',
    emergency: 'आपत्कालीन',
    maternal: 'गर्भावस्था',
    ready: 'तयार',
    submitPriorityCaseReview: 'प्राधान्य केस समीक्षा सादर करा',
    recordVitals: 'व्हायटल्स नोंदवा',
    medicinesReadyAtPHC: 'गाव पीएचसी मध्ये औषधे तयार',
    recordsPendingSync: 'रेकॉर्ड सिंक प्रलंबित — कनेक्शन आल्यावर अपलोड होईल',
    home: 'होम',
    offlineQueue: 'ऑफलाइन रांग',
    villageRoster: 'गाव यादी',
    sos: 'एसओएस',
    cardiology: 'हृदयरोग',
    districtHospital: 'जिल्हा रुग्णालय',
    waiting: 'प्रतीक्षा',
    critical: 'गंभीर',
    available: 'उपलब्ध',
    offline: 'ऑफलाइन',
    referralPass: 'रेफरल पास',
    aiTriageQueue: 'एआय-ट्रायज रांग',
    red: 'लाल',
    yel: 'पिवळे',
    grn: 'हिरवे',
    highRisk: 'उच्च जोखीम',
    mediumRisk: 'मध्यम जोखीम',
    lowRisk: 'कमी जोखीम',
    liveCaseFeed: 'लाइव्ह केस फीड आणि सुरक्षित संदेश',
    encrypted: 'एन्क्रिप्टेड',
    typeMessage: 'आशा कार्यकर्तीला संदेश लिहा...',
    capturedVitals: 'नोंदलेले व्हायटल्स',
    bloodPressure: 'रक्तदाब',
    heartRate: 'हृदय गती',
    oxygen: 'ऑक्सिजन',
    temp: 'तापमान',
    symptomBodyMap: 'इंटरॅक्टिव्ह लक्षण बॉडी मॅप',
    symptomMap: 'लक्षण नकाशा',
    autoPopulated: 'आशा व्हॉइस इनपुटवरून स्वयंचलित',
    chest: 'छाती',
    lungs: 'फेफडे',
    high: 'उच्च',
    med: 'मध्यम',
    patientHistory: 'दीर्घकालीन रुग्ण इतिहास',
    smartPrescription: 'स्मार्ट ई-प्रिस्क्रिप्शन',
    patient: 'रुग्ण',
    clinicalDiagnosis: 'नैदानिक निदान',
    selectMedicine: 'औषध निवडा',
    outOfStock: 'स्टॉक नाही',
    dosageDuration: 'डोस आणि कालावधी',
    phcInventory: 'पीएचसी इन्व्हेंटरी',
    inStock: 'स्टॉकमध्ये',
    available2: 'उपलब्ध',
    outOfStockAtPHC: 'पीएचसी मध्ये स्टॉक नाही',
    followupNotes: 'फॉलो-अप आणि सल्ला नोट्स',
    signPrescription: 'डिजिटल प्रिस्क्रिप्शनवर स्वाक्षरी आणि एसएमएस पाठवा',
    prescriptionSent: 'प्रिस्क्रिप्शनवर स्वाक्षरी आणि एसएमएस पाठवले',
    generateQRReferral: 'क्यूआर रुग्णालय रेफरल तयार करा',
    hospitalReferralPass: 'रुग्णालय रेफरल पास',
    from: 'कडून',
    diagnosis: 'निदान',
    referredTo: 'रेफर केले',
    presentQR: 'फास्ट-ट्रॅक प्रवेशासाठी रुग्णालय रिसेप्शनवर हे क्यूआर दाखवा',
    copyReferralDetails: 'रेफरल तपशील कॉपी करा',
    referralCopied: 'रेफरल तपशील कॉपी झाले!',
    village: 'गाव',
  },
};

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const I18nContext = createContext<I18nContextValue>({
  language: 'EN',
  setLanguage: () => {},
  t: (key) => translations.EN[key],
});

export function useI18n() {
  return useContext(I18nContext);
}
