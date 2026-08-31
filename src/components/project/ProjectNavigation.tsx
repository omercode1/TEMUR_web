import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ProjectNavigationProps {
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  isSubmit?: boolean;
  isSubmitting?: boolean;
}

export function ProjectNavigation({ 
  onNext, 
  onBack, 
  nextDisabled = false, 
  nextLabel = 'Devam Et',
  isSubmit = false,
  isSubmitting = false
}: ProjectNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
      {onBack ? (
        <button 
          onClick={onBack}
          className="text-text-secondary hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri
        </button>
      ) : (
        <div /> // placeholder for flex-between
      )}

      {onNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled || isSubmitting}
          className={`relative inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-sm uppercase tracking-widest tech-corners transition-all
            ${nextDisabled || isSubmitting
              ? 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed' 
              : 'bg-surface border border-white/20 text-white hover:bg-accent hover:border-accent active:scale-95'
            }
          `}
        >
          {isSubmitting ? 'Gönderiliyor...' : nextLabel}
          {!isSubmit && !isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
