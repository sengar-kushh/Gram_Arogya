import { useState } from 'react';
import { mockBodyMarkers, type BodyMarker } from '@/data/mockData';
import { useI18n, type TranslationKey } from '@/i18n';

const regionKeys: Record<string, TranslationKey> = {
  chest: 'chest',
  lungs: 'lungs',
  abdomen: 'chest',
};

interface BodyMapProps {
  markers?: BodyMarker[];
}

export default function BodyMap({ markers = mockBodyMarkers }: BodyMapProps) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<BodyMarker | null>(markers[0] || null);

  return (
    <div className="flex gap-4 items-start">
      {/* Body diagram */}
      <div className="relative flex-shrink-0 w-32 h-64 flex items-center justify-center">
        <svg viewBox="0 0 100 200" className="w-full h-full" style={{ maxHeight: '256px' }}>
          {/* Head */}
          <circle cx="50" cy="18" r="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          {/* Neck */}
          <rect x="46" y="28" width="8" height="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" rx="2" />
          {/* Torso */}
          <path d="M 30 36 Q 50 34 70 36 L 68 90 Q 50 92 32 90 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          {/* Chest divider lines */}
          <line x1="50" y1="36" x2="50" y2="90" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />
          {/* Lungs outline */}
          <ellipse cx="40" cy="55" rx="7" ry="14" fill="none" stroke="#94a3b8" strokeWidth="0.5" opacity="0.5" />
          <ellipse cx="60" cy="55" rx="7" ry="14" fill="none" stroke="#94a3b8" strokeWidth="0.5" opacity="0.5" />
          {/* Arms */}
          <path d="M 30 38 Q 22 50 20 75 Q 19 85 22 95" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          <path d="M 70 38 Q 78 50 80 75 Q 81 85 78 95" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          {/* Abdomen */}
          <path d="M 32 90 Q 50 88 68 90 L 66 115 Q 50 117 34 115 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          {/* Legs */}
          <path d="M 38 116 Q 36 150 38 180" fill="none" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
          <path d="M 62 116 Q 64 150 62 180" fill="none" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" opacity="0.6" />

          {/* Symptom markers */}
          {markers.map((marker) => (
            <g key={marker.id} onClick={() => setSelected(marker)} style={{ cursor: 'pointer' }}>
              <circle
                cx={marker.x}
                cy={marker.y}
                r="4"
                fill={marker.severity === 'high' ? '#E02424' : '#f59e0b'}
                className="animate-glow-pulse"
                style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
              />
              <circle
                cx={marker.x}
                cy={marker.y}
                r="2"
                fill="white"
              />
              {selected?.id === marker.id && (
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r="6"
                  fill="none"
                  stroke={marker.severity === 'high' ? '#E02424' : '#f59e0b'}
                  strokeWidth="1"
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Marker details */}
      <div className="flex-1 space-y-2">
        <p className="text-xs font-bold text-slatewarm-500 uppercase tracking-wide">{t('symptomMap')}</p>
        <p className="text-xs text-slatewarm-400 mb-2">{t('autoPopulated')}</p>
        {markers.map((marker) => (
          <button
            key={marker.id}
            onClick={() => setSelected(marker)}
            className={`w-full text-left p-2.5 rounded-lg border transition-all ${
              selected?.id === marker.id
                ? 'border-clinical-300 bg-clinical-50'
                : 'border-slatewarm-200 bg-white hover:border-slatewarm-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                marker.severity === 'high' ? 'bg-alert-500' : 'bg-amber-400'
              }`} />
              <span className="text-xs font-semibold text-slatewarm-700 capitalize">{t(regionKeys[marker.region])}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                marker.severity === 'high' ? 'bg-alert-100 text-alert-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {marker.severity === 'high' ? t('high') : t('med')}
              </span>
            </div>
            <p className="text-xs text-slatewarm-500 mt-1 ml-4.5">{marker.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
