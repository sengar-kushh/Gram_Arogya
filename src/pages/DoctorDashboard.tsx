import { useState } from 'react';
import {
  Stethoscope, Activity, Wind, Thermometer, HeartPulse, AlertTriangle,
  Clock, CheckCircle2, Pill, Send, Calendar, MapPin, QrCode,
  MessageSquare, Mic, FileText, ChevronRight, User, Shield,
  type LucideIcon,
} from 'lucide-react';
import BodyMap from '@/components/BodyMap';
import QRReferralPass from '@/components/QRReferralPass';
import { useI18n, type TranslationKey } from '@/i18n';
import {
  doctorQueuePatients, mockChatMessages, mockVisitHistory,
  mockPHCMedicines, type Patient, type ChatMessage,
} from '@/data/mockData';

const vitalIcons: Record<string, LucideIcon> = {
  bp: HeartPulse,
  hr: Activity,
  o2: Wind,
  temp: Thermometer,
};

const vitalLabelKeys: Record<string, TranslationKey> = {
  bp: 'bloodPressure',
  hr: 'heartRate',
  o2: 'oxygen',
  temp: 'temp',
};

const riskColors: Record<string, { bg: string; badge: string; border: string }> = {
  high: { bg: 'bg-alert-50', badge: 'bg-alert-100 text-alert-700', border: 'border-alert-300' },
  medium: { bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700', border: 'border-amber-200' },
  low: { bg: 'bg-white', badge: 'bg-slatewarm-100 text-slatewarm-600', border: 'border-slatewarm-200' },
};

const riskFlagKeys: Record<string, TranslationKey> = {
  high: 'red',
  medium: 'yel',
  low: 'grn',
};

const riskLabelKeys: Record<string, TranslationKey> = {
  high: 'highRisk',
  medium: 'mediumRisk',
  low: 'lowRisk',
};

const messageStyle: Record<ChatMessage['sender'], { bg: string; text: string; align: string }> = {
  asha: { bg: 'bg-clinical-50 border-clinical-200', text: 'text-slatewarm-700', align: 'self-start' },
  doctor: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-slatewarm-700', align: 'self-end' },
  system: { bg: 'bg-slatewarm-100 border-slatewarm-200', text: 'text-slatewarm-600', align: 'self-center' },
};

export default function DoctorHub() {
  const { t } = useI18n();
  const [available, setAvailable] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient>(doctorQueuePatients[0]);
  const [diagnosis, setDiagnosis] = useState('Acute angina — suspected unstable angina. ECG referral recommended.');
  const [selectedMedicine, setSelectedMedicine] = useState('med2');
  const [prescriptionSent, setPrescriptionSent] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [messageInput, setMessageInput] = useState('');

  const activeMedicine = mockPHCMedicines.find((m) => m.id === selectedMedicine);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      sender: 'doctor',
      senderName: 'Dr. Mehta',
      text: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      type: 'text',
    };
    setMessages([...messages, newMsg]);
    setMessageInput('');
  };

  const waitingCount = doctorQueuePatients.length;
  const criticalCount = doctorQueuePatients.filter((p) => p.riskLevel === 'high').length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden w-full">
      {/* Sub-header: doctor stats */}
      <div className="bg-white border-b border-slatewarm-200 flex items-center justify-between px-4 lg:px-6 py-2.5 gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-clinical-100 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-clinical-700" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slatewarm-800">Dr. Mehta</p>
            <p className="text-[11px] text-slatewarm-400">{t('cardiology')} · {t('districtHospital')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">{waitingCount} {t('waiting')}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-alert-50 border border-alert-200">
              <AlertTriangle className="w-4 h-4 text-alert-600" />
              <span className="text-sm font-bold text-alert-700">{criticalCount} {t('critical')}</span>
            </div>
          </div>

          {/* Availability toggle */}
          <button
            onClick={() => setAvailable(!available)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              available
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-slatewarm-200 text-slatewarm-500 hover:bg-slatewarm-300'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${available ? 'bg-white animate-pulse' : 'bg-slatewarm-400'}`} />
            {available ? t('available') : t('offline')}
          </button>

          {/* QR referral */}
          <button
            onClick={() => setShowQR(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-clinical-50 text-clinical-600 hover:bg-clinical-100 border border-clinical-200 transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden lg:inline">{t('referralPass')}</span>
          </button>
        </div>
      </div>

      {/* 3-column layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1 — Patient Queue (25%) */}
        <div className="w-1/4 min-w-[260px] bg-white border-r border-slatewarm-200 flex flex-col">
          <div className="px-4 py-3 border-b border-slatewarm-200 flex items-center justify-between flex-shrink-0">
            <h2 className="text-xs font-bold text-slatewarm-600 uppercase tracking-wide flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-clinical-500" /> {t('aiTriageQueue')}
            </h2>
            <span className="text-[11px] font-medium text-slatewarm-400">{doctorQueuePatients.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin p-2.5 space-y-2">
            {doctorQueuePatients.map((p) => {
              const isSelected = selectedPatient.id === p.id;
              const rc = riskColors[p.riskLevel];
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? `border-clinical-400 bg-clinical-50 ring-1 ring-clinical-200`
                      : `${rc.border} ${rc.bg} hover:border-slatewarm-300`
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${p.avatarColor}`}>
                      <span className="text-xs font-bold">{p.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-slatewarm-800 truncate">{p.name}</p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold flex-shrink-0 ${rc.badge}`}>
                          {t(riskFlagKeys[p.riskLevel])}
                        </span>
                      </div>
                      <p className="text-xs text-slatewarm-500 truncate">{p.complaint}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-slatewarm-400 flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" /> {p.village}
                        </span>
                        <span className="text-slatewarm-300 text-[10px]">·</span>
                        <span className="text-[10px] text-slatewarm-400 flex items-center gap-0.5">
                          <User className="w-2.5 h-2.5" /> {p.ashaWorker}
                        </span>
                      </div>
                    </div>
                    {isSelected && <ChevronRight className="w-4 h-4 text-clinical-500 flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2 — Active Case Review (50%) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slatewarm-50">
          {/* Patient header */}
          <div className="px-5 py-3 bg-white border-b border-slatewarm-200 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedPatient.avatarColor}`}>
                <span className="text-sm font-bold">{selectedPatient.initials}</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-slatewarm-800">{selectedPatient.name}, {selectedPatient.age}{selectedPatient.sex}</h2>
                <p className="text-xs text-slatewarm-500">{selectedPatient.complaint} · {selectedPatient.village} {t('village')}</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${riskColors[selectedPatient.riskLevel].badge}`}>
              {t(riskLabelKeys[selectedPatient.riskLevel])}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
            {/* Live case feed & messaging */}
            <div className="bg-white rounded-xl border border-slatewarm-200 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slatewarm-100 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-clinical-500" />
                <h3 className="text-xs font-bold text-slatewarm-600 uppercase tracking-wide">{t('liveCaseFeed')}</h3>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium ml-auto">
                  <Shield className="w-3 h-3" /> {t('encrypted')}
                </span>
              </div>
              <div className="p-3 max-h-52 overflow-y-auto scrollbar-thin flex flex-col gap-2">
                {messages.map((msg) => {
                  const style = messageStyle[msg.sender];
                  return (
                    <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-2.5 rounded-xl border ${style.bg}`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          {msg.type === 'voice' && <Mic className="w-3 h-3 text-clinical-500" />}
                          {msg.type === 'vitals' && <Activity className="w-3 h-3 text-amber-500" />}
                          <span className="text-[10px] font-bold text-slatewarm-400">{msg.senderName}</span>
                          <span className="text-[9px] text-slatewarm-300">{msg.timestamp}</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${style.text}`}>{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Message input */}
              <div className="border-t border-slatewarm-100 p-2.5 flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t('typeMessage')}
                  className="flex-1 text-sm px-3 py-2 rounded-lg border border-slatewarm-200 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-clinical-400 text-slatewarm-700"
                />
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-clinical-500 hover:bg-clinical-600 text-white transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vitals snapshot */}
            <div className="bg-white rounded-xl border border-slatewarm-200 p-4">
              <h3 className="text-xs font-bold text-slatewarm-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-clinical-500" /> {t('capturedVitals')}
              </h3>
              <div className="grid grid-cols-4 gap-2.5">
                {([
                  { key: 'bp', value: selectedPatient.vitals.bp, unit: 'mmHg', status: selectedPatient.vitals.bp.startsWith('15') ? 'critical' : 'normal' },
                  { key: 'hr', value: selectedPatient.vitals.heartRate, unit: 'bpm', status: 'normal' },
                  { key: 'o2', value: selectedPatient.vitals.oxygen, unit: '%', status: selectedPatient.vitals.oxygen === '93%' ? 'critical' : 'normal' },
                  { key: 'temp', value: selectedPatient.vitals.temperature, unit: '', status: 'normal' },
                ] as const).map((v) => {
                  const Icon = vitalIcons[v.key];
                  const isCritical = v.status === 'critical';
                  return (
                    <div key={v.key} className={`rounded-lg p-2.5 ring-1 ${
                      isCritical ? 'bg-alert-50 ring-alert-200' : 'bg-slatewarm-50 ring-slatewarm-200'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Icon className={`w-3.5 h-3.5 ${isCritical ? 'text-alert-500' : 'text-slatewarm-400'}`} />
                        <span className="text-[10px] font-medium text-slatewarm-500 truncate">{t(vitalLabelKeys[v.key])}</span>
                      </div>
                      <p className="text-base font-bold text-slatewarm-800">{v.value}<span className="text-[10px] font-normal text-slatewarm-400 ml-0.5">{v.unit}</span></p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive body map */}
            <div className="bg-white rounded-xl border border-slatewarm-200 p-4">
              <h3 className="text-xs font-bold text-slatewarm-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-alert-500" /> {t('symptomBodyMap')}
              </h3>
              <BodyMap />
            </div>

            {/* Visit history timeline */}
            <div className="bg-white rounded-xl border border-slatewarm-200 p-4">
              <h3 className="text-xs font-bold text-slatewarm-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slatewarm-500" /> {t('patientHistory')}
              </h3>
              <div className="space-y-3">
                {mockVisitHistory.map((visit, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-clinical-500' : 'bg-slatewarm-300'}`} />
                      {i < mockVisitHistory.length - 1 && <div className="w-px h-7 bg-slatewarm-200" />}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-semibold text-slatewarm-700">{visit.reason}</p>
                      <p className="text-xs text-slatewarm-500">{visit.diagnosis}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slatewarm-400 flex items-center gap-0.5">
                          <FileText className="w-2.5 h-2.5" /> {visit.doctor}
                        </span>
                        <span className="text-slatewarm-300 text-[10px]">·</span>
                        <span className="text-[10px] text-slatewarm-400">{visit.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 — E-Prescription (25%) */}
        <div className="w-1/4 min-w-[300px] bg-white border-l border-slatewarm-200 flex flex-col">
          <div className="px-4 py-3 border-b border-slatewarm-200 flex-shrink-0">
            <h2 className="text-xs font-bold text-slatewarm-600 uppercase tracking-wide flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-clinical-500" /> {t('smartPrescription')}
            </h2>
            <p className="text-[11px] text-slatewarm-400 mt-0.5">{t('patient')}: {selectedPatient.name}</p>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
            {/* Diagnosis */}
            <div>
              <label className="text-xs font-semibold text-slatewarm-600 mb-1.5 block">{t('clinicalDiagnosis')}</label>
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                rows={3}
                className="w-full text-sm rounded-lg border border-slatewarm-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-clinical-400 resize-none text-slatewarm-700"
              />
            </div>

            {/* Medicine selection */}
            <div>
              <label className="text-xs font-semibold text-slatewarm-600 mb-1.5 block">{t('selectMedicine')}</label>
              <select
                value={selectedMedicine}
                onChange={(e) => setSelectedMedicine(e.target.value)}
                className="w-full text-sm rounded-lg border border-slatewarm-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-clinical-400 text-slatewarm-700 bg-white"
              >
                {mockPHCMedicines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} {m.inStock ? `(${m.stock} ${m.unit})` : `(${t('outOfStock')})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Dosage */}
            <div>
              <label className="text-xs font-semibold text-slatewarm-600 mb-1.5 block">{t('dosageDuration')}</label>
              <input
                type="text"
                defaultValue="1 tablet, 3x daily for 7 days"
                className="w-full text-sm rounded-lg border border-slatewarm-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-clinical-400 text-slatewarm-700"
              />
            </div>

            {/* PHC inventory tracker */}
            <div className="rounded-xl border border-slatewarm-200 overflow-hidden">
              <div className="px-3 py-2 bg-slatewarm-50 border-b border-slatewarm-200">
                <p className="text-[11px] font-bold text-slatewarm-600 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> {t('phcInventory')} · {selectedPatient.phc}
                </p>
              </div>
              <div className="p-3 space-y-2">
                {mockPHCMedicines.slice(0, 4).map((med) => (
                  <div key={med.id} className="flex items-center justify-between">
                    <span className="text-xs text-slatewarm-600">{med.name}</span>
                    {med.inStock ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {med.stock} {med.unit} {med.id === selectedMedicine ? '✓' : ''}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-alert-600">
                        <AlertTriangle className="w-3.5 h-3.5" /> {t('outOfStock')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {/* Selected medicine stock highlight */}
              {activeMedicine && (
                <div className={`px-3 py-2.5 border-t ${activeMedicine.inStock ? 'bg-emerald-50 border-emerald-200' : 'bg-alert-50 border-alert-200'}`}>
                  <p className={`text-xs font-semibold flex items-center gap-1.5 ${activeMedicine.inStock ? 'text-emerald-700' : 'text-alert-700'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${activeMedicine.inStock ? 'text-emerald-600' : 'text-alert-600'}`} />
                    {activeMedicine.inStock
                      ? `${activeMedicine.name} — ${activeMedicine.stock} ${activeMedicine.unit} ${t('available2')}`
                      : `${activeMedicine.name} — ${t('outOfStockAtPHC')}`}
                  </p>
                </div>
              )}
            </div>

            {/* Follow-up notes */}
            <div>
              <label className="text-xs font-semibold text-slatewarm-600 mb-1.5 block">{t('followupNotes')}</label>
              <textarea
                rows={2}
                defaultValue="Review after 3 days. Refer to district hospital if symptoms persist."
                className="w-full text-sm rounded-lg border border-slatewarm-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-clinical-400 resize-none text-slatewarm-700"
              />
            </div>
          </div>

          {/* Primary action */}
          <div className="p-4 border-t border-slatewarm-200 space-y-2 flex-shrink-0">
            <button
              onClick={() => setPrescriptionSent(true)}
              className={`w-full flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm transition-all ${
                prescriptionSent
                  ? 'bg-emerald-500 text-white'
                  : 'bg-clinical-500 hover:bg-clinical-600 text-white shadow-md shadow-clinical-200'
              }`}
            >
              {prescriptionSent ? (
                <><CheckCircle2 className="w-5 h-5" /> {t('prescriptionSent')}</>
              ) : (
                <><Send className="w-5 h-5" /> {t('signPrescription')}</>
              )}
            </button>
            <button
              onClick={() => setShowQR(true)}
              className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-semibold bg-slatewarm-100 hover:bg-slatewarm-200 text-slatewarm-700 transition-colors"
            >
              <QrCode className="w-4 h-4" /> {t('generateQRReferral')}
            </button>
          </div>
        </div>
      </div>

      {/* QR Referral modal */}
      {showQR && (
        <QRReferralPass
          patientName={selectedPatient.name}
          patientAge={selectedPatient.age}
          village={selectedPatient.village}
          phc={selectedPatient.phc}
          diagnosis={diagnosis}
          hospital="District General Hospital, Palwal"
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
}
