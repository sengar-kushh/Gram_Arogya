import { useState } from 'react';
import {
  UserPlus, AlertTriangle, Clock, Pill, ChevronRight,
  Home, RefreshCw, Users, Siren, MapPin, Activity,
  type LucideIcon,
} from 'lucide-react';
import AudioWaveform from '@/components/AudioWaveform';
import { useI18n, type TranslationKey } from '@/i18n';
import { mockPatients, offlineQueueCount, type Patient, type TriageFlag } from '@/data/mockData';

const flagConfig: Record<TriageFlag, {
  ring: string;
  badge: string;
  button: string;
  icon: LucideIcon;
  labelKey: TranslationKey;
}> = {
  emergency: {
    ring: 'ring-alert-300',
    badge: 'bg-alert-100 text-alert-700',
    button: 'bg-alert-500 hover:bg-alert-600 text-white',
    icon: AlertTriangle,
    labelKey: 'submitPriorityCaseReview',
  },
  maternal: {
    ring: 'ring-clinical-300',
    badge: 'bg-clinical-100 text-clinical-700',
    button: 'bg-clinical-500 hover:bg-clinical-600 text-white',
    icon: Clock,
    labelKey: 'recordVitals',
  },
  prescription: {
    ring: 'ring-emerald-300',
    badge: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    icon: Pill,
    labelKey: 'medicinesReadyAtPHC',
  },
};

const flagBadgeKey: Record<TriageFlag, TranslationKey> = {
  emergency: 'emergency',
  maternal: 'maternal',
  prescription: 'ready',
};

export default function AshaFrontline() {
  const { t } = useI18n();
  const [activeNav, setActiveNav] = useState('home');
  const [patients] = useState<Patient[]>(mockPatients);

  const bottomNav: { id: string; labelKey: TranslationKey; icon: typeof Home; badge: number }[] = [
    { id: 'home', labelKey: 'home', icon: Home, badge: 0 },
    { id: 'queue', labelKey: 'offlineQueue', icon: RefreshCw, badge: offlineQueueCount },
    { id: 'roster', labelKey: 'villageRoster', icon: Users, badge: 0 },
    { id: 'sos', labelKey: 'sos', icon: Siren, badge: 0 },
  ];

  return (
    <div className="min-h-screen bg-slatewarm-50 flex justify-center">
      <div className="w-full max-w-md bg-slatewarm-50 min-h-screen relative flex flex-col pb-24">
        {/* User strip */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slatewarm-100">
          <div className="w-11 h-11 rounded-full bg-clinical-100 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-clinical-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-slatewarm-800">Sarita Kumari</p>
            <p className="text-xs text-slatewarm-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {t('ashaWorker')} · {t('banpurVillage')}
            </p>
          </div>
        </div>

        {/* Quick action hero bar */}
        <div className="px-4 pt-4 space-y-3">
          <AudioWaveform />

          <button className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-clinical-500 hover:bg-clinical-600 active:bg-clinical-700 text-white font-bold text-lg transition-colors shadow-md shadow-clinical-200">
            <UserPlus className="w-6 h-6" strokeWidth={2.4} />
            {t('registerNewPatient')}
          </button>
        </div>

        {/* Triage queue */}
        <div className="px-4 pt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slatewarm-800">{t('triageVisitQueue')}</h2>
            <span className="text-sm text-slatewarm-400 font-medium">{patients.length} {t('active')}</span>
          </div>

          <div className="space-y-3">
            {patients.map((patient) => {
              const cfg = flagConfig[patient.flag];
              const FlagIcon = cfg.icon;
              return (
                <div
                  key={patient.id}
                  className={`bg-white rounded-2xl border border-slatewarm-200 p-4 ring-2 ${cfg.ring} shadow-sm`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${patient.avatarColor}`}>
                      <span className="text-base font-bold">{patient.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slatewarm-800 truncate">
                        {patient.name} <span className="text-slatewarm-400 font-normal">({patient.age}{patient.sex})</span>
                      </h3>
                      <p className="text-sm text-slatewarm-600">{patient.complaint}</p>
                      {patient.flag === 'emergency' && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="flex items-center gap-1 text-xs font-semibold text-alert-600 bg-alert-50 px-2 py-1 rounded-lg">
                            <Activity className="w-3 h-3" /> BP: {patient.vitals.bp}
                          </span>
                          <span className="text-xs text-slatewarm-400">{patient.submittedAt}</span>
                        </div>
                      )}
                      {patient.flag !== 'emergency' && (
                        <p className="text-xs text-slatewarm-400 mt-1">{patient.submittedAt} · {patient.village}</p>
                      )}
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold flex-shrink-0 ${cfg.badge}`}>
                      {t(flagBadgeKey[patient.flag])}
                    </span>
                  </div>

                  <button
                    className={`w-full flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-base transition-colors ${cfg.button}`}
                  >
                    <FlagIcon className="w-5 h-5" />
                    {t(cfg.labelKey)}
                    {patient.flag !== 'prescription' && <ChevronRight className="w-5 h-5 opacity-70" />}
                  </button>

                  {patient.flag === 'prescription' && (
                    <div className="mt-2 flex items-center gap-1.5 justify-center text-xs text-emerald-600">
                      <Pill className="w-3.5 h-3.5" />
                      {patient.phc} · {patient.village}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sync status */}
        <div className="px-4 pt-5 pb-2">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
            <RefreshCw className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-700 font-medium">
              {offlineQueueCount} {t('recordsPendingSync')}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom floating nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slatewarm-200 flex items-center justify-around px-2 py-1.5 z-30 shadow-lg">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          const isSOS = item.id === 'sos';
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-14 rounded-xl transition-colors ${
                isSOS
                  ? 'text-alert-600'
                  : isActive
                  ? 'text-clinical-600'
                  : 'text-slatewarm-400 hover:text-slatewarm-600'
              }`}
            >
              <Icon className={`w-6 h-6 ${isSOS ? 'text-alert-500' : ''}`} strokeWidth={isActive || isSOS ? 2.4 : 2} />
              <span className={`text-[10px] font-medium ${isActive || isSOS ? 'font-bold' : ''}`}>
                {t(item.labelKey)}
              </span>
              {item.badge > 0 && (
                <span className="absolute top-1 right-1/4 flex items-center justify-center w-4 h-4 rounded-full bg-alert-500 text-white text-[9px] font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
