import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode, MapPin, Stethoscope, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/i18n';

interface QRReferralPassProps {
  patientName: string;
  patientAge: number;
  village: string;
  phc: string;
  diagnosis: string;
  hospital: string;
  onClose: () => void;
}

export default function QRReferralPass({
  patientName,
  patientAge,
  village,
  phc,
  diagnosis,
  hospital,
  onClose,
}: QRReferralPassProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const referralData = JSON.stringify({
    patient: patientName,
    age: patientAge,
    village,
    phc,
    diagnosis,
    hospital,
    id: `REF-${Date.now().toString().slice(-6)}`,
    issued: new Date().toISOString(),
  });

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-clinical-500">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-white" />
            <h3 className="text-base font-bold text-white">{t('hospitalReferralPass')}</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* QR Code */}
          <div className="flex justify-center mb-5">
            <div className="p-4 bg-white border-2 border-slatewarm-200 rounded-xl">
              <QRCodeSVG value={referralData} size={180} level="M" includeMargin={false} fgColor="#1e293b" />
            </div>
          </div>

          {/* Patient info */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between pb-2 border-b border-slatewarm-100">
              <span className="text-sm text-slatewarm-400">{t('patient')}</span>
              <span className="text-sm font-semibold text-slatewarm-700">{patientName}, {patientAge}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slatewarm-100">
              <span className="text-sm text-slatewarm-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {t('from')}</span>
              <span className="text-sm font-semibold text-slatewarm-700">{phc}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slatewarm-100">
              <span className="text-sm text-slatewarm-400 flex items-center gap-1"><Stethoscope className="w-3.5 h-3.5" /> {t('diagnosis')}</span>
              <span className="text-sm font-semibold text-slatewarm-700 text-right max-w-[60%]">{diagnosis}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slatewarm-400 flex items-center gap-1"><ArrowRight className="w-3.5 h-3.5" /> {t('referredTo')}</span>
              <span className="text-sm font-semibold text-clinical-600">{hospital}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
            <p className="text-xs text-amber-700 font-medium text-center">
              {t('presentQR')}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full h-11 rounded-xl font-semibold text-sm transition-colors ${
              copied ? 'bg-emerald-500 text-white' : 'bg-slatewarm-100 hover:bg-slatewarm-200 text-slatewarm-700'
            }`}
          >
            {copied ? t('referralCopied') : t('copyReferralDetails')}
          </button>
        </div>
      </div>
    </div>
  );
}
