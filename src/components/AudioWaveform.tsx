import { useState, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { useI18n } from '@/i18n';

interface AudioWaveformProps {
  compact?: boolean;
}

export default function AudioWaveform({ compact = false }: AudioWaveformProps) {
  const { t } = useI18n();
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');

  const barCount = compact ? 12 : 24;

  const finalizeTranscript = () => {
    setProcessing(false);
    setTranscript('Patient reports chest tightness since morning, worsens on exertion. Difficulty breathing when lying flat.');
  };

  const handleToggle = () => {
    if (processing) return;
    if (recording) {
      setRecording(false);
      setProcessing(true);
      setTimeout(finalizeTranscript, 2000);
    } else {
      setTranscript('');
      setRecording(true);
    }
  };

  useEffect(() => {
    if (!recording) return;
    const timer = setTimeout(() => {
      setRecording(false);
      setProcessing(true);
      setTimeout(finalizeTranscript, 2000);
    }, 5000);
    return () => clearTimeout(timer);
  }, [recording]);

  const statusText = recording ? t('listening') : processing ? t('transcribing') : t('aiVoiceTriage');

  return (
    <div className={`rounded-2xl border-2 transition-all ${
      recording ? 'border-alert-300 bg-alert-50' : 'border-slatewarm-200 bg-slatewarm-50'
    } ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          disabled={processing}
          className={`flex-shrink-0 rounded-xl flex items-center justify-center transition-all ${
            compact ? 'w-12 h-12' : 'w-14 h-14'
          } ${
            recording
              ? 'bg-alert-500 hover:bg-alert-600'
              : processing
              ? 'bg-slatewarm-400'
              : 'bg-clinical-500 hover:bg-clinical-600'
          } text-white shadow-md`}
        >
          {recording ? <Square className="w-5 h-5" fill="white" /> : processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-6 h-6" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-slatewarm-700 ${compact ? 'text-sm' : 'text-base'}`}>
            {statusText}
          </p>
          {!compact && (
            <p className="text-xs text-slatewarm-400 truncate">{t('tapToSpeak')}</p>
          )}
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-0.5 h-10 flex-shrink-0">
          {Array.from({ length: barCount }).map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-colors ${
                recording ? 'bg-alert-500 animate-wave-pulse' : processing ? 'bg-clinical-400' : 'bg-slatewarm-300'
              }`}
              style={{
                height: recording ? '100%' : '30%',
                animationDelay: `${i * 80}ms`,
                animationDuration: `${600 + (i % 4) * 150}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {transcript && (
        <div className="mt-3 p-3 rounded-xl bg-white border border-clinical-200 animate-fade-in">
          <p className="text-xs font-semibold text-clinical-600 mb-1">{t('aiTranscript')}</p>
          <p className="text-sm text-slatewarm-700 leading-relaxed">{transcript}</p>
        </div>
      )}
    </div>
  );
}
