import { ReactNode } from 'react';
import { type ProjectInquiry } from '@shared/projectInquiry';
import { ProjectNavigation } from '../ProjectNavigation';

interface ProjectSummaryProps {
  data: ProjectInquiry;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError?: string | null;
}

export function ProjectSummary({ data, onBack, onEdit, onSubmit, isSubmitting, submitError }: ProjectSummaryProps) {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
        Her şey doğru mu?
      </h2>
      
      <div className="space-y-8 max-w-3xl border border-white/10 p-6 tech-corners bg-surface/50">
        <SummarySection label="PROJE" step={1} onEdit={onEdit}>
          <p className="text-white text-lg font-medium">{data.type}</p>
        </SummarySection>

        <SummarySection label="HEDEF" step={2} onEdit={onEdit}>
          <p className="text-white/80 line-clamp-3">{data.goal || '-'}</p>
        </SummarySection>

        <SummarySection label="AŞAMA" step={3} onEdit={onEdit}>
          <p className="text-white">{data.stage}</p>
        </SummarySection>

        <SummarySection label="İHTİYAÇLAR" step={4} onEdit={onEdit}>
          <div className="flex flex-wrap gap-2">
            {data.features.map(f => (
              <span key={f} className="text-sm px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-white/80">
                {f}
              </span>
            ))}
            {data.otherFeatures && (
              <span className="text-sm px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-white/80">
                Ek: {data.otherFeatures}
              </span>
            )}
            {data.features.length === 0 && <span className="text-white/50">-</span>}
          </div>
        </SummarySection>

        <SummarySection label="BÜTÇE" step={5} onEdit={onEdit}>
          <p className="text-white">{data.budget}</p>
        </SummarySection>

        <SummarySection label="ZAMANLAMA" step={6} onEdit={onEdit}>
          <p className="text-white">
            {data.timeline}
            {data.hasDeadline && data.deadlineDate && ` (Tarih: ${data.deadlineDate})`}
          </p>
        </SummarySection>

        <SummarySection label="İLETİŞİM" step={7} onEdit={onEdit}>
          <p className="text-white">{data.contact.name} &middot; {data.contact.email}</p>
          {(data.contact.phone || data.contact.company) && (
            <p className="text-white/60 text-sm mt-1">
              {data.contact.phone} {data.contact.company && `| ${data.contact.company}`}
            </p>
          )}
          <p className="text-white/60 text-sm mt-1">Tercih: {data.contact.preferred}</p>
        </SummarySection>
      </div>

      {submitError && (
        <div className="mt-6 p-4 border border-red-500/30 bg-red-500/10 tech-corners">
          <p className="text-red-400 text-sm font-medium">{submitError}</p>
        </div>
      )}

      <ProjectNavigation 
        onBack={onBack} 
        onNext={onSubmit} 
        nextLabel="Projeyi Gönder" 
        isSubmit 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}

function SummarySection({ label, step, onEdit, children }: { label: string, step: number, onEdit: (s: number) => void, children: ReactNode }) {
  return (
    <div className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono tracking-widest text-text-tertiary uppercase">{label}</span>
        <button 
          onClick={() => onEdit(step)}
          className="text-xs text-accent hover:text-white transition-colors uppercase tracking-widest"
        >
          Düzenle
        </button>
      </div>
      {children}
    </div>
  );
}
