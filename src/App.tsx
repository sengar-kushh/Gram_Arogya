import { useState, useCallback } from 'react';
import { I18nContext, translations, type TranslationKey } from '@/i18n';
import Header from '@/components/Header';
import AshaFrontline from '@/pages/AshaDashboard';
import DoctorHub from '@/pages/DoctorDashboard';
import type { Role, Language } from '@/data/mockData';

function App() {
  const [role, setRole] = useState<Role>('asha');
  const [language, setLanguage] = useState<Language>('EN');

  const t = useCallback(
    (key: TranslationKey) => translations[language][key],
    [language],
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen flex flex-col bg-slatewarm-50">
        <Header role={role} onRoleChange={setRole} />
        {role === 'asha' ? <AshaFrontline /> : <DoctorHub />}
      </div>
    </I18nContext.Provider>
  );
}

export default App;
