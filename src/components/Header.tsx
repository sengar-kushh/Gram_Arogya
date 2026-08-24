import { HeartPulse, Smartphone, Monitor, Zap, AlertTriangle, Wifi } from 'lucide-react';
import type { Role, Language } from '@/data/mockData';
import { useI18n } from '@/i18n';

interface HeaderProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

const languages: { id: Language; label: string; full: string }[] = [
  { id: 'EN', label: 'EN', full: 'English' },
  { id: 'HI', label: 'हिं', full: 'हिंदी' },
  { id: 'MR', label: 'मरा', full: 'मराठी' },
];

export default function Header({ role, onRoleChange }: HeaderProps) {
  const { language, setLanguage, t } = useI18n();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slatewarm-200 shadow-sm">
      {/* Outbreak ticker */}
      <div className="bg-alert-500 overflow-hidden">
        <div className="flex items-center gap-2 py-1.5 px-4">
          <AlertTriangle className="w-4 h-4 text-white flex-shrink-0" />
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-semibold text-white whitespace-nowrap animate-ticker-scroll inline-block">
              {t('outbreakAlert')} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {t('outbreakAlert')} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {t('outbreakAlert')}
            </p>
          </div>
        </div>
      </div>

      {/* Main header bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-clinical-500 to-clinical-700 flex items-center justify-center shadow-sm">
            <HeartPulse className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-slatewarm-800 leading-tight">Gram Arogya</h1>
            <p className="text-[10px] text-slatewarm-400 leading-tight">{t('ruralHealthPlatform')}</p>
          </div>
        </div>

        {/* Role switcher */}
        <div className="flex items-center bg-slatewarm-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => onRoleChange('asha')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              role === 'asha'
                ? 'bg-white text-clinical-600 shadow-sm'
                : 'text-slatewarm-500 hover:text-slatewarm-700'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">{t('ashaFrontline')}</span>
            <span className="sm:hidden">{t('asha')}</span>
          </button>
          <button
            onClick={() => onRoleChange('doctor')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              role === 'doctor'
                ? 'bg-white text-clinical-600 shadow-sm'
                : 'text-slatewarm-500 hover:text-slatewarm-700'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">{t('doctorHub')}</span>
            <span className="sm:hidden">{t('doctor')}</span>
          </button>
        </div>

        {/* Right badges */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Language toggle */}
          <div className="flex items-center bg-slatewarm-100 rounded-lg p-0.5 gap-0.5">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                title={lang.full}
                className={`px-2 py-1.5 rounded-md text-xs font-bold transition-all ${
                  language === lang.id
                    ? 'bg-white text-clinical-600 shadow-sm'
                    : 'text-slatewarm-500 hover:text-slatewarm-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Connectivity badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200">
            <Zap className="w-4 h-4 text-emerald-600" />
            <div className="leading-tight">
              <p className="text-xs font-bold text-emerald-700">{t('offlineReady')}</p>
              <p className="text-[10px] text-emerald-600">{t('autoSyncActive')}</p>
            </div>
          </div>

          {/* Mobile connectivity icon */}
          <div className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200">
            <Wifi className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
